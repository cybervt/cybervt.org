import fs from 'fs';
import path from 'path';
import React from 'react';
import { Typography, Stack } from '@mui/material';
import { siteNavigation } from '../src/config';
import EventCalendar from '../components/event-calendar';

interface CalendarEvent {
  title: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  description: string;
  zoomLink: string | null;
}

interface EventsPageProps {
  events: CalendarEvent[];
}

export default function Events({ events }: EventsPageProps) {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography
        color="text.secondary"
        sx={{ textAlign: 'center', maxWidth: 750 }}
      >
        CyberVT meets weekly in accordance with the Virginia Tech academic year.
        Below is a calendar of upcoming events, including Zoom links for virtual meetings.
      </Typography>
      <EventCalendar events={events} />
    </Stack>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'events.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const events: CalendarEvent[] = JSON.parse(raw);

  return {
    props: {
      ...(siteNavigation.calendar ?? {}),
      events,
    },
  };
}
