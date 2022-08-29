import React from 'react';
import {Typography, Stack, Link as MuiLink} from '@mui/material';
import Link from 'next/link';
import {PageProps, siteNavigation} from '../src/config';

export default function Custom404() {
	return (
		<Stack spacing={2}>
			<Typography
				variant='body1'
			>
				Please let us know if you think this is an error by contacting CyberVT leadership. You can get in touch with us through our <Link passHref href='/contact'><MuiLink>contact</MuiLink></Link> page.
			</Typography>
		</Stack>
	);
}

export async function getStaticProps() {
	return {props: siteNavigation.notFound};
}
