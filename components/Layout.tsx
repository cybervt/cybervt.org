/* React imports */
import React from 'react';

/* MUI imports */
import {Box, CssBaseline} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';

import {NavigationBar} from './NavigationBar';
import {GlobalContext, SiteNavigation} from '../src/Config';
import Footer from './Footer';
// import Footer from './Footer'
// const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const maxMobileSize = 900;

type LayoutProps = {
  children: React.ReactNode;
};

export default function BaseLayout({children}: LayoutProps) {
  /* Declare states */
  const [colorMode, setColorMode] = React.useState<
    'light' | 'dark' | undefined
  >(undefined);
  const [windowInnerWidth, setWindowInnerWidth] = React.useState(0);

  /* Calculate isDesktop using Memo */
  const isDesktop = React.useMemo(() => {
    return windowInnerWidth > maxMobileSize;
  }, [windowInnerWidth]);

  /* Create theme based on color mode */
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode]
  );

  /* When the page is loaded, we can display everything */
  const isLoaded = React.useMemo(
    () => windowInnerWidth > 0 && colorMode !== undefined,
    [windowInnerWidth, colorMode]
  );

  /* On component mount, get inner width and set it */
  React.useEffect(() => {
    setWindowInnerWidth(window.innerWidth);
  }, []);

  /* Update color mode when system color mode changes */
  React.useEffect(() => {
    const handleColorChange = () => {
      setColorMode(
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      );
    };

    /* When component mounts, call this function to set the mode */
    handleColorChange();

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleColorChange);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleColorChange);
    };
  }, []);

  /* Update window inner width when it changes */
  React.useEffect(() => {
    const resizeWindow = () => {
      setWindowInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', resizeWindow);

    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, []);

  /* Function to toggle color mode */
  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  /* JSX */
  return isLoaded ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalContext.Provider
        value={{currentColorMode: colorMode!, isDesktop: isDesktop}}
      >
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <NavigationBar
            pages={SiteNavigation}
            toggleColorMode={toggleColorMode}
          />
          <Box
            maxWidth="lg"
            width="100%"
            height="100%"
            flexGrow={1}
            sx={{margin: '0 auto'}}
            p={4}
          >
            {children}
          </Box>
          {/* Make a sticky footer that is always at the bottom */}
          <Box sx={{width: '100%'}}>
            <Footer />
          </Box>
        </Box>
      </GlobalContext.Provider>
    </ThemeProvider>
  ) : (
    <></>
  );
}
