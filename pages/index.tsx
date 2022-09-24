import {Card, Typography, Stack, Link as MuiLink, Box, CardMedia, Button} from '@mui/material';
import {red} from '@mui/material/colors';
import React from 'react';

import Head from 'next/head';

import Link from 'next/link';
import {PageProps, siteNavigation, siteTitle} from '../src/config';

export default function Index() {
	return (
		<div>

			<Card sx={{position: 'relative'}}>
				<CardMedia
					component='img'
					alt='Contemplative Reptile'
					image='img/day1.jpeg'
					title='CyberVT Background'
					height='400px'
					sx={{position: 'relative', filter: 'blur(5px)'}}
				/>
				<Box
					sx={{position: 'absolute',
						top: '50%',
						transform: 'translate(0%, -50%)',
						width: '100%',
						textAlign: 'center'}}
				>
					<Typography
						gutterBottom
						variant='h2'
						fontWeight='bold'
						color='white'
					>
						CYBERVT
					</Typography>
					<Typography
						color='white'
						variant='h6'
						fontWeight='bold'
					>
						{siteNavigation.home.description}
					</Typography>
				</Box>
			</Card>

			<Box
				width='100%'
				height='100%'
				maxWidth='lg'
				p={8}
				flexGrow={1}
				sx={{margin: '0 auto'}}
			>
				<Stack spacing={2}>
					<Typography variant='h4'>Home</Typography>
					<Typography>The Cybersecurity Club at Virginia Tech (CyberVT) is a student organization at Virginia Tech focused on educating students, faculty, and the wider Blacksburg public on cybersecurity. CyberVT provides a unique opportunity for students to collaborate and network with other aspiring security professionals.</Typography>
					<MuiLink component={Link} href='/about'>
						<Button variant='contained'>Learn More</Button>
					</MuiLink>
					<img [src]="img/day1.jpg" height="200"> <br/>
				</Stack>
			</Box>

		</div>
	);
}

export async function getStaticProps() {
	return {props: siteNavigation.home};
}
