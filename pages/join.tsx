import React from 'react';
import { Typography, Stack, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { globalContext, siteNavigation } from '../src/config';

export default function Join() {
	return (
		<Stack spacing={2}>
			<Typography>
				Joining CyberVT is as simple as attending one of our meetings. You can find our schedule on the <Link passHref href='/calendar'><MuiLink>calendar</MuiLink></Link> page.
			</Typography>
			<Typography>
				If you are a student, you can become a voting member by joining our <MuiLink href='https://gobblerconnect.vt.edu/organization/csecvt' target='_blank' rel='noreferrer'>Gobblerconnect</MuiLink> page.
			</Typography>
			<Typography>
				The club is open to all majors and skill levels, but we are mostly comprised of Computer Science, Computer Engineering, and Business Information Technology students. Our goal is to foster an environment of curiosity and engagement in which anyone can learn cybersecurity topics, regardless of skill level. CyberVT is a diverse club of individuals with interests in many niches in the field of cybersecurity.
			</Typography>
			<Typography variant='h4'>
				Do I Need Any Prior Experience Before Joining?
			</Typography>
			<Typography>
				We have no formal prerequisites for joining the club. In fact, we have had members from a variety of different backgrounds and majors.
			</Typography>
			<Typography>
				We have found that the best way to learn is to stay committed and bring a willingness to learn to every meeting. In the case of most computer-related disciplines, it&apos;s not about how much you know, it&apos;s about your willingness to learn. The more you do to independently educate yourself, the more proficient you will become.
			</Typography>
			<Typography>
				Many of our successful members have came Virginia Tech with absolutely no cybersecurity education or computer science background. Those members stayed dedicated to the club, came to as many beginner meetings as possible, and studied cybersecurity in their own time.
			</Typography>
			<Typography variant='h4'>
				How Do I Start Learning?
			</Typography>
			<Typography>
				Like computer science, cybersecurity is a broad field with many different niches. Before you ask yourself this question, it is important to identify a niche within the industry that piques your interest.
			</Typography>
			<Typography>
				Of course, you do not need to know this right away. Our community will help you explore many different niches including penetration testing, data forensics, binary exploitation, reverse engineering, and many others.
			</Typography>
		</Stack>
	);
}

export async function getStaticProps() {
	return { props: siteNavigation.join };
}
