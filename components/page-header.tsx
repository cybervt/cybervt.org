import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { PageProps } from '../src/config';

export default function PageHeader(props: PageProps) {
	const header = (
		<Box textAlign='center' p={4} fontWeight='bold' bgcolor='secondary.main'>
			<Stack spacing={2}>
				<Typography
					color='text.primary'
					variant='h3'
					fontFamily='monospace'
					sx={{
						fontSize: { xs: '1.3rem', sm: '1.7rem', md: '2.1rem' },
					}}
				>
					$ ./{props.title?.toLowerCase()}
				</Typography>
				<Typography
					color='text.primary'
					fontFamily='monospace'
					sx={{
						fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.2rem' },
					}}
				>
					{props.description}
				</Typography>
			</Stack>
		</Box>
	);

	const pageTitle = `${props.title} - CyberVT`;

	return (
		<div>
			<Head>
				<title>{pageTitle}</title>
				<meta name='description' content={props.description} />
				<link rel="manifest" href="/manifest.json" />
			</Head>
			{props.showHeader && header}
		</div>
	);
}
