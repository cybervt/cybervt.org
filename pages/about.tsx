import {relative} from 'node:path';
import React from 'react';
import {Typography, Stack, Grid, Box} from '@mui/material';
import Image from 'next/image';
import {siteNavigation} from '../src/config';

type CyberVtExec = {
	name: string;
	position: string;
	bio: string;
	img: string;
};

const currentExec: CyberVtExec[] = [
	{
		name: 'Grant Smith',
		position: 'President',
		img: '/img/exec/gsmith.jpg',
		bio: 'Grant Smith is an offensive security professional specializing in API hacking. In high school, he was a technical support specialist, but in recent years he has taken up critical roles at the Department of Defense and The Walt Disney Company doing offensive security.',
	},
	{
		name: 'Christian Johnson',
		position: 'Vice President',
		img: '/img/exec/cjohnson.jpg',
		bio: 'Christian Johnson has a passion for software reverse engineering. In his free time, he enjoys learning about malware triage. He has recently worked at Percival Engineering emulating embedded systems and testing these systems for security flaws.',
	},
	{
		name: 'David Smits',
		position: 'Treasurer',
		img: '/img/exec/dsmits.jpg',
		bio: 'David Smits is a sophomore majoring in Computer Science with minors in cybersecurity and math. David is interested in machine learning and automation in cybersecurity with a focus on web exploitation.',
	},
];

export default function About() {
	return (
		<Stack spacing={2}>
			<Typography
				variant='h4'
			>
				About CyberVT
			</Typography>
			<Typography>
				The Cybersecurity Club at Virginia Tech (CyberVT) is a student organization at Virginia Tech focused on educating students, faculty, and the wider Blacksburg public on cybersecurity.
			</Typography>
			<Typography>
				Our goal is to cater to all interested in cybersecurity: those with years of experience in cyber (through interesting and deeply technical presentations), and those who are just getting started (with our bi-weekly beginner meetings).
			</Typography>
			<Typography>
				Throughout its history, CyberVT has been facilitating strong partnerships with other organizations. In fact, CyberVT and the Virginia Tech Corps of Cadets Cyber Team have recently partnered up to share knowledge and cater topics to both groups.
			</Typography>
			<Typography variant='h4'>
				Beginner Meetings
			</Typography>
			<Typography>
				CyberVT offers bi-weekly beginner meetings to teach interested students about offensive and defensive cybersecurity concepts. We offer free training in reverse engineering, binary exploitation, web application penetration testing, cryptography, and many other categories.
			</Typography>
			<Typography variant='h4'>
				Technical Talks
			</Typography>
			<Typography>
				Pending interest and speaker availability, CyberVT offers weekly technical presentations during our advanced meetings. In the past, we&apos;ve given talks on hacking video games, reverse engineering mobile applications, software obfuscation techniques, and malware analysis.
			</Typography>
			<Typography
				variant='h4'
			>
				Leadership
			</Typography>
			<span>
				<Typography
					variant='body1'
				>
					The executive body of CyberVT consists of a President, Vice President, and Treasurer. These are the students who have been elected by popular vote for the current academic year.
				</Typography>
				<Box p={2}/>
				<Grid container justifyContent='space-evenly' spacing={8}>
					{currentExec.map(element => (
						<Grid key={element.name} item xs={12} md={4}>
							<Stack spacing={0}>
								<Image width='100%' height='100%' layout='responsive' objectFit='contain' src={element.img}/>
								<Typography variant='h5' fontWeight='bold' textAlign='center' color='text.secondary'>
									{element.name}
								</Typography>
								<Typography textAlign='center' color='text.secondary'>
									{element.position}
								</Typography>
								<Typography textAlign='justify'>
									{element.bio}
								</Typography>
							</Stack>
						</Grid>
					))}
				</Grid>
			</span>

			<Typography
				variant='h4'
			>
				History
			</Typography>
			<Typography
				variant='body1'
			>
				CyberVT (formerly VTCSEC) was officially founded in the fall semester of 2011 by Reese Moore (President), Scott Salcetti (Vice President), and James Schwinabart (Treasurer). Many of the founders were Linux and Unix Users Group at Virginia Tech (VTLUUG) members who wanted to create a student organization focused on security and privacy.
			</Typography>

		</Stack>
	);
}

export async function getStaticProps() {
	return {props: siteNavigation.about};
}
