/* https://github.com/vercel/next.js/issues/28774 */
// eslint-disable-next-line unicorn/prefer-node-protocol
import process from 'process';
import {GraphQLClient} from 'graphql-request';
import React from 'react';
import {createTheme, Theme} from '@mui/material';

/** Color mode type */
export type CurrentColorMode = 'light' | 'dark';

/** Global variables type */
export type GlobalVars = {
	isDesktop: boolean;
};

/** Create theme */
export const cybervtTheme = createTheme({
	components: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		MuiLink: {
			styleOverrides: {
				root: {
					textDecoration: 'none',
				},
			},
		},
	},
	palette: {
		mode: 'light',
		primary: {
			main: '#6f1d1b',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#ffffff',
		},
		text: {
			primary: '#000000',
			secondary: '#6f1d1b',
		},
	},
});

export const maxMobileSize = 900;

export type LayoutProps = {
	children: React.ReactElement;
};

export type PageProps = {
	showInNav: boolean;
	showHeader: boolean;
	padding: boolean;
	url: string;
	title: string;
	description: string;
};

type SiteNavigation = Record<string, PageProps>;

/** Global variables */
export const globalContext = React.createContext<GlobalVars>({
	isDesktop: true,
} as GlobalVars);

/** The site navigation */
export const siteNavigation: SiteNavigation = {
	about: {
		url: '/about',
		showInNav: true,
		showHeader: true,
		padding: true,
		title: 'About',
		description: 'About CyberVT',
	},
	join: {
		url: '/join',
		showInNav: true,
		showHeader: true,
		padding: true,
		title: 'Join',
		description: 'Joining CyberVT',
	},
	sponsors: {
		url: '/sponsors',
		showInNav: true,
		showHeader: true,
		padding: true,
		title: 'Sponsors',
		description: 'Sponsorship information',
	},
	calendar: {
		url: '/calendar',
		showInNav: true,
		showHeader: true,
		padding: true,
		title: 'Calendar',
		description: 'Upcoming events',
	},
	contact: {
		url: '/contact',
		showInNav: true,
		showHeader: true,
		padding: true,
		title: 'Contact',
		description: 'Get in touch with CyberVT',
	},
	home: {
		url: '/',
		showInNav: false,
		showHeader: false,
		padding: false,
		title: 'Home',
		description: 'Creating Hokie Hackers Since 2011',
	},
	notFound: {
		url: '/404',
		showInNav: false,
		showHeader: true,
		padding: true,
		title: '404',
		description: 'Segmentation fault (core dumped)',
	},
};

export function getNavArray(): PageProps[] {
	const pageArray: PageProps[] = [];
	for (const [key, value] of Object.entries(siteNavigation)) {
		pageArray.push(value);
	}

	return pageArray;
}

/** The GraphQL server we get our content from */
export const apiClient = new GraphQLClient(process.env.API_URL!, {
	headers: {
		/* The linter doesn't like the capitalized name */
		// eslint-disable-next-line @typescript-eslint/naming-convention
		Authorization: `Bearer ${process.env.API_SECRET!}`,
	},
});

/** Site title (in <head>) */
export const siteTitle = 'CyberVT';
