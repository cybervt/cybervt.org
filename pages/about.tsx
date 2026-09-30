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
		name: 'Marissa Muñoz',
		position: 'President',
		img: '/img/exec/marissa.jpeg',
		bio: "Marissa is a senior pursuing a major in Computer Science with a concentration in Secure Computing and minors in Spanish and Leadership. As President of CyberVT, she leads the club’s executive team, coordinates meetings and club merchandise, and helps organize technical workshops, competitions, professional development events, and SummitCTF. She also leads the Virginia Tech Corps of Cadets Cyber Team and has gained cybersecurity experience through internships and competitions since her freshman year. In her free time, she enjoys playing volleyball, traveling, and spending time with family and friends.",
	},
	{
		name: 'Gray Groves',
		position: 'Vice President',
		img: '/img/exec/GrayGroves.jpg',
		bio: "Gray is a Computer Science major at Virginia Tech, graduating in Fall 2027. As Vice President for CyberVT, Gray manages sponsor relations, oversees the CyberVT Membership program, and works to build talent pipelines and job opportunities for VT students. He is part of the Virginia Tech Corps of Cadets, Senior Military College Cybersecurity Institute, and is leading the DoE Cyberforce Competition team this year. Gray enjoys hiking and climbing in his free time.",
	},
	{
		name: 'James Pavlichek',
		position: 'CTF Team Lead',
		img: '/img/exec/James.jpg',
		bio: "James is a Cybersecurity Management and Analytics major at Virginia Tech, graduating in May 2028 on an accelerated track before completing his master's the following year. As CTF Team Lead, James runs the weekly CTF meetings, builds the training schedule, and organizes teams for competitions throughout the year. His own focus is forensics and reverse engineering, and outside of school he works in cybersecurity at an IT government contracting firm. In his free time, James enjoys hiking, camping, and traveling.",
	},
	{
		name: 'Wesley Heltzel',
		position: 'Attack/Defense Team Lead',
		img: '/img/exec/wesley.jpg',
		bio: "Wesley is a senior pursuing a major in Secure Computing. As the Attack/Defense team lead, Wesley leads the weekly Attack/Defense meetings alongside Nathaniel Ahwee-Marrah and acts as team captain for various competitions. He also helps create labs via Virginia Tech's create range to provide training resources for Cyber VT members. In his free time, Wesley enjoys MMA, playing video games, and hanging out with friends.",
	},
	{
		name: 'Rijul Tandon',
		position: 'Treasurer',
		img: '/img/exec/rijul.jpeg',
		bio: "Rijul is a senior pursuing a major in Computational Modeling and Data Analytics with a concentration in Cryptography and Cybersecurity. As Treasurer, Rijul manages the club’s budget funding for events, handles reimbursements, and builds out the travel budgets that get teams to competitions. He also helps with sponsor outreach. In his free time, Rijul enjoys tennis & pickleball, hiking, and logging movies on Letterboxd.",

	},
	{
		name: 'Monty Harford',
		position: 'Public Relations Officer',
		img: '/img/exec/monty.jpg',
		bio: "Monty is a senior pursuing a computer science degree with minors in math and cybersecurity. As the public relations officer, Monty leads the marketing team, which manages much of the public facing aspects of the club such as discord, instagram, LinkedIn, and other marketing tasks. Monty is part of the ATB program (formerly DCTC), a track for DOW employment. In his free time, Monty enjoys biking, golfing, going to the gym, and reading.",
	},
	{
		name: 'Sriram Agaram',
		position: 'SummitCTF Chair',
		img: '/img/exec/SriramAgaram.jpeg',
		bio: "Sriram is a Computer Science major and is the lead for Virginia Tech’s annual SummitCTF. Along with Sean, he will organize the competition including creating challenges and coordinating with sponsors to deliver a great experience for beginners and advanced competitors alike.",
	},
	{
		name: 'Gavin Workman',
		position: 'Technical Director',
		img: '/img/exec/gavin.png',
		bio: "Gavin is pursuing a Bachelors of Science degree in Computer Science with focus on Cyber Security, graduating in May 2028. As Technical Director, Gavin manages the CyberVT and SummitCTF websites, aiming to make joining the club and staying in the know as easy and intuitive as possible. Gavin will work for the DoW after graduation, but in his free time, Gavin enjoys weightlifting, hanging out with friends, and videogames. ",
	},
	{
		name: 'Gabi Lockefeer',
		position: 'Marketing Committee',
		img: '/img/exec/gabi.jpeg',
		bio: "Gabi is majoring in Cybersecurity Management and Analytics and minoring in National Security and Foreign Affairs, graduating in May 2028. She is part of the marketing committee and focuses on running the club's LinkedIn profile; she keeps followers up to date with club initiatives as well as facilitates professional connections on the platform. In her free time she enjoys spending time outside, trying new coffee shops, and reading.",
	},
];

export default function About() {
	return (
		<Stack spacing={2} color={'text.secondary'}>
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
							<Stack spacing={0} alignItems="center">
								<Box
									sx={{
										width: '100%',
										maxWidth: 250,
										'@media (max-width:600px)': {
											maxWidth: 150,
										},
									}}
								>
									<Image
										alt={'Photo of ' + element.name}
										width={300}
										height={300}
										sizes="(max-width: 600px) 180px, 300px"
										src={element.img}
										style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', margin: '0 auto' }}
									/>
								</Box>
								<Typography variant='h5' fontWeight='bold' textAlign='center' color='text.secondary'>
									{element.name}
								</Typography>
								<Typography textAlign='center' color='text.secondary '>
									{element.position}
								</Typography>
								<Typography textAlign='justify' color='text.secondary'>
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
