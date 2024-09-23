import { relative } from 'node:path';
import React from 'react';
import { Typography, Stack, Grid, Box } from '@mui/material';
import Image from 'next/image';
import { siteNavigation } from '../src/config';

/* Image imports */
import presentationImage from '../public/img/presentation.jpeg';

type CyberVtExec = {
	name: string;
	position: string;
	bio: string;
	img: string;
};

const currentExec: CyberVtExec[] = [
	{
		name: 'Connor Bluestein',
		position: 'President',
		img: '/img/exec/cbluestein.jpg',
		bio: 'Connor Bluestein is a junior in CMDA Cybersecurity and Cryptography. Since high school, he\'s been intrigued by cybersecurity. He previously led the Data Analysis Team, mastering tools like Splunk and Wireshark. He\'s competed in events like the NSA Cyber Exercise and SummitCTF. Connor aspires to work in federal cybersecurity, focusing on data analysis and offensive security. In the club, he aims to expand teams, launch certification programs, and spotlight members for sponsors. Beyond cybersecurity, he loves hiking, gym sessions, and pickleball.',
	},
	{
		name: 'Miles Zoellner',
		position: 'Vice President',
		img: '/img/exec/miles.png',
		bio: 'Miles Zoellner is a junior studying Secure Computing with a minor in Chinese Studies. He has been interested in cybersecurity since his junior year in high school, deciding to pursue it as a discipline at Virginia Tech. He has previously been the Malware Team lead, as well as the SummitCTF chairman. He likes spending his free time wasting it on the computer.',
	},
	{
		name: 'Daniel Hollberg',
		position: 'Treasurer',
		img: '/img/exec/daniel.png',
		bio: 'Daniel Hollberg is graduating in May 2026 with a B.S. in Secure Computing from Virginia Tech. As the treasurer of CyberVT, Daniel is committed to expanding the social outreach of the club, fostering collaboration with other Virginia Tech organizations, and strengthening relationships with current donors. He is passionate about cybersecurity and looks forward to continuing to contribute to the growth and success of the club.',
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
			<Image alt='Technical presentation' src={presentationImage} layout='responsive' />
			<Typography fontStyle='italic' align='center'>
				Former CyberVT member giving a technical presentation on reverse engineering the mobile application of a popular MMORPG game.
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
				<Box p={2} />
				<Grid container spacing={8}>
					{currentExec.map(element => (
						<Grid key={element.name} item xs={12} md={4}>
							<Stack spacing={0}>
								<Image alt={'Photo of ' + element.name} width="0" height="0" sizes="100vw" src={element.img} style={{ width: '100%', height: 'auto' }} />
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
	return { props: siteNavigation.about };
}
