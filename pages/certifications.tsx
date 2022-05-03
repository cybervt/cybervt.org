import {
  Card,
  Typography,
  Stack,
  Grid,
  Box,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import React from 'react';

import Head from 'next/head';
import {SiteTitle} from '../src/Config';

export default function Certifications() {
  return (
    <div>
      <Head>
        <title>{SiteTitle} | Certifications</title>
      </Head>
      <Stack spacing={2}>
        <Typography variant="h4">Certifications</Typography>
        <Card sx={{p: 2, borderRadius: 2, boxShadow: 4}}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{border: 'none', boxShadow: 'none'}}>
                <Box>
                  <CardContent sx={{m: 'auto', textAlign: 'center'}}>
                    <CardMedia
                      sx={{maxWidth: 500}}
                      height="100%"
                      component="img"
                      image="/assets/img/eJPT.png"
                    />
                    <Button
                      variant="text"
                      href="https://verified.elearnsecurity.com/certificates/7a78a418-7913-4a46-85b1-ef00085d244d"
                      target="_blank"
                      color="inherit"
                      sx={{textTransform: 'none'}}
                    >
                      eJPT
                    </Button>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </Card>
      </Stack>
    </div>
  );
}
