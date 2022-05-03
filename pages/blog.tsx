import {Card, Typography, Stack} from '@mui/material';
import React from 'react';

export default function Blog() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Blog - Coming Soon</Typography>
      <Card sx={{p: 4, borderRadius: 2, boxShadow: 4}}></Card>
    </Stack>
  );
}
