import fs from 'fs';
import path from 'path';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Stack,
  Paper,
  TextField,
  Button,
  Box,
  IconButton,
  Chip,
  Grid,
  Divider,
  Alert,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GitHubIcon from '@mui/icons-material/GitHub';

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

const EMPTY_EVENT: CalendarEvent = {
  title: '',
  date: '',
  time: '19:00',
  endTime: '21:00',
  location: 'Torgersen 1100',
  description: '',
  zoomLink: null,
};

interface AdminProps {
  events: CalendarEvent[];
}

// ── github config ──────────────────────────────────────────────────

const GH_OWNER = 'cybervt';
const GH_REPO = 'cybervt.org';
const GH_BRANCH = 'main';
const GH_FILE_PATH = 'data/events.json';
const GH_API_BASE = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE_PATH}`;

// ── component ──────────────────────────────────────────────────────

export default function Admin({ events: initialEvents }: AdminProps) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form, setForm] = useState<CalendarEvent>({ ...EMPTY_EVENT });
  const [showForm, setShowForm] = useState(false);

  // github save state
  const [ghToken, setGhToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // load token from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cybervt_gh_token');
    if (stored) setGhToken(stored);
  }, []);

  // ── form helpers ──
  function updateForm(field: keyof CalendarEvent, value: string) {
    setForm(prev => ({ ...prev, [field]: value || null }));
  }

  function openNew() {
    setForm({ ...EMPTY_EVENT });
    setEditingIndex(null);
    setShowForm(true);
  }

  function openEdit(index: number) {
    setForm({ ...events[index] });
    setEditingIndex(index);
    setShowForm(true);
  }

  function cancelForm() {
    setShowForm(false);
    setEditingIndex(null);
  }

  function saveEvent() {
    if (!form.title.trim() || !form.date || !form.time) return;
    const updated = [...events];
    if (editingIndex !== null) {
      updated[editingIndex] = { ...form };
    } else {
      updated.push({ ...form });
    }
    updated.sort((a, b) => a.date.localeCompare(b.date));
    setEvents(updated);
    setShowForm(false);
    setEditingIndex(null);
    setSaveStatus(null);
  }

  function deleteEvent(index: number) {
    setEvents(prev => prev.filter((_, i) => i !== index));
    setSaveStatus(null);
  }

  function downloadJSON() {
    const json = JSON.stringify(events, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'events.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ── github save ──
  async function saveToGitHub() {
    if (!ghToken.trim()) {
      setSaveStatus({ type: 'error', message: 'Enter a GitHub token first.' });
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    try {
      // 1) Get the current file SHA (file may not exist yet — that's fine)
      let sha: string | undefined;
      const getRes = await fetch(`${GH_API_BASE}?ref=${GH_BRANCH}`, {
        headers: {
          Authorization: `Bearer ${ghToken}`,
          Accept: 'application/vnd.github+json',
        },
      });

      if (getRes.ok) {
        const data = await getRes.json();
        sha = data.sha;
      } else if (getRes.status === 404) {
        // File doesn't exist on remote yet — this is a creation, not an update
        sha = undefined;
      } else {
        const err = await getRes.json().catch(() => ({}));
        throw new Error(err.message || `GitHub GET failed (${getRes.status})`);
      }

      // 2) PUT the updated file
      const content = JSON.stringify(events, null, 2);
      const body: Record<string, any> = {
        message: sha ? 'Update events' : 'Create events.json',
        content: btoa(unescape(encodeURIComponent(content))),
        branch: GH_BRANCH,
      };
      if (sha) body.sha = sha;

      const putRes = await fetch(`${GH_API_BASE}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${ghToken}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!putRes.ok) {
        const err = await putRes.json().catch(() => ({}));
        throw new Error(err.message || `GitHub PUT failed (${putRes.status})`);
      }

      // token is valid — persist it
      localStorage.setItem('cybervt_gh_token', ghToken);

      setSaveStatus({ type: 'success', message: 'Events saved to GitHub! The site will update on the next deploy.' });
    } catch (err: any) {
      setSaveStatus({ type: 'error', message: err.message || 'Unknown error' });
    } finally {
      setIsSaving(false);
    }
  }

  function clearToken() {
    setGhToken('');
    localStorage.removeItem('cybervt_gh_token');
  }

  // ── render ──
  return (
    <Stack spacing={3} sx={{ maxWidth: 800, mx: 'auto', width: '100%' }}>
      {/* header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="h5" fontFamily="monospace" fontWeight={700} color="text.secondary">
          Event Admin
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openNew}
            sx={{ textTransform: 'none', fontFamily: 'monospace', fontSize: '0.8rem' }}
          >
            Add Event
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={downloadJSON}
            sx={{
              textTransform: 'none',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: 'text.secondary',
              borderColor: 'text.secondary',
            }}
          >
            Download
          </Button>
        </Box>
      </Box>

      {/* ── github token section ── */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'secondary.main',
          p: { xs: 2, md: 2.5 },
        }}
      >
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <GitHubIcon sx={{ color: 'grey.400', fontSize: 20 }} />
            <Typography fontFamily="monospace" fontWeight={600} color="text.primary" fontSize="0.9rem">
              Save directly to GitHub
            </Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'flex-end' }}>
            <TextField
              size="small"
              fullWidth
              type={showToken ? 'text' : 'password'}
              label="GitHub Personal Access Token"
              value={ghToken}
              onChange={e => { setGhToken(e.target.value); setSaveStatus(null); }}
              placeholder="github_pat_..."
              InputLabelProps={{ sx: { color: 'grey.400' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowToken(!showToken)} sx={{ color: 'grey.400' }}>
                      {showToken ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ input: { color: 'text.primary', fontFamily: 'monospace', fontSize: '0.8rem' } }}
            />
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={saveToGitHub}
              disabled={isSaving}
              sx={{
                textTransform: 'none',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                minWidth: 140,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {isSaving ? 'Saving...' : 'Save to GitHub'}
            </Button>
            {ghToken && (
              <Button
                size="small"
                onClick={clearToken}
                sx={{ textTransform: 'none', fontFamily: 'monospace', fontSize: '0.7rem', color: 'grey.400', flexShrink: 0 }}
              >
                Clear
              </Button>
            )}
          </Stack>

          <Typography sx={{ fontSize: '0.7rem', color: 'grey.500', fontFamily: 'monospace' }}>
            Create a fine-grained token at{' '}
            <a href="https://github.com/settings/tokens?type=beta" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              GitHub Settings → Tokens
            </a>
            {' '}with <strong>Read &amp; Write</strong> access to this repository. The token is saved only in your browser.
          </Typography>
        </Stack>
      </Paper>

      {/* ── save status ── */}
      {saveStatus && (
        <Alert
          severity={saveStatus.type}
          onClose={() => setSaveStatus(null)}
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            bgcolor: saveStatus.type === 'success' ? 'rgba(46,125,50,0.15)' : 'rgba(211,47,47,0.15)',
            color: saveStatus.type === 'success' ? '#81c784' : '#ef9a9a',
          }}
        >
          {saveStatus.message}
        </Alert>
      )}

      {/* ── add / edit form ── */}
      {showForm && (
        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderLeft: '4px solid',
            borderLeftColor: 'primary.main',
            borderRadius: 2,
            bgcolor: 'secondary.main',
            p: 3,
          }}
        >
          <Typography fontFamily="monospace" fontWeight={600} color="text.primary" mb={2}>
            {editingIndex !== null ? 'Edit Event' : 'New Event'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={form.title}
                onChange={e => updateForm('title', e.target.value)}
                size="small"
                InputLabelProps={{ sx: { color: 'grey.400' } }}
                sx={{ input: { color: 'text.primary', fontFamily: 'monospace' } }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={form.date}
                onChange={e => updateForm('date', e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true, sx: { color: 'grey.400' } }}
                sx={{ input: { color: 'text.primary', fontFamily: 'monospace' } }}
              />
            </Grid>
            <Grid item xs={3} sm={2}>
              <TextField
                fullWidth
                label="Start"
                type="time"
                value={form.time}
                onChange={e => updateForm('time', e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true, sx: { color: 'grey.400' } }}
                sx={{ input: { color: 'text.primary', fontFamily: 'monospace' } }}
              />
            </Grid>
            <Grid item xs={3} sm={2}>
              <TextField
                fullWidth
                label="End"
                type="time"
                value={form.endTime || ''}
                onChange={e => updateForm('endTime', e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true, sx: { color: 'grey.400' } }}
                sx={{ input: { color: 'text.primary', fontFamily: 'monospace' } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Location"
                value={form.location}
                onChange={e => updateForm('location', e.target.value)}
                size="small"
                InputLabelProps={{ sx: { color: 'grey.400' } }}
                sx={{ input: { color: 'text.primary', fontFamily: 'monospace' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Zoom Link (optional)"
                value={form.zoomLink || ''}
                onChange={e => updateForm('zoomLink', e.target.value)}
                size="small"
                InputLabelProps={{ sx: { color: 'grey.400' } }}
                sx={{ input: { color: 'text.primary', fontFamily: 'monospace' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={form.description}
                onChange={e => updateForm('description', e.target.value)}
                size="small"
                multiline
                rows={3}
                InputLabelProps={{ sx: { color: 'grey.400' } }}
                sx={{ '& textarea': { color: 'text.primary', fontFamily: 'monospace' } }}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button
              variant="contained"
              onClick={saveEvent}
              sx={{ textTransform: 'none', fontFamily: 'monospace', fontSize: '0.8rem' }}
            >
              {editingIndex !== null ? 'Save Changes' : 'Add Event'}
            </Button>
            <Button
              variant="text"
              onClick={cancelForm}
              sx={{ textTransform: 'none', fontFamily: 'monospace', fontSize: '0.8rem', color: 'grey.400' }}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      )}

      <Divider sx={{ borderColor: 'divider' }} />

      {/* ── event list ── */}
      {events.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'secondary.main',
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography fontFamily="monospace" color="grey.400">
            No events yet. Click &ldquo;Add Event&rdquo; to create one.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={1.5}>
          {events.map((ev, idx) => (
            <Paper
              key={idx}
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                bgcolor: 'secondary.main',
                p: { xs: 1.5, md: 2 },
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
              }}
            >
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
                  py: 0.75,
                  px: 1,
                  flexShrink: 0,
                }}
              >
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, fontFamily: 'monospace', lineHeight: 1, textTransform: 'uppercase' }}>
                  {ev.date
                    ? new Date(ev.date + 'T12:00:00').toLocaleString('en-US', { month: 'short' })
                    : '???'}
                </Typography>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'monospace', lineHeight: 1 }}>
                  {ev.date ? new Date(ev.date + 'T12:00:00').getDate() : '?'}
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography fontWeight={700} sx={{ fontSize: '0.9rem', color: 'text.primary', mb: 0.25 }}>
                  {ev.title}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip
                    label={`${ev.date}  ${ev.time}${ev.endTime ? ' \u2013 ' + ev.endTime : ''}`}
                    size="small"
                    sx={{ fontFamily: 'monospace', fontSize: '0.7rem', bgcolor: 'rgba(255,255,255,0.1)', color: 'grey.300', height: 22 }}
                  />
                  <Chip
                    label={ev.location}
                    size="small"
                    sx={{ fontFamily: 'monospace', fontSize: '0.7rem', bgcolor: 'rgba(255,255,255,0.1)', color: 'grey.300', height: 22 }}
                  />
                  {ev.zoomLink && (
                    <Chip
                      label="Zoom"
                      size="small"
                      sx={{ fontFamily: 'monospace', fontSize: '0.7rem', bgcolor: 'rgba(255,255,255,0.1)', color: 'primary.light', height: 22 }}
                    />
                  )}
                </Stack>
              </Box>

              <Box sx={{ display: 'flex', flexShrink: 0 }}>
                <IconButton size="small" onClick={() => openEdit(idx)} sx={{ color: 'grey.400' }}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => deleteEvent(idx)} sx={{ color: 'grey.400' }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Stack>
      )}

      {/* ── instructions ── */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'secondary.main',
          p: 3,
        }}
      >
        <Typography fontFamily="monospace" fontWeight={600} color="text.primary" mb={1}>
          How It Works
        </Typography>
        <Typography sx={{ fontSize: '0.8rem', color: 'grey.400', fontFamily: 'monospace', lineHeight: 1.8 }}>
          <strong>Option 1 — One-click:</strong> Paste a GitHub token above and click <strong>Save to GitHub</strong>. The token is saved in your browser for next time.<br />
          <strong>Option 2 — Manual:</strong> Click <strong>Download</strong>, then replace <code>data/events.json</code> in the GitHub repo.
        </Typography>
      </Paper>
    </Stack>
  );
}

// ── data ───────────────────────────────────────────────────────────

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'events.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const events: CalendarEvent[] = JSON.parse(raw);

  return {
    props: {
      title: 'Admin',
      description: 'Event management',
      showHeader: true,
      showInNav: false,
      externalLink: false,
      padding: true,
      url: '/admin',
      events,
    },
  };
}
