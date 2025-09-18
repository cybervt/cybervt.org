import { Card, Typography, Stack, CardContent, Box, Grid, Button, IconButton, Link } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import React from 'react';

import { PageProps, discordUrl, siteNavigation } from '../src/config';

export default function Contact() {
	const myEmail = 'cyberclub@vt.edu';
	return (
		<Stack spacing={2}>
			<Typography variant='body1' color="text.secondary">
				There are many ways to stay in touch with the club, whether that be connecting with club leadership, or staying informed about club events.
			</Typography>

			<Box color="text.primary">
				<Grid container spacing={4}>
					<Grid item xs={12} md={4}>
						<Box sx={{ border: 1, borderColor: 'text', borderRadius: 2, p: 3, bgcolor: 'secondary.main', height: '100%' }}>
							<Stack spacing={2}>
								<Box textAlign='center'>
									<ChatBubbleOutlineIcon color='primary' sx={{ fontSize: 64 }} />
								</Box>
								<Typography color='text' variant='h4' textAlign='center' fontFamily='monospace'>
									$   ./Discord
								</Typography>
								<Typography textAlign='justify'>
									CyberVT has an official <Link href={discordUrl}>Discord server</Link> that we use as our primary medium of communication.
								</Typography>
								<Link href={discordUrl}>
									<Button fullWidth variant='contained' sx={{ color: 'text.primary' }}>Join Discord</Button>
								</Link>
							</Stack>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box sx={{ border: 1, borderColor: 'text', borderRadius: 2, p: 3, bgcolor: 'secondary.main', height: '100%' }}>
							<Stack spacing={2}>
								<Box textAlign='center'>
									<MailOutlineIcon color='primary' sx={{ fontSize: 64 }} />
								</Box>
								<Typography color='text' variant='h4' textAlign='center' fontFamily='monospace' >
									$   ./Email
								</Typography>
								<Typography textAlign='justify'>
									You can contact the officers of CyberVT by sending an email to <Link href={'mailto:' + myEmail}>{myEmail}</Link>.
								</Typography>
								<Link href={'mailto:' + myEmail}>
									<Button fullWidth variant='contained' sx={{ color: 'text.primary' }}> Email the Officers</Button>
								</Link>
							</Stack>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box sx={{ border: 1, borderColor: 'text', borderRadius: 2, p: 3, bgcolor: 'secondary.main', height: '100%' }}>
							<Stack spacing={2}>
								<Box textAlign='center'>
									<ThumbUpOffAltIcon color='primary' sx={{ fontSize: 64 }} />
								</Box>
								<Typography color='text' variant='h4' textAlign='center' fontFamily='monospace'>
									$   ./Social
								</Typography>
								<Typography textAlign='justify'>
									CyberVT has a LinkedIn, Instagram, and GitHub that you can follow to keep informed.
								</Typography>
								<Grid container spacing={0} textAlign='center'>
									<Grid item xs={4}>
										<a href='https://www.linkedin.com/groups/9524007/' target='_blank' rel='noreferrer'>
											<IconButton color='primary'>
												<LinkedInIcon sx={{ fontSize: 48 }} />
											</IconButton>
										</a>
									</Grid>
									<Grid item xs={4}>
										<a href='https://www.instagram.com/cybervt/' target='_blank' rel='noreferrer'>
											<IconButton color='primary'>
												<InstagramIcon sx={{ fontSize: 48 }} />
											</IconButton>
										</a>
									</Grid>
									<Grid item xs={0}>
										<a href='https://www.github.com/cybervt/' target='_blank' rel='noreferrer'>
											<IconButton color='primary'>
												<GitHubIcon sx={{ fontSize: 48 }} />
											</IconButton>
										</a>
									</Grid>
								</Grid>
							</Stack>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Stack >
	);
}

export async function getStaticProps() {
	return { props: siteNavigation.about.children?.contact ?? {} };
}
