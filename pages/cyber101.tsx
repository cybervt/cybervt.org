import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

// Replace these placeholders when the courseware and form are ready.
const COURSEWARE_FILE = '/data/CyberVTCybersecurity101.zip';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdSqSHG3Tm7bsnGBRDEidzMVjmHLt-JobaxqCt8FF7ukAhXbg/viewform';

export default function Cyber101() {
	return (
		<Stack spacing={4} alignItems='center' sx={{ width: '100%' }}>
			<Button
				component='a'
				href={COURSEWARE_FILE}
				download
				variant='contained'
				color='primary'
				sx={{
					fontFamily: 'monospace',
					fontWeight: 'bold',
					color: 'text.primary',
					textTransform: 'none',
					px: 3,
					py: 1.25,
				}}
			>
				download courseware
			</Button>

			<Typography
				color='text.secondary'
				fontFamily='monospace'
				textAlign='center'
			>
				Fill in the workbook then upload it below
			</Typography>

			<Box
				component='iframe'
				src={GOOGLE_FORM_URL}
				title='Cyber 101 form'
				sx={{
					width: '100%',
					minHeight: 900,
					border: 0,
				}}
			/>

			<Button
				component='a'
				href={GOOGLE_FORM_URL}
				target='_blank'
				rel='noopener noreferrer'
				variant='outlined'
				color='primary'
				sx={{
					fontFamily: 'monospace',
					fontWeight: 'bold',
					textTransform: 'none',
				}}
			>
				open form in a new tab
			</Button>
		</Stack>
	);
}

export async function getStaticProps() {
	return {
		props: {
			title: 'Cyber 101',
			description: 'Cyber 101 courseware and form',
			showHeader: true,
			showInNav: false,
			externalLink: false,
			padding: true,
			url: '/cyber101',
		},
	};
}
