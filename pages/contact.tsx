import {Card, Typography, Stack} from '@mui/material';
import {red} from '@mui/material/colors';
import React from 'react';

import Head from 'next/head';
import {SiteTitle} from '../src/Config';

export default function Contact() {
  const myEmail = 'officers' + '@' + 'cybervt.org';
  return (
    <div>
      <Head>
        <title>{SiteTitle} | Contact</title>
      </Head>

      <Stack spacing={2}>
        <Typography variant="h4">Contact</Typography>
        <Card sx={{p: 2, borderRadius: 2, boxShadow: 4}}>
          <Stack spacing={1}>
            <Typography variant="body1">
              You can contact the officers of CyberVT by sending an email
              to:&nbsp;
              <Typography
                component="span"
                fontFamily="Monospace"
                color={red[500]}
                display="inline"
                sx={{overflowWrap: 'break-word'}}
              >
                {myEmail}
              </Typography>
            </Typography>
          </Stack>
        </Card>
      </Stack>
    </div>
  );
}
