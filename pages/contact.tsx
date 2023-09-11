import { Card, Typography, Stack, CardContent, Box, Grid, Button, IconButton, Link } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import React from 'react';

import { red } from '@mui/material/colors';
import { PageProps, discordUrl, siteNavigation } from '../src/config';

export default function Contact() {
	const myEmail = 'officers@cybervt.org';
	return (
		<Stack spacing={2}>
			<Typography variant='body1'>
				There are many ways to stay in touch with the club, whether that be connecting with club leadership, or staying informed about club events.
			</Typography>

			<Box>
				<Grid container spacing={4}>
					<Grid item xs={12} md={4}>
						<Stack spacing={1}>
							<Box textAlign='center'>
								<ChatBubbleOutlineIcon color='primary' sx={{ fontSize: 64 }} />
							</Box>
							<Typography color='primary' variant='h5' textAlign='center'>
								Discord
							</Typography>
							<Typography textAlign='justify'>
								CyberVT has an official <Link href={discordUrl}>Discord server</Link> that we use as our primary medium of communication.
							</Typography>

							<Link href={discordUrl}>
								<Button fullWidth variant='contained'>Join Discord</Button>
							</Link>
						</Stack>
					</Grid>
					<Grid item xs={12} md={4}>
						<Stack spacing={1}>
							<Box textAlign='center'>
								<MailOutlineIcon color='primary' sx={{ fontSize: 64 }} />
							</Box>
							<Typography color='primary' variant='h5' textAlign='center'>
								Email
							</Typography>
							<Typography textAlign='justify'>
								You can contact the officers of CyberVT by sending an email to <Link href={'mailto:' + myEmail}>{myEmail}</Link>. You can also subscribe to our <Link href='https://groups.google.com/u/1/a/vt.edu/g/cybersecurity-g'>mailing list</Link> to stay informed.
							</Typography>

							<Link href={'mailto:' + myEmail}>
								<Button fullWidth variant='contained'>Email the Officers</Button>
							</Link>
						</Stack>
					</Grid>
					<Grid item xs={12} md={4}>
						<Stack spacing={1}>
							<Box textAlign='center'>
								<ThumbUpOffAltIcon color='primary' sx={{ fontSize: 64 }} />
							</Box>
							<Typography color='primary' variant='h5' textAlign='center'>
								Social
							</Typography>
							<Typography textAlign='justify'>
								CyberVT has a Facebook, Instagram, and GitHub that you can follow to keep informed.
							</Typography>

							<Grid container spacing={1} textAlign='center'>
								<Grid item xs={4}>
									<a href='https://www.facebook.com/cybervt/' target='_blank' rel='noreferrer'>
										<IconButton color='primary'>
											<FacebookIcon sx={{ fontSize: 64 }} />
										</IconButton>
									</a>
								</Grid>
								<Grid item xs={4}>
									<a href='https://www.instagram.com/cybervt/' target='_blank' rel='noreferrer'>
										<IconButton color='primary'>
											<InstagramIcon sx={{ fontSize: 64 }} />
										</IconButton>
									</a>
								</Grid>
								<Grid item xs={4}>
									<a href='https://www.github.com/cybervt/' target='_blank' rel='noreferrer'>
										<IconButton color='primary'>
											<GitHubIcon sx={{ fontSize: 64 }} />
										</IconButton>
									</a>
								</Grid>
							</Grid>
						</Stack>
						{/* <Box textAlign='center'>
							<ThumbUpOffAltIcon sx={{fontSize: 64}}/>
							<Typography variant='h5'>
								Social Media
							</Typography>
							<Typography variant='body1'>
								CyberVT has a Facebook, Instagram, and GitHub that you can follow to keep informed.
							</Typography>
						</Box> */}
					</Grid>
				</Grid>
			</Box>
		</Stack>
	);
}

export async function getStaticProps() {
	return { props: siteNavigation.contact };
}
