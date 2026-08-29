import React, { useEffect, useState } from 'react';
import { Typography, Stack, Paper, Box, InputBase } from '@mui/material';

const SUPABASE_URL = 'https://zbzsxweftspjokwbtzua.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpienN4d2VmdHNwam9rd2J0enVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMTI1MDksImV4cCI6MjEwMzU4ODUwOX0.qZYjBf8MtYnQdY_T0TS6R-EgaN5E-F-9ACoX4sVAeQo';

// ── component ──────────────────────────────────────────────────────

export default function Checkin() {
  const [supabaseReady, setSupabaseReady] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    code: '',
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; text: string }>({
    type: 'idle',
    text: '',
  });

  useEffect(() => {
    if ((window as any).supabase?.createClient) {
      setSupabaseReady(true);
      return;
    }

    const existingScript = document.querySelector('script[data-supabase-checkin]');
    if (existingScript) {
      existingScript.addEventListener('load', () => setSupabaseReady(true));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.async = true;
    script.dataset.supabaseCheckin = 'true';
    script.onload = () => setSupabaseReady(true);
    document.body.appendChild(script);
  }, []);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status.type !== 'idle') {
      setStatus({ type: 'idle', text: '' });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const code = formData.code.trim();

    if (!name || !email || !code) {
      setStatus({
        type: 'error',
        text: 'Please complete all required fields before checking in.',
      });
      return;
    }

    if (!supabaseReady || !(window as any).supabase?.createClient) {
      setStatus({
        type: 'error',
        text: 'Supabase is still loading. Please try again in a moment.',
      });
      return;
    }

    const supabase = (window as any).supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data, error } = await supabase.rpc('check_in', {
      p_full_name: name,
      p_email: email,
      p_code: code,
    });

    if (error) {
      setStatus({
        type: 'error',
        text: 'Something went wrong — tell an officer.',
      });
      return;
    }

    if (!data?.ok) {
      setStatus({
        type: 'error',
        text: data?.error || 'Unable to check in right now.',
      });
      return;
    }

    setStatus({
      type: 'success',
      text: `✓ Checked in (${data.meeting_type}). +${data.points_awarded} pt — total: ${data.total_points}`,
    });
  };

  return (
    <Stack spacing={3} alignItems="center" sx={{ width: '100%' }}>
      <Typography
        color="text.secondary"
        sx={{
          textAlign: 'center',
          maxWidth: 650,
          fontSize: { xs: '1.1rem', md: '1.3rem' },
          fontFamily: 'monospace',
        }}
      >
        Enter the meeting code shown on the projector to verify your
        attendance.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 680,
          borderRadius: 0,
          overflow: 'hidden',
          backgroundColor: '#dfe0e1',
          boxShadow: 'none',
          border: '1px solid #1d4d8f',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#b51d41',
            px: 3,
            py: 1.5,
            color: '#f5f5f5',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: { xs: '1.1rem', md: '1.5rem' },
            }}
          >
            Meeting Check-in
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: '#1d4d8f',
            px: 2,
            py: 2,
            borderTop: '2px solid #0e2d5d',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#f3f3f3',
              p: { xs: 2, md: 2.5 },
              border: '2px solid #1d4d8f',
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, color: '#1d1d1d', mb: 1, fontFamily: 'monospace' }}>
                    Full Name <Box component="span" sx={{ color: '#d92727' }}>*</Box>
                  </Typography>
                  <InputBase
                    fullWidth
                    placeholder="Your answer"
                    value={formData.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                    sx={{
                      backgroundColor: '#f3f3f3',
                      borderBottom: '2px solid #6b6b6b',
                      fontSize: '1.05rem',
                      px: 0.5,
                      py: 0.25,
                      fontFamily: 'monospace',
                      color: '#000000',
                      '& input': {
                        color: '#000000',
                        WebkitTextFillColor: '#000000',
                      },
                      '& input::placeholder': {
                        color: '#6b6b6b',
                        opacity: 1,
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, color: '#1d1d1d', mb: 1, fontFamily: 'monospace' }}>
                    VT Email
                  </Typography>
                  <InputBase
                    fullWidth
                    placeholder="Your answer"
                    value={formData.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    sx={{
                      backgroundColor: '#f3f3f3',
                      borderBottom: '2px solid #6b6b6b',
                      fontSize: '1.05rem',
                      px: 0.5,
                      py: 0.25,
                      fontFamily: 'monospace',
                      color: '#000000',
                      '& input': {
                        color: '#000000',
                        WebkitTextFillColor: '#000000',
                      },
                      '& input::placeholder': {
                        color: '#6b6b6b',
                        opacity: 1,
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, color: '#1d1d1d', mb: 1, fontFamily: 'monospace' }}>
                    Meeting Code <Box component="span" sx={{ color: '#d92727' }}>*</Box>
                  </Typography>
                  <InputBase
                    fullWidth
                    placeholder="Your answer"
                    value={formData.code}
                    onChange={(event) => handleChange('code', event.target.value)}
                    sx={{
                      backgroundColor: '#f3f3f3',
                      borderBottom: '2px solid #6b6b6b',
                      fontSize: '1.05rem',
                      px: 0.5,
                      py: 0.25,
                      fontFamily: 'monospace',
                      color: '#000000',
                      '& input': {
                        color: '#000000',
                        WebkitTextFillColor: '#000000',
                      },
                      '& input::placeholder': {
                        color: '#6b6b6b',
                        opacity: 1,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mt: 1 }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#1d4d8f',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.8rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Check in
                  </button>

                  {status.text ? (
                    <Typography
                      sx={{
                        color: status.type === 'error' ? '#b51d41' : '#1d4d8f',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        fontFamily: 'monospace',
                      }}
                    >
                      {status.text}
                    </Typography>
                  ) : null}
                </Box>
              </Stack>
            </form>
          </Box>
        </Box>
      </Paper>

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
