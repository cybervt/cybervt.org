import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
  Button,
  useTheme,
} from '@mui/material';
import { globalContext } from '../src/config';

// ── types ──────────────────────────────────────────────────────────

interface CalendarEvent {
  title: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM" 24h
  endTime?: string;
  location: string;
  description: string;
  zoomLink: string | null;
}

interface EventCalendarProps {
  events: CalendarEvent[];
}

// ── helpers ────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function formatDateRange(date: string, time: string, endTime?: string): string {
  const d = new Date(date + 'T' + time);
  const month = d.toLocaleString('en-US', { month: 'short' });
  const day = d.getDate();
  const start = formatTime(time);
  if (!endTime) return `${month} ${day} at ${start}`;
  return `${month} ${day}, ${start} \u2013 ${formatTime(endTime)}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay(); // 0=Sun
}

function todayStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

// ── component ──────────────────────────────────────────────────────

export default function EventCalendar({ events }: EventCalendarProps) {
  const theme = useTheme();
  const context = React.useContext(globalContext);
  const isDesktop = context.isDesktop;

  const today = todayStr();

  // ── state ──
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth()); // 0-indexed
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // ── derived: events by date ──
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of events) {
      const list = map.get(ev.date) || [];
      list.push(ev);
      map.set(ev.date, list);
    }
    return map;
  }, [events]);

  // ── derived: upcoming events (next 5 from today forward) ──
  const upcomingEvents = useMemo(() => {
    return events
      .filter(ev => ev.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
  }, [events, today]);

  // ── derived: grid data ──
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  const selectedEvents = selectedDate ? (eventsByDate.get(selectedDate) || []) : [];

  // ── helpers for grid ──
  function goToPrevMonth() {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(viewMonth - 1);
    }
    setSelectedDate(null);
  }

  function goToNextMonth() {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(viewMonth + 1);
    }
    setSelectedDate(null);
  }

  function dateStr(day: number): string {
    const m = String(viewMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${viewYear}-${m}-${d}`;
  }

  // ── colour constants (hardcoded so grid cells don't depend on theme.palette quirks) ──
  const CELL_BG = '#ffffff';
  const HEADER_BG = '#f5f5f5';
  const EMPTY_BG = '#f5f5f5';
  const GRID_LINE = '#e0e0e0';
  const DAY_TEXT = '#1a1a1aff';          // dark, legible on white
  const DAY_TEXT_MUTED = '#9e9e9e';      // gray for non-event days
  const SELECTED_BG = 'rgba(135, 32, 65, 0.10)'; // light maroon wash
  const HOVER_BG = 'rgba(0, 0, 0, 0.04)';
  const TODAY_RING = '#872041';          // primary maroon
  const EVENT_DOT = '#872041';

  // ── render ──
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    <Stack spacing={3} sx={{ maxWidth: 750, width: '100%' }}>
      {/* ── month grid ── */}
      <Paper
        elevation={0}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: CELL_BG,
        }}
      >
        {/* nav bar — keeps the dark CyberVT look */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 1.5, md: 3 },
            py: { xs: 1, md: 1.5 },
            bgcolor: 'secondary.main',
            color: 'text.primary',
            fontFamily: 'monospace',
          }}
        >
          <Button
            onClick={goToPrevMonth}
            sx={{
              color: 'text.primary',
              fontFamily: 'monospace',
              fontSize: { xs: '1rem', md: '1.2rem' },
              minWidth: 36,
              px: 0.5,
            }}
          >
            {'\u2190'}
          </Button>
          <Typography
            fontFamily="monospace"
            sx={{ fontSize: { xs: '1rem', md: '1.3rem' }, fontWeight: 700 }}
          >
            {MONTH_NAMES[viewMonth]} {viewYear}
          </Typography>
          <Button
            onClick={goToNextMonth}
            sx={{
              color: 'text.primary',
              fontFamily: 'monospace',
              fontSize: { xs: '1rem', md: '1.2rem' },
              minWidth: 36,
              px: 0.5,
            }}
          >
            {'\u2192'}
          </Button>
        </Box>

        {/* day-of-week headers */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            bgcolor: HEADER_BG,
            borderBottom: `1px solid ${GRID_LINE}`,
          }}
        >
          {DAY_HEADERS.map(d => (
            <Box
              key={d}
              sx={{
                textAlign: 'center',
                py: { xs: 0.5, md: 1 },
                fontFamily: 'monospace',
                fontSize: { xs: '0.7rem', md: '0.85rem' },
                fontWeight: 600,
                color: DAY_TEXT_MUTED,
              }}
            >
              {isDesktop ? d : d.charAt(0)}
            </Box>
          ))}
        </Box>

        {/* day cells */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            bgcolor: CELL_BG,
          }}
        >
          {/* empty cells before 1st */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <Box
              key={`empty-${i}`}
              sx={{
                aspectRatio: '1 / 1',
                borderRight: `1px solid ${GRID_LINE}`,
                borderBottom: `1px solid ${GRID_LINE}`,
                bgcolor: EMPTY_BG,
              }}
            />
          ))}

          {/* numbered days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const ds = dateStr(day);
            const hasEvents = eventsByDate.has(ds);
            const isToday = ds === today;
            const isSelected = ds === selectedDate;

            let cellBg = CELL_BG;
            if (isSelected) cellBg = SELECTED_BG;

            return (
              <Box
                key={ds}
                onClick={() => hasEvents && setSelectedDate(isSelected ? null : ds)}
                sx={{
                  aspectRatio: '1 / 1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRight: `1px solid ${GRID_LINE}`,
                  borderBottom: `1px solid ${GRID_LINE}`,
                  cursor: hasEvents ? 'pointer' : 'default',
                  bgcolor: cellBg,
                  position: 'relative',
                  transition: 'background-color 0.15s',
                  '&:hover': hasEvents
                    ? { bgcolor: isSelected ? SELECTED_BG : HOVER_BG }
                    : {},
                  userSelect: 'none',
                }}
              >
                {/* today ring */}
                {isToday && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 3,
                      borderRadius: '50%',
                      border: `2px solid ${TODAY_RING}`,
                    }}
                  />
                )}

                {/* day number */}
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: { xs: '0.75rem', md: '0.9rem' },
                    fontWeight: isToday ? 700 : 400,
                    color: hasEvents || isToday ? DAY_TEXT : DAY_TEXT_MUTED,
                    lineHeight: 1,
                  }}
                >
                  {day}
                </Typography>

                {/* event dot indicator */}
                {hasEvents && (
                  <Box
                    sx={{
                      width: { xs: 5, md: 7 },
                      height: { xs: 5, md: 7 },
                      borderRadius: '50%',
                      bgcolor: EVENT_DOT,
                      mt: { xs: 0.3, md: 0.5 },
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Paper>

      {/* ── selected day detail card ── */}
      {selectedDate && selectedEvents.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            borderRadius: 2,
            bgcolor: 'secondary.main',
            color: 'text.primary',
            p: { xs: 2, md: 3 },
          }}
        >
          <Typography
            fontFamily="monospace"
            sx={{
              fontSize: { xs: '0.85rem', md: '1rem' },
              fontWeight: 600,
              mb: 2,
              color: 'text.primary',
            }}
          >
            {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>
          <Stack spacing={2}>
            {selectedEvents.map((ev, idx) => (
              <Box key={idx}>
                <Typography
                  fontWeight={700}
                  sx={{ fontSize: { xs: '0.95rem', md: '1.1rem' }, mb: 0.5, color: 'text.primary' }}
                >
                  {ev.title}
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' }, color: 'grey.300', mb: 0.25 }}
                >
                  {formatDateRange(ev.date, ev.time, ev.endTime)} · {ev.location}
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' }, color: 'grey.300', mt: 0.5 }}
                >
                  {ev.description}
                </Typography>
                {ev.zoomLink && (
                  <Button
                    variant="outlined"
                    size="small"
                    href={ev.zoomLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      mt: 1,
                      textTransform: 'none',
                      fontFamily: 'monospace',
                      fontSize: '0.8rem',
                      color: 'text.primary',
                      borderColor: 'primary.main',
                    }}
                  >
                    Join Zoom Meeting
                  </Button>
                )}
              </Box>
            ))}
          </Stack>
        </Paper>
      )}

      {/* ── upcoming events list ── */}
      {upcomingEvents.length > 0 && (
        <Box>
          <Typography
            fontFamily="monospace"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontWeight: 600,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            Upcoming Events
          </Typography>
          <Stack spacing={1.5}>
            {upcomingEvents.map((ev, idx) => {
              const isSelected = ev.date === selectedDate;
              return (
                <Paper
                  key={idx}
                  elevation={0}
                  onClick={() => setSelectedDate(isSelected ? null : ev.date)}
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    borderRadius: 2,
                    bgcolor: 'secondary.main',
                    color: 'text.primary',
                    p: { xs: 1.5, md: 2 },
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    transition: 'box-shadow 0.15s',
                    '&:hover': {
                      boxShadow: 2,
                    },
                  }}
                >
                  {/* date badge */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'primary.main',
                      color: 'text.primary',
                      borderRadius: 2,
                      minWidth: { xs: 48, md: 56 },
                      py: { xs: 0.5, md: 0.75 },
                      px: 1,
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '0.65rem', md: '0.7rem' },
                        fontWeight: 600,
                        fontFamily: 'monospace',
                        lineHeight: 1,
                        textTransform: 'uppercase',
                      }}
                    >
                      {new Date(ev.date + 'T12:00:00').toLocaleString('en-US', { month: 'short' })}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.1rem', md: '1.3rem' },
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        lineHeight: 1,
                      }}
                    >
                      {new Date(ev.date + 'T12:00:00').getDate()}
                    </Typography>
                  </Box>

                  {/* event info */}
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      fontWeight={700}
                      sx={{
                        fontSize: { xs: '0.85rem', md: '0.95rem' },
                        color: 'text.primary',
                        mb: 0.25,
                      }}
                    >
                      {ev.title}
                    </Typography>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 0, sm: 1 }}
                      sx={{ mb: 0.25 }}
                    >
                      <Chip
                        label={formatDateRange(ev.date, ev.time, ev.endTime)}
                        size="small"
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.7rem',
                          bgcolor: 'rgba(255,255,255,0.1)',
                          color: 'grey.300',
                          height: 22,
                        }}
                      />
                      <Chip
                        label={ev.location}
                        size="small"
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.7rem',
                          bgcolor: 'rgba(255,255,255,0.1)',
                          color: 'grey.300',
                          height: 22,
                        }}
                      />
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: { xs: '0.75rem', md: '0.8rem' },
                        color: 'grey.400',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {ev.description}
                    </Typography>
                    {ev.zoomLink && (
                      <Button
                        variant="outlined"
                        size="small"
                        href={ev.zoomLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          mt: 0.75,
                          textTransform: 'none',
                          fontFamily: 'monospace',
                          fontSize: '0.7rem',
                          color: 'text.primary',
                          borderColor: 'primary.main',
                          py: 0,
                          px: 1,
                          minHeight: 24,
                        }}
                      >
                        Zoom
                      </Button>
                    )}
                  </Box>
                </Paper>
              );
            })}
          </Stack>
        </Box>
      )}

      {/* ── no events at all ── */}
      {events.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            bgcolor: 'secondary.main',
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography fontFamily="monospace" color="grey.400">
            No events scheduled yet. Check back soon!
          </Typography>
        </Paper>
      )}
    </Stack>
    </Box>
  );
}
