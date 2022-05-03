import * as React from 'react';

import Head from 'next/head';

import {
  Box,
  Card,
  CardMedia,
  Stack,
  CardContent,
  Typography,
  Button,
  Grid,
} from '@mui/material';

import KeyboardIcon from '@mui/icons-material/Keyboard';
import SecurityIcon from '@mui/icons-material/Security';
import ParkIcon from '@mui/icons-material/Park';

import {GlobalContext, LinkedInURL, SiteTitle} from '../src/Config';

const lead = 'Just a small brief on';
const name = 'Christopher Cerne';
const summary =
  'Computer science graduate. Cybersecurity consultant. Published journalist.';

function AboutBlurbDesktop() {
  return (
    <Card sx={{display: 'flex', p: 4, borderRadius: 2, boxShadow: 5}}>
      <Box flexGrow={1}>
        <CardMedia
          sx={{maxWidth: 500}}
          height="100%"
          component="img"
          image="/assets/img/cerne-headshot-transparent.png"
        />
      </Box>
      <Box>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {lead}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {name.toUpperCase()}
          </Typography>
          <Typography variant="h6">{summary}</Typography>
          <Button
            variant="contained"
            color="info"
            href={LinkedInURL}
            target="_blank"
          >
            Connect
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
}

function AboutBlurbMobile() {
  return (
    <Card sx={{p: 1, borderRadius: 2, boxShadow: 4}}>
      <Box>
        <CardMedia
          sx={{maxHeight: 300, width: 'auto', margin: 'auto'}}
          component="img"
          image="/assets/img/cerne-headshot-transparent.png"
        />
      </Box>
      <Box>
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">
            {lead}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {name.toUpperCase()}
          </Typography>
          <Typography variant="subtitle1">{summary}</Typography>
          <Button
            variant="contained"
            color="info"
            href={LinkedInURL}
            target="_blank"
            fullWidth
          >
            Connect
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
}

function AboutBlurb() {
  const context = React.useContext(GlobalContext);
  return context.isDesktop ? <AboutBlurbDesktop /> : <AboutBlurbMobile />;
}

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>{SiteTitle} | Home</title>
      </Head>
      <Box>
        <Stack spacing={2}>
          <AboutBlurb />
          <Card sx={{p: 2, borderRadius: 2, boxShadow: 4}}>
            <Box>
              <CardContent>
                <Typography variant="h5">About</Typography>
                <Typography variant="subtitle1">
                  I am a hard-working, enthusiastic, and self-directed college
                  graduate eager to add value to a company while expanding my
                  knowledge of computer science and engineering. I currently
                  work as a Security Consultant II at Bishop Fox.
                </Typography>
              </CardContent>
            </Box>
          </Card>

          <Card sx={{p: 2, borderRadius: 2, boxShadow: 4}}>
            <Box>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h5">Interests</Typography>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Card sx={{border: 'none', boxShadow: 'none'}}>
                          <Box>
                            <CardContent sx={{m: 'auto', textAlign: 'center'}}>
                              <KeyboardIcon sx={{fontSize: 64}} />
                              <Typography variant="h5">
                                Computer Science
                              </Typography>
                              <Typography variant="body1">
                                I have had passions in Computer Science since
                                grade school. Since then, I've created my own
                                websites, won programming competitions, and
                                graduated with a B.S. in Computer Science at
                                Virginia Tech.
                              </Typography>
                            </CardContent>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Card sx={{border: 'none', boxShadow: 'none'}}>
                          <Box>
                            <CardContent sx={{m: 'auto', textAlign: 'center'}}>
                              <SecurityIcon sx={{fontSize: 64}} />
                              <Typography variant="h5">
                                Cyber Security
                              </Typography>
                              <Typography variant="body1">
                                I am specifically interested in offensive
                                security research. I joined the Virginia Tech
                                Cyber Security club and learned the basics of
                                vulnerability research. Since joining, I've
                                found numerous 0-day vulnerabilities in embedded
                                devices.
                              </Typography>
                            </CardContent>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Card sx={{border: 'none', boxShadow: 'none'}}>
                          <Box>
                            <CardContent sx={{m: 'auto', textAlign: 'center'}}>
                              <ParkIcon sx={{fontSize: 64}} />
                              <Typography variant="h5">Outdoors</Typography>
                              <Typography variant="body1">
                                I am passionate about the environment and the
                                outdoors. I love going on hikes and bike rides
                                around the Blacksburg area. More recently, I've
                                gotten into caving after joining the VPI Cave
                                Club. I currently run the website for this club.
                              </Typography>
                            </CardContent>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </CardContent>
            </Box>
          </Card>
        </Stack>
      </Box>
    </div>
  );
}
