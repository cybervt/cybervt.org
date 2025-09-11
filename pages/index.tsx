import { Card, Typography, Stack, Link as MuiLink, Box, CardMedia, Button, Grid } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import PhotoWallCarousel from '../components/PhotoWallCarousel';
import SponsorLogoCarousel from '../components/SponsorLogoCarousel';



import Link from 'next/link';
import { PageProps, siteNavigation, siteTitle } from '../src/config';

const asciiArt = `
  e88'Y88           888                     Y8b Y88888P 88P'888'Y88 
 d888  'Y Y8b Y888P 888 88e   ,e e,  888,8,  Y8b Y888P  P'  888  'Y 
C8888      Y8b Y8P  888 888b d88 88b 888 "    Y8b Y8P       888     
 Y888  ,d   Y8b Y   888 888P 888   , 888       Y8b Y        888     
  "88,d88    888    888 88"   "YeeP" 888        Y8P         888     
             888                                                    
             888                                                    
`;

export const discordUrl = 'https://discord.gg/ghgpNdCctT';


export default function Index() {

	return (
		<div>
			<Card sx={{ position: 'relative', background: (theme) => theme.palette.secondary.main }}>
				<Box
					sx={{
						position: 'relative',
						width: '100%',
						textAlign: 'center',
						py: 6
					}}
				>
					<Typography
						gutterBottom
						variant='h2'
						fontWeight='bold'
						color='white'
						fontSize={20}
						sx={{
							textShadow: '0 5px 40px rgba(0, 0, 0, 1)'
						}}
					>
						<pre>{asciiArt}</pre>
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

			<PhotoWallCarousel />

			<Box
				width='100%'
				maxWidth='1600px'
				p={8}
				flexGrow={1}
				sx={{ margin: '0 auto', mt: -3 }}
			>
				<Grid container spacing={4} alignItems="stretch">
					<Grid item xs={12} md={5}>
						<Box sx={{ border: 1, borderColor: 'text', borderRadius: 2, p: 3, bgcolor: 'secondary.main', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
							<Stack spacing={2}>
								<Typography color="text.primary">
									The Cybersecurity Club at Virginia Tech (CyberVT) is a student organization at Virginia Tech focused on educating students, faculty, and the wider Blacksburg public on cybersecurity. CyberVT provides a unique opportunity for students to collaborate and network with other aspiring security professionals.
								</Typography>
								<MuiLink component={Link} href='/about' sx={{ color: 'text.primary' }}>
									<Button variant='contained' sx={{ color: 'text.primary' }}>Learn More</Button>
								</MuiLink>
							</Stack>
						</Box>
					</Grid>
					<Grid item xs={12} md={7}>
						<Box sx={{ border: 1, borderColor: 'text', borderRadius: 3, p: 5, bgcolor: 'secondary.main', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
							<Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom align="center" mb={5}>
								How to Join CyberVT
							</Typography>
							<Grid container spacing={3}>
								<Grid item xs={12} md={4}>
									<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
										<Box sx={{
											width: 44, height: 44, bgcolor: 'primary.main', color: 'text.primary',
											borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22
										}}>
											1
										</Box>
										<Typography fontWeight={600} color="text.primary" align="center">Check our meeting schedule</Typography>
										<Button
											component={Link}
											href="/calendar"
											variant="contained"
											color="primary"
											sx={{ mt: 1, textTransform: 'none', fontWeight: 600, color: 'text.primary', alignSelf: 'center' }}
										>
											Meeting Times
										</Button>
									</Box>
								</Grid>
								<Grid item xs={12} md={4}>
									<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
										<Box sx={{
											width: 44, height: 44, bgcolor: 'primary.main', color: 'text.primary',
											borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22
										}}>
											2
										</Box>
										<Typography fontWeight={600} color="text.primary" align="center">Join our Discord</Typography>
										<Button
											variant="contained"
											color="primary"
											href={discordUrl}
											target="_blank"
											rel="noopener noreferrer"
											sx={{ mt: 1, textTransform: 'none', fontWeight: 600, color: 'text.primary', alignSelf: 'center' }}
										>
											Connect Now
										</Button>
									</Box>
								</Grid>
								<Grid item xs={12} md={4}>
									<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
										<Box sx={{
											width: 44, height: 44, bgcolor: 'primary.main', color: 'text.primary',
											borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22
										}}>
											3
										</Box>
										<Typography fontWeight={600} color="text.primary" align="center">Sign up on GobblerConnect</Typography>
										<Button
											variant="contained"
											color="primary"
											href="https://gobblerconnect.vt.edu/organization/cybervt"
											target="_blank"
											rel="noreferrer"
											sx={{ mt: 1, textTransform: 'none', fontWeight: 600, color: 'text.primary', alignSelf: 'center' }}
										>
											Become a Member
										</Button>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Box >

			{/* Thank you message and sponsor carousel */}
			<Box sx={{ mt: -3, mb: 2, textAlign: 'center' }}>
				<Box sx={{ border: 1, borderColor: 'text', borderRadius: 2, p: 3, bgcolor: 'secondary.main', maxWidth: 1100, mx: 'auto', mb: 3 }}>
					<Typography variant="h5" color="text.primary" gutterBottom>
						We are deeply grateful to our sponsors for their generous support and commitment to CyberVT's mission. Without their support, our activities and learning opportunities would not be possible.
					</Typography>
					<Button
						variant="contained"
						color="primary"
						component={Link}
						href="/sponsors"
						sx={{ mt: 2, fontWeight: 800, color: 'text.primary' }}
					>
						View All Sponsors
					</Button>
				</Box>
				<SponsorLogoCarousel />

			</Box>

			<Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
				<Box sx={{ width: '100%', maxWidth: 1100 }}>
					<Typography
						variant="h4"
						fontWeight={700}
						align="center"
						gutterBottom
						sx={{ fontFamily: 'monospace', letterSpacing: 1, mt: 3, mb: 5, color: 'text.secondary' }}
					>
						$   ./Frequently Asked Questions
					</Typography>
					<Grid container spacing={6}>
						<Grid item xs={12} md={4} color="text.primary">
							<Box sx={{ border: 1, borderColor: 'text', borderRadius: 2, p: 3, bgcolor: 'secondary.main', height: '100%' }}>
								<Typography variant='h6' gutterBottom fontWeight="bold">
									Who Can Join?
								</Typography>
								<Typography>
									The club is open to all majors and skill levels. We are mostly comprised of Computer Science, Computer Engineering, and Business Information Technology students, but anyone interested in cybersecurity is welcome!
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={4} color="text.primary">
							<Box sx={{ border: 1, borderColor: 'text', borderRadius: 2, p: 3, bgcolor: 'secondary.main', height: '100%' }}>
								<Typography variant='h6' gutterBottom fontWeight="bold">
									Do I Need Any Prior Experience?
								</Typography>
								<Typography>
									No formal prerequisites! Members come from a variety of backgrounds. Bring curiosity and a willingness to learn.
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} md={4} color="text.primary" >
							<Box sx={{ border: 1, borderColor: 'text', borderRadius: 2, p: 3, bgcolor: 'secondary.main', height: '100%' }}>
								<Typography variant='h6' gutterBottom fontWeight="bold">
									How Do I Start Learning?
								</Typography>
								<Typography>
									Cybersecurity is a broad field. Our community will help you explore niches like penetration testing, forensics, binary exploitation, reverse engineering, and more.
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>

		</div >
	);
}

export async function getStaticProps() {
	return { props: { ...siteNavigation.home } };
}
