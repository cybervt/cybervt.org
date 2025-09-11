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
		name: 'Daniel Hollberg',
		position: 'President',
		img: '/img/exec/daniel.jpeg',
		bio: "Daniel is a Secure Computing major at Virginia Tech, graduating in May 2026. As President of CyberVT, Daniel leads the club's strategic vision to establish CyberVT as a leading center for cybersecurity education and professional development. Daniel has previously served as the club's Treasurer (AY 2024-2025) and as the Software Development Team Lead (AY 2023-2024). He brings extensive experience from his professional roles in industry and undergraduate research with VTNSI. His technical expertise spans AI/ML applications in cybersecurity, data analysis, software development, and cybersecurity training. Daniel is dedicated to fostering leadership development and building a collaborative community where members of all skill levels can advance their cybersecurity expertise. Beyond cybersecurity, Daniel enjoys hiking and cooking.",
	},
	{
		name: 'Marissa Muñoz',
		position: 'Vice President',
		img: '/img/exec/marissa.jpeg',
		bio: "Marissa is a Secure Computing major at Virginia Tech, graduating in May 2027, with minors in Leadership and Spanish. As Vice President of CyberVT, Marissa manages sponsor relations, oversees the club's mentorship program, and leads initiatives that connect students with professional development opportunities. Outside of academics and club responsibilities, Marissa is part of the Virginia Tech Corps of Cadets and enjoys traveling and playing volleyball.",
	},
	{
		name: 'Mark Shelton',
		position: 'Operations Officer',
		img: '/img/exec/mark.jpeg',
		bio: "Mark is a graduate student in his final year in the College of Engineering, pursuing a master\'s degree in Computer Science. As the Club's first Operations Officer, he aims to support the leadership team by coordinating operational tasks and ensuring everything runs smoothly.Outside of academics and club responsibilities, Mark enjoys golf, tennis, reading, improving existing skills and exploring new ones.",
	},
	{
		name: 'Thomas Craycroft',
		position: 'CTF Team Lead',
		img: '/img/exec/thomas.jpeg',
		bio: "Thomas is a Secure Computing major in his junior year of school at Virginia Tech. As CTF Team Lead, Thomas leads the weekly CTF meetings, schedules competitions and sets up the teams for those competitions. Outside of academics, Thomas enjoys rock climbing, hiking, cryptography, and going to the gym.",
	},
	{
		name: 'Lake Gohlke',
		position: 'Attack/Defense Team Lead',
		img: '/img/exec/lake.jpeg',
		bio: "Lake is a senior pursuing a major in Computer Science and a minor in Cybersecurity. As the Attack/Defense team lead, Lake leads the weekly Attack/Defense meeting, acts as the team captain for competitions like CCDC, DoE's Cyberforce, and RIT's ISTS. He also maintains a Proxmox virtual environment for club members to practice their technical skills leading up to competitions. In his free time, Lake enjoys golfing, mountain biking, going to the gym, and cooking.",
	},
	{
		name: 'Imran Hussein',
		position: 'Treasurer',
		img: '/img/exec/imran.jpeg',
		bio: "Imran is a senior at Virginia Tech studying Computer Science with a focus in Secure Computing. As the treasurer, Imran aims to utilize the club's financial resources to maximize opportunities for members in various ways, such as unlocking access to useful learning resources and sponsoring members to attend conferences and competitions across the country. In his free time, Imran enjoys going to the gym, working on cyber projects, and playing video games.",

	},
	{
		name: 'Jessica Vinh',
		position: 'Outreach Chair',
		img: '/img/exec/jessica.jpeg',
		bio: "Jessica is a Computer Science major at Virginia Tech with a minor in Human-Computer Interaction, graduating in May 2027. As the Outreach Chair for CyberVT, she furthers the clubs reach by contacting and facilitating collaboration between the departments and clubs at Virginia Tech, as well as fostering connections beyond the campus. Outside of CyberVT she is a member of the Corps of Cadets on track to commission in the Air Force and a Hokie ambassador for the college.  In her free time she enjoys spending time with friends and cafe hopping.",
	},
	{
		name: 'Sean Pierce',
		position: 'Social Media Manager',
		img: '/img/exec/sean.jpeg',
		bio: "Sean is a Cybersecurity and Data Analysis major at Virginia Tech and serves as the Social Media Chair for CyberVT. He manages the club's online presence by creating posts on Instagram to highlight meeting updates, upcoming events, and competition results. Sean joined CyberVT in Fall 2024 to strengthen his technical skills and expand his professional network in the cybersecurity field. Outside of academics and club involvement, he enjoys going to the gym, spending time with friends, and fishing.",
	},
	{
		name: 'Sriram Agaram',
		position: 'Events Coordinator',
		img: '/img/exec/sriram.jpeg',
		bio: "Sriram is a Secure Computing major at Virginia Tech graduating in 2028. As Events Coordinator Sriram plans different events for all club members. Sriram also works on the BCDC challenges along with Carson to teach and prepare freshman cybersecurity concepts to use at the National Security Agency\'s National Cyber.",
	},
	{
		name: 'Sanjay Suresh Chander',
		position: 'SummitCTF Chair',
		img: '/img/exec/sanjay.jpeg',
		bio: "Sanjay is a Computational Modeling and Data Analytics major at Virginia Tech, focusing on Cybersecurity and Cryptography, graduating in December 2027. As SummitCTF Chair, Sanjay focuses on the planning and execution of CyberVT's Summit CTF, a hybrid cybersecurity competition engaging with over 450 participants both virtually and on-site. In his free time, he likes to go to the gym, hang out outside with friends, and play soccer.",
	},
	{
		name: 'Connor Bluestein',
		position: 'Technical Director',
		img: '/img/exec/connor.jpeg',
		bio: "Connor is pursuing a Masters of Engineering degree in Computer Science and Applications with focus on Computer Security, graduating in May 2026. Connor has previously served as CyberVT's President (AY 2024-2025), Vice President (AY 2023-2024), and Data Analysis Team Lead (AY 2022-2023).",
	},
	{
		name: 'Carson Townsend',
		position: 'BCDC Team Lead',
		img: '/img/exec/carson.jpeg',
		bio: "Carson is a Cybersecurity Management and Analytics major at Virginia Tech planning to graduate in 2027. As the Cyber101 Coordinator, he is responsible for curating and maintaining the curriculum, ensuring that all members of CyberVT have a strong foundation to start out with, even if they don't have a technical background. In his free time, he enjoys recreational running, hanging out with his friends, and watching movies.",
	},
	{
		name: 'Ishan Panchal',
		position: 'NOVA Campus Liaison',
		img: '/img/exec/default.jpg',
		bio: " ",
	}
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
							<Stack spacing={0}>
								<Image
									alt={'Photo of ' + element.name}
									width="0"
									height="0"
									sizes="100vw"
									src={element.img}
									style={{ width: '100%', height: 'auto', maxWidth: 300, objectFit: 'cover', alignSelf: 'center' }}
								/>
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
