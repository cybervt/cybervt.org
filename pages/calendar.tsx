import fs from 'fs';
import path from 'path';
import React, { useMemo } from 'react';
import { Typography, Stack, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventCalendar from '../components/event-calendar';
import { icsFeedUrl, siteNavigation } from '../src/config';

// ── types ──────────────────────────────────────────────────────────

interface CalendarEvent {
  title: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  description: string;
  zoomLink: string | null;
}

interface CalendarPageProps {
  events: CalendarEvent[];
}

// ── component ──────────────────────────────────────────────────────

export default function Calendar({ events }: CalendarPageProps) {
  // Sort by date (already sorted, but ensure)
  const sorted = useMemo(
    () => [...events].sort((a, b) => a.date.localeCompare(b.date)),
    [events],
  );

  return (
    <Stack spacing={2} alignItems="center">
      <Typography
        color="text.secondary"
        sx={{ textAlign: 'center', maxWidth: 750 }}
      >
        CyberVT meets weekly in accordance with the Virginia Tech academic
        year. Below is a calendar of upcoming events, including Zoom links
        for virtual meetings.
      </Typography>

      {/* Subscribe link — opens the Outlook ICS feed for calendar apps */}
      {icsFeedUrl && !icsFeedUrl.includes('YOUR_CALENDAR_ID') && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<CalendarMonthIcon />}
          href={icsFeedUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textTransform: 'none',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: 'text.secondary',
            borderColor: 'primary.main',
          }}
        >
          Subscribe to Calendar
        </Button>
      )}

      <EventCalendar events={sorted} />
    </Stack>
  );
}

// ── data ───────────────────────────────────────────────────────────

function loadEvents(filePath: string): CalendarEvent[] {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function getStaticProps() {
  const manualPath = path.join(process.cwd(), 'data', 'events.json');
  const icsPath = path.join(process.cwd(), 'data', 'ics-events.json');

  const manualEvents: CalendarEvent[] = loadEvents(manualPath);
  const icsEvents: CalendarEvent[] = loadEvents(icsPath);

  // Merge — manual events take priority over ICS events with same date+title
  const seen = new Set<string>();
  const merged: CalendarEvent[] = [];

  for (const ev of [...manualEvents, ...icsEvents]) {
    const key = `${ev.date}|${ev.title}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(ev);
    }
  }

  merged.sort((a, b) => a.date.localeCompare(b.date));

  return {
    props: {
      ...(siteNavigation.calendar ?? {}),
      events: merged,
    },
  };
}
