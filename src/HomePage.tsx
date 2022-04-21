import * as React from 'react';

import { Box, Card, CardMedia, Stack, CardContent, Typography, Button, Grid, Icon } from '@mui/material';

import KeyboardIcon from '@mui/icons-material/Keyboard';
import SecurityIcon from '@mui/icons-material/Security';
import ParkIcon from '@mui/icons-material/Park';

import Page from './Page';
import PageProps from './Page';

const lead: string = "Just a small brief on"
const name: string = "Christopher Cerne"
const summary: string = "Computer science graduate. Cyber security nerd. Published journalist.";
const linkedinURL: string = "https://www.linkedin.com/in/cernec1999/";

class AboutBlurbDesktop extends React.Component {
  render() {
    return (
    <Card sx={{ display: 'flex', p: 2, borderRadius: 2, boxShadow: 5 }}>
      <Box flexGrow={1}>
        <CardMedia
          sx={{ maxWidth: 500 }}
          height='100%'
          component="img"
          image="img/cerne-headshot-transparent.png"
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
          <Typography variant="h6">
            {summary}
          </Typography>
          <Button variant="contained" color="info" href={linkedinURL} target="_blank">
            Connect
          </Button>
        </CardContent>
      </Box>
    </Card>
    );
  }
}

class AboutBlurbMobile extends React.Component {
  render() {
    return (
      <Card sx={{ p: 1, borderRadius: 2, boxShadow: 4 }} >
        <Box>
          <CardMedia
            sx={{ maxHeight: 300, width: 'auto', margin: 'auto' }}
            component="img"
            image="img/cerne-headshot-transparent.png"
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
            <Typography variant="subtitle1">
              {summary}
            </Typography>
            <Button variant="contained" color="info" href={linkedinURL} target="_blank" fullWidth>
              Connect
            </Button>
          </CardContent>
        </Box>
      </Card>
    )
  }
}


class AboutBlurb extends React.Component<PageProps, {}> {
  render() {
    return this.props.isDesktop ? <AboutBlurbDesktop /> : <AboutBlurbMobile />;
  }
}

let HomePage: Page = {
  title: 'Home',
  component: (props: PageProps) => (
    <Box>
      <Stack spacing={4}>
        <AboutBlurb {...props} />
        <Card sx={{ p: 1, borderRadius: 2, boxShadow: 4 }} >
          <Box>
            <CardContent>
              <Typography variant='h5'>
                About
              </Typography>
              <Typography variant='subtitle1'>
              I am a hard-working, enthusiastic, and self-directed college graduate eager to add value to a company while expanding my knowledge of computer science and engineering.
              </Typography>
            </CardContent>
          </Box>
        </Card>

        <Card sx={{ p: 1, borderRadius: 2, boxShadow: 4 }} >
          <Box>
            <CardContent>
              <Stack spacing={4}>
                <Typography variant='h5'>
                  Interests
                </Typography>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ p: 1, border: 'none', boxShadow: 'none' }} >
                        <Box>
                          <CardContent sx={{m: 'auto', textAlign: 'center'}}>
                            <KeyboardIcon sx={{fontSize: 64}} />
                            <Typography variant='h5'>
                              Computer Science
                            </Typography>
                            <Typography variant='body1'>
                              I have had passions in Computer Science since grade school. Since then, I've created my own websites, won programming competitions, and graduated with a B.S. in Computer Science at Virginia Tech.
                            </Typography>
                          </CardContent>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ p: 1, border: 'none', boxShadow: 'none'}} >
                        <Box>
                          <CardContent sx={{m: 'auto', textAlign: 'center'}}>
                            <SecurityIcon sx={{fontSize: 64}} />
                            <Typography variant='h5'>
                              Cyber Security
                            </Typography>
                            <Typography variant='body1'>
                              I am specifically interested in offensive security research. I joined the Virginia Tech Cyber Security club and learned the basics of vulnerability research. Since joining, I've found numerous 0-day vulnerabilities in embedded devices.
                            </Typography>
                          </CardContent>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ p: 1, border: 'none', boxShadow: 'none'}} >
                        <Box>
                          <CardContent sx={{m: 'auto', textAlign: 'center'}}>
                            <ParkIcon sx={{fontSize: 64}} />
                            <Typography variant='h5'>
                              Outdoors
                            </Typography>
                            <Typography variant='body1'>
                              I am passionate about the environment and the outdoors. I love going on hikes and bike rides around the Blacksburg area. More recently, I've gotten into caving after joining the VPI Cave Club. I currently run the website for this club.
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
  ),
  showTitle: false,
};

export default HomePage;