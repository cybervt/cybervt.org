/* React import */
import * as React from 'react';

/* Next.js imports */
import Link from 'next/link';

/* MUI imports */
import {
  Toolbar,
  AppBar,
  IconButton,
  List,
  ListItem,
  Collapse,
  Box,
  Button,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {GlobalContext, Page, SiteURL} from '../src/Config';

/* Make NavigationProps type with pages and toggleColorMode properties */
export type NavigationProps = {
  pages: Page[];
  toggleColorMode: () => void;
};

export function MobileAppBar(props: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const context = React.useContext(GlobalContext);

  const toggleNavigationBarOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box flexGrow={1}>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={toggleNavigationBarOpen}
          >
            <MenuIcon />
          </IconButton>
          {SiteURL}
        </Box>
        <Box>
          <IconButton
            color="inherit"
            aria-label="Toggle dark mode"
            onClick={props.toggleColorMode}
          >
            {context.currentColorMode === 'dark' ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>
        </Box>
      </Toolbar>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="nav">
          <ListItem key="/" style={{cursor: 'not-allowed'}}>
            <Link href="/" passHref>
              <Button color="inherit">Home</Button>
            </Link>
          </ListItem>
          {props.pages.map(comp => (
            <ListItem key={comp.url} style={{cursor: 'not-allowed'}}>
              <Link href={comp.url} passHref>
                <Button color="inherit">{comp.title}</Button>
              </Link>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </AppBar>
  );
}

function DesktopAppBar(props: NavigationProps) {
  const context = React.useContext(GlobalContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box flexGrow={1}>
          <Link href="/" passHref>
            <IconButton color="inherit" aria-label="Menu">
              <HomeIcon />
            </IconButton>
          </Link>
          <Link href="/" passHref>
            <Button color="inherit" sx={{textTransform: 'none'}} variant="text">
              {SiteURL}
            </Button>
          </Link>
        </Box>

        <Box>
          <Stack direction="row" spacing={2}>
            {props.pages.map(comp => (
              <Link href={comp.url} key={comp.url} passHref>
                <Button
                  key={comp.title}
                  color="inherit"
                  sx={{textTransform: 'none'}}
                  variant="text"
                >
                  {comp.title}
                </Button>
              </Link>
            ))}
            <Link href="/" passHref>
              <Button
                color="inherit"
                sx={{textTransform: 'none'}}
                variant="outlined"
              >
                Home
              </Button>
            </Link>

            <IconButton
              color="inherit"
              aria-label="Toggle dark mode"
              onClick={props.toggleColorMode}
            >
              {context.currentColorMode === 'dark' ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export function NavigationBar(props: NavigationProps) {
  const context = React.useContext(GlobalContext);
  return context.isDesktop ? (
    <DesktopAppBar {...props} />
  ) : (
    <MobileAppBar {...props} />
  );
}
