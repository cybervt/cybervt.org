/* React imports */
import type {ReactElement, ReactNode} from 'react';

/* Next.js imports */
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';

import BaseLayout from '../components/Layout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
}
