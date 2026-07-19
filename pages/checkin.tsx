import React from 'react';
import { Typography, Stack, Paper, Box, Divider } from '@mui/material';

const CHECKIN_FORM_URL = 
  'https://docs.google.com/forms/d/e/1FAIpQLScAT82NbqBCtXuBJkGDi8fuBhXFEFeYU8Yp8VbHs6XLEJehZg/viewform?embedded=true';

// ── component ──────────────────────────────────────────────────────

export default function Checkin() {
  return (
    <Stack spacing={3} alignItems="center">
      {/* instructions */}
      <Typography
        color="text.secondary"
        sx={{ textAlign: 'center', maxWidth: 650 }}
      >
        Enter the meeting code shown on the projector to verify your
        attendance.
      </Typography>

      {/* form container */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          width: '100%',
          maxWidth: 640,
          bgcolor: 'secondary.main',
        }}
      >
        <Box
          sx={{
            bgcolor: 'primary.main',
            px: 3,
            py: 1.5,
          }}
        >
          <Typography
            fontFamily="monospace"
            fontWeight={700}
            color="text.primary"
            sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}
          >
            Meeting Check-in
          </Typography>
        </Box>

        <Box sx={{ p: { xs: 1, md: 2 } }}>
          <iframe
            src={CHECKIN_FORM_URL}
            width="100%"
            height={700}
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Meeting Check-in Form"
            style={{ display: 'block' }}
          >
            Loading form...
          </iframe>
        </Box>
      </Paper>

      {/* help text */}
      <Typography
        sx={{
          fontSize: { xs: '0.75rem', md: '0.8rem' },
          color: 'grey.500',
          fontFamily: 'monospace',
          textAlign: 'center',
          maxWidth: 500,
          lineHeight: 1.6,
        }}
      >
        Having trouble? Ask an officer for the meeting code or try
        refreshing the page.
      </Typography>
    </Stack>
  );
}

// ── data ───────────────────────────────────────────────────────────

export async function getStaticProps() {
  return {
    props: {
      title: 'Check-in',
      description: 'Verify your meeting attendance',
      showHeader: true,
      showInNav: false,
      externalLink: false,
      padding: true,
      url: '/checkin',
    },
  };
}
