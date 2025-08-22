import React from 'react';
import { useRouter } from 'next/router';
import { Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function PdfViewer() {
  const router = useRouter();
  const { filename } = router.query;

  // Only allow .pdf files from the newsletters folder
  if (!filename || typeof filename !== 'string' || !filename.endsWith('.pdf')) {
    return (
      <Box sx={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
        <Typography variant="h4">Invalid PDF</Typography>
        <Typography>The requested file is not a valid newsletter PDF.</Typography>
        <Button
          component="a"
          href="/newsletter"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Newsletters
        </Button>
      </Box>
    );
  }

  const pdfUrl = `/newsletters/${filename}`;

  return (
    <Box sx={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{filename.split('_')[0]} {filename.split('_')[1].split('.')[0]} Newsletter</Typography>
      <iframe
        src={pdfUrl}
        width="100%"
        height="800px"
        style={{ border: '1px solid #ccc', borderRadius: 8 }}
        title={filename}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          component="a"
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
        >
          Download PDF
        </Button>
        <Button
          component="a"
          href="/newsletter"
          variant="contained"
          sx={{ ml: 2 }}
        >
          Back to Newsletters
        </Button>
      </Box>
    </Box>
  );
}
