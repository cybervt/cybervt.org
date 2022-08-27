/* React imports */
import React from 'react';

/* MUI imports */
import {Box, CssBaseline, Typography} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';

/* My imports */
import {globalContext, siteNavigation, GlobalVars, cybervtTheme, PageProps, LayoutProps, maxMobileSize} from '../src/config';
import {NavigationBar} from './navigation-bar';
import Footer from './footer';
import PageHeader from './page-header';

export default function BaseLayout({children}: LayoutProps) {
	/* Declare states */
	const [windowInnerWidth, setWindowInnerWidth] = React.useState(1024);

	/* Calculate isDesktop using Memo */
	const isDesktop = React.useMemo(() => windowInnerWidth > maxMobileSize, [windowInnerWidth]);

	/* Create Memo for the global context */
	const globalProviderObject = React.useMemo<GlobalVars>(() => ({isDesktop}), [isDesktop]);

	/* When the page is loaded, we can display everything */
	const isLoaded = React.useMemo(
		() => windowInnerWidth > 0,
		[windowInnerWidth],
	);

	/* On component mount, get inner width and set it */
	React.useEffect(() => {
		setWindowInnerWidth(window.innerWidth);
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

	/* These are the properties of the current page that is loaded */
	const pageProps: PageProps = children.props as PageProps;

	/* JSX */
	return (
		<ThemeProvider theme={cybervtTheme}>
			<CssBaseline/>
			<globalContext.Provider
				value={globalProviderObject}
			>
				<Box display='flex' flexDirection='column' minHeight='100vh'>
					<NavigationBar/>

					<PageHeader {...pageProps}/>
					{pageProps.padding ? (
						<Box
							width='100%'
							height='100%'
							maxWidth='lg'
							p={8}
							flexGrow={1}
							sx={{margin: '0 auto'}}
						>
							{children}
						</Box>
					) : (
						<Box
							width='100%'
							height='100%'
							flexGrow={1}
							sx={{margin: '0 auto'}}
						>
							{children}
						</Box>
					)}

					{/* Make a sticky footer that is always at the bottom */}
					<Box sx={{width: '100%'}}>
						<Footer/>
					</Box>
				</Box>
			</globalContext.Provider>
		</ThemeProvider>
	);
}
