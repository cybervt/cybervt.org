import {Card, Typography, Stack, Link as MuiLink} from '@mui/material';
import {red} from '@mui/material/colors';
import React from 'react';

import Head from 'next/head';
import {SiteTitle} from '../src/Config';

export default function Index() {
  return (
    <div>
      <Head>
        <title>{SiteTitle} | Home</title>
      </Head>

      <Stack spacing={2}>
        <Typography variant="h4">Home</Typography>
        <Card sx={{p: 2, borderRadius: 2, boxShadow: 4}}>
          <Stack spacing={1}>
            <Typography variant="body1">
              CyberVT is currently going under a website redesign.
            </Typography>
          </Stack>
        </Card>
      </Stack>
    </div>
  );
}
