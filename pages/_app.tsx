/* React imports */
import React from 'react';

/* Next.js imports */
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';

import BaseLayout from '../components/layout';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
	return (
		<BaseLayout>
			<Component {...pageProps}/>
		</BaseLayout>
	);
}
