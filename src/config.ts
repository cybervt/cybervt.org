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

export const discordUrl = 'https://discord.gg/ghgpNdCctT';

/** Create theme */
export const cybervtTheme = createTheme({
	components: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		MuiLink: {
			styleOverrides: {
				root: {
					textDecoration: 'none',
					color: '#e75553ff',
				},
			},
		},
	},
	palette: {
		mode: 'light',
		primary: {
			main: 'rgba(141, 0, 0, 1)',
			contrastText: '#e75553ff',
		},
		secondary: {
			main: 'rgba(18, 74, 142, 1)',
			contrastText: 'rgba(4, 44, 93, 1)',
		},
		text: {
			primary: '#e8e8e8ff',
			secondary: '#1a1a1aff',
		},
		background: {
            default: '#e8e8e8ff',
            paper: 'rgba(0, 0, 0, 1)',
        },
	},
});

export const maxMobileSize = 900;

export type LayoutProps = {
	children: React.ReactElement;
};

export type PageProps = {
	externalLink: boolean;
	showInNav: boolean;
	showHeader: boolean;
	padding: boolean;
	url: string;
	title: string;
	description: string;
	children?: Record<string, PageProps>;
};

type SiteNavigation = Record<string, PageProps>;

/** Global variables */
export const globalContext = React.createContext<GlobalVars>({
	isDesktop: true,
} as GlobalVars);

/** Default properties for navigation items */
const defaultNavItem: Partial<PageProps> = {
	showInNav: true,
	externalLink: false,
	showHeader: true,
	padding: true,
};

/** The site navigation */
export const siteNavigation: SiteNavigation = {
	home: {
		url: '/',
		showInNav: false,
		externalLink: false,
		showHeader: false,
		padding: false,
		title: 'Home',
		description: 'Creating Hokie Hackers Since 2011',
	},
	about: {
		...defaultNavItem,
		url: '#',
		title: 'About',
		description: 'Learn more about CyberVT',
		externalLink: false,
		showInNav: true,
		showHeader: true,
		padding: true,
		children: {
			aboutPage: {
				...defaultNavItem,
				url: '/about',
				title: 'About CyberVT',
				description: 'About CyberVT',
				externalLink: false,
				showInNav: true,
				showHeader: true,
				padding: true,
			},
			sponsors: {
				...defaultNavItem,
				url: '/sponsors',
				title: 'Sponsors',
				description: 'Sponsorship information',
				externalLink: false,
				showInNav: true,
				showHeader: true,
				padding: true,
			},
			// alumni: {
			// 	...defaultNavItem,
			// 	url: '/alumni',
			// 	title: 'Alumni Focus',
			// 	description: 'Stories and updates from CyberVT alumni',
			// 	externalLink: false,
			// 	showInNav: true,
			// 	showHeader: true,
			// 	padding: true,
			// },
			contact: {
				url: '/contact',
				title: 'Contact',
				description: 'Get in touch with CyberVT',
				externalLink: false,
				showInNav: true,
				showHeader: true,
				padding: true,
			},
		},
	},
	community: {
		...defaultNavItem,
		url: '#',
		title: 'Community',
		description: 'Join our community',
		externalLink: false,
		showInNav: true,
		showHeader: true,
		padding: true,
		children: {
			gallery: {
				...defaultNavItem,
				url: '/gallery',
				externalLink: false,
				title: 'Gallery',
				description: 'Photos from CyberVT',
				showInNav: true,
				showHeader: true,
				padding: true,
			},
			discord: {
				...defaultNavItem,
				url: discordUrl,
				externalLink: true,
				title: 'Discord',
				description: 'Discord server invite',
				showInNav: true,
				showHeader: true,
				padding: true,
			},
			instagram: {
				...defaultNavItem,
				url: 'https://www.instagram.com/cybervt', // Replace with actual Instagram URL
				externalLink: true,
				title: 'Instagram',
				description: 'Follow us on Instagram',
				showInNav: true,
				showHeader: true,
				padding: true,
			},
		},
	},
	events: {
		...defaultNavItem,
		url: '#',
		title: 'Events',
		description: 'Explore our events',
		externalLink: false,
		showInNav: true,
		showHeader: true,
		padding: true,
		children: {
			calendar: {
				...defaultNavItem,
				url: '/calendar',
				title: 'Calendar',
				description: 'Upcoming events',
				externalLink: false,
				showInNav: true,
				showHeader: true,
				padding: true,
			},
			// summitCTF: {
			// 	...defaultNavItem,
			// 	url: 'https://summitctf.org',
			// 	externalLink: true,
			// 	title: 'Summit CTF',
			// 	description: 'CyberVT\'s Annual CTF',
			// },
		},
	},
	resources: {
		...defaultNavItem,
		url: '#',
		title: 'Resources',
		description: 'Resources and updates',
		externalLink: false,
		showInNav: true,
		showHeader: true,
		padding: true,
		children: {
			readme: {
				...defaultNavItem,
				url: '/readme',
				title: 'README',
				description: 'Resources for new members',
				externalLink: false,
				showInNav: true,
				showHeader: true,
				padding: true,
			},
			newsletter: {
				...defaultNavItem,
				url: '/newsletter',
				title: 'Newsletters',
				description: 'CyberVT Newsletters',
				externalLink: false,
				showInNav: true,
				showHeader: true,
				padding: true,
			},
			// projects: {
			// 	...defaultNavItem,
			// 	url: '/projects',
			// 	title: 'Project Highlight',
			// 	description: 'Showcasing CyberVT projects',
			// },
		},
	},
	notFound: {
		url: '/404',
		showInNav: false,
		externalLink: false,
		showHeader: true,
		padding: true,
		title: '404',
		description: 'Segmentation fault (core dumped)',
	},
};

export function getNavArray(): PageProps[] {
	const pageArray: PageProps[] = [];
	for (const [_, value] of Object.entries(siteNavigation)) {
		if (value.children) {
			for (const [_, child] of Object.entries(value.children)) {
				pageArray.push(child);
			}
		} else {
			pageArray.push(value);
		}
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