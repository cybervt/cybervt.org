/* React import */
import * as React from 'react';

/* MUI imports */
import { Toolbar, AppBar, IconButton, Link, List, ListItem, ListItemText, Collapse, Box, Stack, Button, Typography, CssBaseline, Theme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

/* Our imports */
import Page from './Page';
import PageProps from './Page';
import HomePage from './HomePage';
import ReportsPage from './ReportsPage';
import ContactPage from './ContactPage';
import ResumePage from './ResumePage';
import CertificationsPage from './CertificationsPage';

const appName = 'cerne.xyz';

const maxMobileSize = 900;

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const navigation: Page[] = [
  ContactPage,
  ReportsPage,
  CertificationsPage,
  ResumePage
];

function MobileAppBar({setCurrentComponent, setMode, mode} : { setCurrentComponent: React.Dispatch<React.SetStateAction<Page>>, setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>, mode: 'light' | 'dark' }) {
  /* Collapse menu */
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleComponent = (component: Page) => {
    setMenuOpen(false);
    setCurrentComponent(component);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box flexGrow={1}>
          <IconButton color="inherit" aria-label="Menu" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          {appName}
        </Box>
        <Box>
          <IconButton color="inherit" aria-label="Toggle dark mode" onClick={() => setMode(mode == 'dark' ? 'light' : 'dark')}>
            {mode == 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
      <Collapse in={menuOpen} timeout="auto" unmountOnExit>
        <List component="nav">
          <ListItem button key='Home' onClick={() => toggleComponent(HomePage)}>
            <ListItemText primary={HomePage.title} />
          </ListItem>
          {navigation.map((comp) => (
            <ListItem button key={comp.title} onClick={() => toggleComponent(comp)}>
              <ListItemText primary={comp.title} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </AppBar>
  );
}

function DesktopAppBar({setCurrentComponent, setMode, mode} : { setCurrentComponent: React.Dispatch<React.SetStateAction<Page>>, setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>> , mode: 'light' | 'dark'}) {
  const toggleComponent = (component: Page) => {
    setCurrentComponent(component);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box flexGrow={1}>
          <IconButton color="inherit" aria-label="Menu" onClick={() => toggleComponent(HomePage)}>
            <HomeIcon />
          </IconButton>
          <Button color="inherit" sx={{textTransform: 'none'}} variant="text" onClick={() => toggleComponent(HomePage)}>
            {appName}
          </Button>
        </Box>

        <Box>
          <Stack direction="row" spacing={2}>
            {navigation.map((comp) => (
              <Button key={comp.title} color="inherit" sx={{textTransform: 'none'}} variant="text" onClick={() => toggleComponent(comp)}>
                {comp.title}
              </Button>
            ))}
            <Button color="inherit" sx={{textTransform: 'none'}} variant="outlined" onClick={() => toggleComponent(HomePage)}>Home</Button>

            <IconButton color="inherit" aria-label="Toggle dark mode" onClick={() => setMode(mode == 'dark' ? 'light' : 'dark')}>
              {mode == 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Stack>
        </Box>
        
      </Toolbar>
    </AppBar>
  );
}

function Navigation({setCurrentComponent, setMode, isDesktop, mode} : { setCurrentComponent: React.Dispatch<React.SetStateAction<Page>>, setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>, isDesktop: boolean, mode: 'light' | 'dark' }) {
  /* Handle page resize */
  return isDesktop ? <DesktopAppBar mode={mode} setMode={setMode} setCurrentComponent={setCurrentComponent} /> : <MobileAppBar mode={mode} setMode={setMode} setCurrentComponent={setCurrentComponent} />;
}

export default function App() {
  /* Set the current page to HomePage */
  const [currentComponent, setCurrentComponent] = React.useState<Page>(HomePage);

  /* Handle page resize */
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= maxMobileSize);
  const handleResize = () => {
    setIsDesktop(window.innerWidth >= maxMobileSize);
  };

  /* Add resize event listener */
  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  /* Add system color mode listener */
  React.useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      e.matches ? setMode('dark') : setMode('light');
    });
  }, []);

  /* Create color mode toggle capability */
  const [mode, setMode] = React.useState<'light' | 'dark'>(useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack width="100%">
        <Navigation setCurrentComponent={setCurrentComponent} isDesktop={isDesktop} setMode={setMode} mode={mode} />
        <Box>
          <Stack p={4} maxWidth='md' m='auto'>
            {currentComponent.showTitle && <Typography variant="h4">{currentComponent.title}</Typography>}
            {currentComponent.component({isDesktop: isDesktop} as PageProps)}
          </Stack>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
