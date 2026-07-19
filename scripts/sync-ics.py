#!/usr/bin/env python3
"""Fetch an Outlook ICS feed and convert VEVENT blocks to a CyberVT events JSON array.

Usage:
    python3 scripts/sync-ics.py [--url URL] [--output data/ics-events.json]

The ICS_URL defaults to the value in src/config.ts (parsed from the export line).
Handles recurring events (RRULE) via dateutil.rrule.
"""

import json
import re
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path
from urllib.request import urlopen

from dateutil.rrule import rrulestr

# ── helpers ──────────────────────────────────────────────────────────

def extract_ics_url() -> str:
    """Read icsFeedUrl from src/config.ts."""
    config = Path('src/config.ts').read_text()
    m = re.search(r"icsFeedUrl\s*=\s*'([^']+)'", config)
    if not m:
        sys.exit('ERROR: Could not find icsFeedUrl in src/config.ts')
    return m.group(1)

def _field(block: str, name: str, default: str = '') -> str:
    """Extract a field value from a VEVENT block."""
    m = re.search(rf'^{name}(?:;[^:]+)?:(.+)$', block, re.MULTILINE)
    if not m:
        return default
    val = m.group(1).strip()
    val = val.replace('\\n', '\n').replace('\\,', ',').replace('\\;', ';')
    return val

def parse_ics_datetime(s: str) -> datetime:
    """Parse an ICS DTSTART/DTEND value.

    Formats handled:
      - 20260607T194500Z  (UTC date-time)
      - 20260607T194500   (local date-time)
      - 20260607          (date only)
    """
    s = s.strip()
    if len(s) == 8 and s.isdigit():
        return datetime.strptime(s, '%Y%m%d').replace(tzinfo=timezone.utc)
    s_clean = s.rstrip('Z')
    return datetime.strptime(s_clean, '%Y%m%dT%H%M%S').replace(tzinfo=timezone.utc)

def make_event(
    start_dt: datetime,
    end_dt: datetime | None,
    dtstart_raw: str,
    summary: str,
    location: str,
    description: str,
) -> dict:
    """Build a single CalendarEvent dict from parsed fields."""
    date_str = start_dt.strftime('%Y-%m-%d')
    time_str = start_dt.strftime('%H:%M') if 'T' in dtstart_raw else '00:00'
    end_time_str = end_dt.strftime('%H:%M') if end_dt else None
    return {
        'title': summary.strip(),
        'date': date_str,
        'time': time_str,
        'endTime': end_time_str,
        'location': location.strip(),
        'description': description.strip(),
        'zoomLink': None,
    }

def parse_ics(text: str, cutoff_months: int = 3, future_months: int = 6) -> list[dict]:
    """Parse ICS text and return a list of CyberVT-format event dicts.

    Handles both single events and recurring events (RRULE).
    """
    events: list[dict] = []
    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(days=cutoff_months * 30)
    horizon = now + timedelta(days=future_months * 30)

    blocks = re.split(r'BEGIN:VEVENT\r?\n', text)
    for block in blocks:
        if 'END:VEVENT' not in block:
            continue
        block = block.split('END:VEVENT')[0]

        dtstart_raw = _field(block, 'DTSTART')
        dtend_raw = _field(block, 'DTEND')
        rrule_raw = _field(block, 'RRULE')
        summary = _field(block, 'SUMMARY', 'Untitled Event')
        location = _field(block, 'LOCATION', '')
        description = _field(block, 'DESCRIPTION', '')
        # Exclude cancelled events
        if 'cancel' in summary.lower():
            continue

        if not dtstart_raw:
            continue

        try:
            start_dt = parse_ics_datetime(dtstart_raw)
        except ValueError:
            continue

        end_dt: datetime | None = None
        if dtend_raw:
            try:
                end_dt = parse_ics_datetime(dtend_raw)
            except ValueError:
                pass

        # Calculate duration for recurring event expansion
        duration: timedelta | None = None
        if end_dt:
            duration = end_dt - start_dt

        if rrule_raw:
            # ── recurring event ──
            # Collect EXDATEs (exception dates to skip)
            exdate_strs: set[str] = set()
            for m in re.finditer(r'^EXDATE(?:;[^:]+)?:(.+)$', block, re.MULTILINE):
                for val in m.group(1).split(','):
                    exdate_strs.add(val.strip())

            try:
                # Build a rule string that includes DTSTART for context
                rule_set = rrulestr(
                    rrule_raw,
                    dtstart=start_dt,
                    forceset=True,  # handles EXDATE if embedded
                )
            except ValueError as e:
                print(f'  WARNING: Could not parse RRULE for "{summary}": {e}', file=sys.stderr)
                # Fall back to treating it as a single event
                if start_dt >= cutoff and start_dt <= horizon:
                    events.append(make_event(start_dt, end_dt, dtstart_raw, summary, location, description))
                continue

            # Get all occurrences within the window
            try:
                occurrences = list(rule_set.between(cutoff, horizon, inc=True))
            except Exception:
                occurrences = [start_dt]

            for occ in occurrences:
                # Ensure occ is a datetime (rrule can return dates)
                if not isinstance(occ, datetime):
                    occ = datetime(occ.year, occ.month, occ.day, tzinfo=timezone.utc)
                # If occ is naive, make it timezone-aware
                if occ.tzinfo is None:
                    occ = occ.replace(tzinfo=timezone.utc)

                # Skip EXDATEs
                occ_str = occ.strftime('%Y%m%dT%H%M%SZ')
                date_only_str = occ.strftime('%Y%m%d')
                if occ_str in exdate_strs or date_only_str in exdate_strs:
                    continue

                occ_end = occ + duration if duration else None
                events.append(make_event(occ, occ_end, dtstart_raw, summary, location, description))

        else:
            # ── single event ──
            if start_dt < cutoff or start_dt > horizon:
                continue
            events.append(make_event(start_dt, end_dt, dtstart_raw, summary, location, description))

    # Deduplicate by date+title
    seen: set[str] = set()
    unique: list[dict] = []
    for ev in events:
        key = f"{ev['date']}|{ev['title']}"
        if key not in seen:
            seen.add(key)
            unique.append(ev)

    return unique

# ── main ─────────────────────────────────────────────────────────────

def main() -> None:
    import argparse
    parser = argparse.ArgumentParser(description='Sync ICS to events JSON')
    parser.add_argument('--url', help='ICS feed URL (default: read from src/config.ts)')
    parser.add_argument('--output', default='data/ics-events.json', help='Output JSON file')
    args = parser.parse_args()

    url = args.url or extract_ics_url()

    if 'YOUR_CALENDAR_ID' in url:
        print(f'Skipping sync: ICS URL is still a placeholder ({url})')
        return

    print(f'Fetching ICS: {url}')
    try:
        with urlopen(url, timeout=30) as resp:
            ics_text = resp.read().decode('utf-8')
    except Exception as e:
        print(f'ERROR fetching ICS: {e}', file=sys.stderr)
        sys.exit(1)

    events = parse_ics(ics_text)
    print(f'Parsed {len(events)} events')

    # Sort by date
    events.sort(key=lambda e: e['date'])

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(events, indent=2) + '\n')
    print(f'Wrote {output_path}')


if __name__ == '__main__':
    main()
