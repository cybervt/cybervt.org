import React from 'react';
import { Typography, Stack, Grid, Box, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import { siteNavigation } from '../src/config';

interface SponsorTierOrder {
	[key: string]: number;
}

const tierOrder: SponsorTierOrder = {
	"Donations": 4,
	"Bronze": 3,
	"Silver": 2,
	"Gold": 1,
	"Diamond": 0
};


type Sponsor = {
	/* The company name */
	name: string;

	/* The company URL */
	url: string;

	/* The sponsorship tier of the sponsor. */
	sponsorType: string;

	/* A short description of the sponsor. */
	description: string;

	/* The location of the logo, e.g. '/img/sponsors/company.png' */
	logoLocation: string;

	/* We use this to track the last sponsor so we can remove them after a year */
	lastDonation: Date;
};

type SponsorshipTier = {
	name: string;
	priceMin: number;
	priceMax?: number;
	perks: string[];
};

const sponsors: Sponsor[] = [
	{
		name: 'Triple Point Security',
		url: 'https://www.triplepointsecurity.com/',
		sponsorType: 'Diamond',
		description: 'Triple Point Security is a cybersecurity company based in Leesburg, VA. They provide a variety of services to help clients protect their data and systems from cyber threats.',
		logoLocation: '/img/sponsors/triplepointsecurity.png',
		lastDonation: new Date('2025-06-27'),
	},
	{
		name: 'DoD Senior Military College Cyber Institute (SMCCI)',
		url: 'https://hume.vt.edu/undergraduate-education/workforce-development-programs/smc.html',
		sponsorType: 'Diamond',
		description: 'The Department of Defense Senior Military College Cyber Institute (SMCCI) aims to inspire and mentor undergraduate students interested in pursuing cyber-related careers with the Department of Defense (DoD) either as civilians or uniformed service members.',
		logoLocation: '/img/sponsors/smcci.png',
		lastDonation: new Date('2026-02-11'),
	},
	{
		name: 'Northrop Grumman',
		url: 'https://www.northropgrumman.com/',
		sponsorType: 'Diamond',
		description: 'Northrop Grumman is an American global aerospace and defense technology company. They provide various cybersecurity services to the government.',
		logoLocation: '/img/sponsors/northropgrumman.png',
		lastDonation: new Date('2024-11-30'),
	},
	{
		name: 'HII',
		url: 'https://hii.com',
		sponsorType: 'Gold',
		description: 'HII is a global engineering and defense technologies provider, and recognized worldwide as America’s largest shipbuilder.',
		logoLocation: '/img/sponsors/hii.svg',
		lastDonation: new Date('2025-10-21'),
	},
	{
		name: 'Antean Technologies',
		url: 'https://www.anteantech.com/',
		sponsorType: 'Silver',
		description: 'Antean Technologies employes technology, engineering, and management solutions to help their clients strengthen cybersecurity postures, align digital strategy to the overall mission, and gain organizational efficiencies.',
		logoLocation: '/img/sponsors/anteantech.png',
		lastDonation: new Date('2024-09-09'),
	},
	{
		name: 'Percival Engineering',
		url: 'https://www.percivaleng.com/',
		sponsorType: 'Silver',
		description: 'Percival Engineering develops cutting-edge engineering solutions to combat the most challenging cyber threats.',
		logoLocation: '/img/sponsors/percivaleng.png',
		lastDonation: new Date('2025-09-09'),
	},
	{
		name: 'TCM Security',
		url: 'https://www.tcm-sec.com/',
		sponsorType: 'Silver',
		description: 'TCM Security helps companies secure their data, systems, and networks. They offer a variety of services, including penetration testing, vulnerability assessments, and security training.',
		logoLocation: '/img/sponsors/tcmsecurity.png',
		lastDonation: new Date('2024-09-09'),
	},
	{
		name: 'CompTIA',
		url: 'https://www.comptia.org/',
		sponsorType: 'Silver',
		description: 'CompTIA is a leading provider of IT certifications and training. They offer a variety of certifications, including the Security+ certification.',
		logoLocation: '/img/sponsors/comptia.png',
		lastDonation: new Date('2024-09-09'),
	},
	{
		name: 'Phantom Security Group',
		url: 'https://phantomsec.tools/',
		sponsorType: 'Bronze',
		description: 'Phantom Security Group, a CyberVT Alumn Company, develops EvadeX, the ultimate Endpoint Detection and Response (EDR) evasion tool for automated and undetectable payload creation.',
		logoLocation: '/img/sponsors/phantomsecurity.png',
		lastDonation: new Date('2025-04-01'),
	},
].filter(sponsor => {
	/* Filter sponsors that have donated in the last year */
	const oneYearAgo = new Date();
	oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
	return sponsor.lastDonation > oneYearAgo;
}).sort((a, b) => {
	/* Sort sponsors by sponsorship tier */
	const aTier = tierOrder[a.sponsorType];
	const bTier = tierOrder[b.sponsorType];
	if (aTier !== bTier) {
		return aTier - bTier;
	}
	/* Sort sponsors within the same tier by last donation date */
	return b.lastDonation.getTime() - a.lastDonation.getTime();
});

const sponsorshipTiers: SponsorshipTier[] = [
	{
		name: 'Donations',
		priceMin: 100,
		priceMax: 499,
		perks: ['Mention on the CyberVT website\'s sponsors page'],
	},
	{
		name: 'Bronze',
		priceMin: 500,
		priceMax: 999,
		perks: ['Logo on the CyberVT website\'s sponsors page', 'Ability have time at end of technical talks for a bit of advertising and recruiting', 'Small swag (stickers, keychain, pens)'],
	},
	{
		name: 'Silver',
		priceMin: 1000,
		priceMax: 2999,
		perks: ['Ability to have speakers at CyberVT special events (including Summit)', 'Minimal advertising of job opportunities and events in meetings, emails, and the website'],
	},
	{
		name: 'Gold',
		priceMin: 3000,
		priceMax: 4999,
		perks: ['Large swag (t-shirts, mugs, etc.)', 'Advertise software', 'Ability to host CTFs at Virginia Tech, or create challenges for SummitCTF'],
	},
	{
		name: 'Diamond',
		priceMin: 5000,
		perks: ['Ability to host social events at or around Virginia Tech for CyberVT', 'Targeted recruiting of members', 'Public advertising of your organization at CTF Competitions by members / CTF team'],
	},
];

// Define colors for each tier
const tierColors: { [key: string]: string } = {
	Diamond: '#b9f2ff', // Diamond blue
	Gold: '#ffd700',
	Silver: '#c0c0c0',
	Bronze: '#cd7f32',
	Donations: '#f5f5f5',
};

export default function Sponsors() {
	// Get unique tiers in order
	const tiers = Object.keys(tierOrder).sort((a, b) => tierOrder[a] - tierOrder[b]);

	return (
		<Stack spacing={4}>
			<Typography color="text.secondary">
				CyberVT&apos;s primary mission is to promote cybersecurity education. To fulfil this mission, we accept donations from generous companies. We use sponsorship money to host events (like SummitCTF), pay for students to go to conferences such as DefCon and ShmooCon, and to purchase infrastructure.
			</Typography>
			<Typography variant='h4' color="text.secondary">Sponsorship Tiers</Typography>
			<span>
				<Typography color="text.secondary">CyberVT greatly appreciates your interest in sponsoring the club. The perks of your donation lasts for one year. Any swag that is promoted as a sponsorship tier is contingent on availability of the swag. Each sponsorship tier includes all of the benefits of the previous tiers.</Typography>
				<Box p={2} />
				<Box display="flex" justifyContent="center" alignItems="center" width="100%">
					<Image
						src="/docs/SponsorshipLevels.jpg"
						alt="Sponsorship Levels"
						width={800}
						height={600}
						style={{ maxWidth: '100%', height: 'auto' }}
					/>
				</Box>
			</span>

			<Typography variant='h4' color="text.secondary">Current Sponsors</Typography>
			{tiers.map(tier => {
				const sponsorsForTier = sponsors.filter(s => s.sponsorType === tier);
				if (sponsorsForTier.length === 0) return null;
				return (
					<Box
						key={tier}
						sx={{
							bgcolor: tierColors[tier] || 'background.paper',
							borderRadius: 3,
							p: 3,
							mb: 2,
							boxShadow: 2,
						}}
					>
						<Typography variant="h5" fontWeight="bold" align="center" sx={{ mb: 2 }} color="text.secondary">
							{tier} Sponsors
						</Typography>
						<Grid container spacing={2} justifyContent="center">
							{sponsorsForTier.map(sponsor => (
								<Grid key={sponsor.name} item xs={12} md={4}>
									<Stack spacing={1} alignItems="center">
										<Box display='flex' justifyContent='center' width='100%'>
											<Image src={sponsor.logoLocation} alt={'Logo of ' + sponsor.name} width={200} height={100} style={{ maxWidth: '100%', height: 'auto' }} />
										</Box>
										<MuiLink href={sponsor.url} target='_blank' rel='noreferrer'>
											<Typography variant='h6' fontWeight='bold' textAlign='center' color="text.secondary">
												{sponsor.name}
											</Typography>
										</MuiLink>
										<Typography textAlign='center' color="text.secondary">
											{sponsor.sponsorType}
										</Typography>
										<Typography textAlign='justify' color="text.secondary">
											{sponsor.description}
										</Typography>
									</Stack>
								</Grid>
							))}
						</Grid>
					</Box>
				);
			})}
		</Stack>
	);
}

export async function getStaticProps() {
	return { props: siteNavigation.about.children?.sponsors ?? {} };
}
