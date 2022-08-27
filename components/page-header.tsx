import React from 'react';
import {Box, Stack, Typography} from '@mui/material';
import Head from 'next/head';
import {PageProps} from '../src/config';

export default function PageHeader(props: PageProps) {
	const header = (
		<Box textAlign='center' p={6} fontWeight='bold' bgcolor='primary.main'>
			<Stack spacing={2}>
				<Typography color='primary.contrastText' variant='h3' fontFamily='monospace'>$ ./{props.title.toLowerCase()}</Typography>
				<Typography color='primary.contrastText' fontFamily='monospace'>{props.description}</Typography>
			</Stack>
		</Box>
	);

	const pageTitle = `${props.title} - CyberVT`;

	return (
		<div>
			<Head>
				<title>{pageTitle}</title>
				<meta name='description' content={props.description}/>
			</Head>
			{props.showHeader && header}
		</div>
	);
}
