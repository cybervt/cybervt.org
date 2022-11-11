import React from 'react';
import {Typography, Stack, Grid, Box, Link as MuiLink} from '@mui/material';
import Image from 'next/image';
import {siteNavigation} from '../src/config';

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
		sponsorType: 'Platinum',
		description: 'Triple Point Security is a cybersecurity company based in Leesburg, VA. They provide a variety of services to help clients protect their data and systems from cyber threats.',
		logoLocation: '/img/sponsors/triplepointsecurity.png',
		lastDonation: new Date('2022-10-25'),
	},
	{
		name: 'Northrop Grumman',
		url: 'https://www.northropgrumman.com/',
		sponsorType: 'Platinum',
		description: 'Northrop Grumman is an American global aerospace and defense technology company. They provide various cybersecurity services to the government.',
		logoLocation: '/img/sponsors/northropgrumman.png',
		lastDonation: new Date('2022-11-10'),
	},
].filter(sponsor => {
	/* Filter sponsors that have donated in the last year */
	const oneYearAgo = new Date();
	oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
	return sponsor.lastDonation > oneYearAgo;
}).sort((a, b) =>
	/* Sort sponsors by donation date */
	b.lastDonation.getTime() - a.lastDonation.getTime(),
);

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
		name: 'Platinum',
		priceMin: 5000,
		perks: ['Ability to host social events at or around Virginia Tech for CyberVT', 'Targeted recruiting of members', 'Public advertising of your organization at CTF Competitions by members / CTF team'],
	},
];

export default function Sponsors() {
	return (
		<Stack spacing={2}>
			<Typography>
				CyberVT&apos;s primary mission is to promote cybersecurity education. To fulfil this mission, we accept donations from generous companies. We use sponsorship money to host events (like SummitCTF), pay for students to go to conferences such as DefCon and ShmooCon, and to purchase infrastructure.
			</Typography>
			<Typography variant='h4'>Sponsorship Tiers</Typography>
			<span>
				<Typography>CyberVT greatly appreciates your interest in sponsoring the club. The perks of your donation lasts for one year. Any swag that is promoted as a sponsorship tier is contingent on availability of the swag. Each sponsorship tier includes all of the benefits of the previous tiers.</Typography>
				<Box p={2}/>
				<Grid container justifyContent='space-evenly' spacing={2}>
					{sponsorshipTiers.map(element => (
						<Grid key={element.name} item xs={12} md={4}>
							<Stack spacing={2}>
								<Typography variant='h5' fontWeight='bold' textAlign='center' color='text.secondary'>
									{element.name.toUpperCase()}
								</Typography>
								<Typography textAlign='center' color='text.secondary'>
									{element.priceMax === undefined ? `$${element.priceMin}+` : `$${element.priceMin} - $${element.priceMax}`}
								</Typography>
								<ul>
									{element.perks.map(perk => (
										<li key={perk}>
											{perk}
										</li>
									))}

								</ul>
							</Stack>
						</Grid>
					))}
				</Grid>
			</span>
			<Typography variant='h4'>Recruiting</Typography>
			<Typography>
				We welcome corporate representatives to give technical talks or workshops at our meetings on the condition that there is no recruiting. That said, we do offer sponsorship tiers that allow recruiting at the end of technical talks.
			</Typography>

			{ /* If there are no sponsors, don't show the sponsors section */}
			{sponsors.length <= 0 && (
				<>
					<Typography variant='h4'>Current Sponsors</Typography>
					<Typography>As CyberVT ramps up for the next academic year, we are looking for sponsors. In the past, we&apos;ve been sponsored by Triple Point Security, Virginia Tech IT Security Office, Eastman Chemical, Booz Allen Hamilton, and many others.</Typography>
				</>
			)}

			{sponsors.length > 0 && (
				<>
					<Typography variant='h4'>Current Sponsors</Typography>
					<Grid container justifyContent='space-evenly' spacing={2}>
						{sponsors.map(sponsor => (
							<Grid key={sponsor.name} item xs={12} md={4}>
								<Stack key={sponsor.name} spacing={1}>
									{/* Add logo on its own line. Use 100% width */}
									<Box display='flex' justifyContent='center' width='100%'>
										<Image src={sponsor.logoLocation} width='300px' height='100%' objectFit='contain'/>
									</Box>
									{/* Add name on its own line. Use 100% width */}
									<MuiLink href={sponsor.url} target='_blank' rel='noreferrer'>
										<Typography variant='h5' fontWeight='bold' textAlign='center' color='text.secondary'>
											{sponsor.name}
										</Typography>
									</MuiLink>

									<Typography textAlign='center' color='text.secondary'>
										{sponsor.sponsorType}
									</Typography>
									<Typography textAlign='justify'>
										{sponsor.description}
									</Typography>
								</Stack>
							</Grid>
						))}
					</Grid>
				</>
			)}
		</Stack>
	);
}

export async function getStaticProps() {
	return {props: siteNavigation.sponsors};
}
