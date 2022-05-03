import {GraphQLClient} from 'graphql-request';

import React from 'react';

/** Color mode type */
export type CurrentColorMode = 'light' | 'dark';

/** Page type  */
export type Page = {
  title: string;
  url: string;
};

/** Global variables type */
export type GlobalVars = {
  isDesktop: boolean;
  currentColorMode: CurrentColorMode;
};

/** Global variables */
export const GlobalContext = React.createContext<GlobalVars>({
  isDesktop: true,
  currentColorMode: 'light',
} as GlobalVars);

/** The site navigation */
export const SiteNavigation: Page[] = [
  // {title: 'Blog', url: '/blog'},
  {title: 'Contact', url: '/contact'},
  // {title: 'Sponsors', url: '/sponsors'},
];

/** The GraphQL server we get our content from */
export const APIClient = new GraphQLClient(process.env.API_URL as string, {
  headers: {
    Authorization: `Bearer ${process.env.API_SECRET as string}`,
  },
});

export const SiteURL = 'cybervt.org';

/** Site title (in <head>) */
export const SiteTitle = 'CyberVT';
