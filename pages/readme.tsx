import React from 'react';
import { Typography, Stack, Link as MuiLink, Paper, List, ListItem, ListItemText, Box } from '@mui/material';
import { siteNavigation } from '../src/config';

export default function ReadMe() {
    return (
        <Stack spacing={3} sx={{ maxWidth: 1200, margin: '2rem auto', padding: '1rem' }}>
            <Box>
                <img
                    src="/img/large_meeting.jpg"
                    alt="CyberVT club meeting"
                    style={{ width: '100%', borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                />
            </Box>
            <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.secondary' }}>
                Welcome to CyberVT!
            </Typography>

            <Paper elevation={2} sx={{ padding: 2, bgcolor: 'secondary.main' }}>
                <Typography variant="body1">
                    New to cybersecurity or CyberVT? This page will help you get started, connect with our community, and begin your learning journey. Everyone is welcome, no experience required!
                </Typography>
            </Paper>


            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={3}
                sx={{ width: '100%' }}
            >
                {/* Checklist */}
                <Paper
                    elevation={3}
                    sx={{
                        flex: 1,
                        padding: 3,
                        minWidth: 280,
                        background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)',
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Getting Started Checklist
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <MuiLink href="https://discord.gg/your-discord-link" target="_blank" rel="noopener noreferrer" underline="hover">
                                        Join our Discord server
                                    </MuiLink>
                                }
                                secondary="Connect with other members, ask questions, and stay updated."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <MuiLink href="https://gobblerconnect.vt.edu/organization/cybervt" target="_blank" rel="noopener noreferrer" underline="hover">
                                        Join the Cyber Security Club on GobblerConnect
                                    </MuiLink>
                                }
                                secondary="Become an official member and get access to club events."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <MuiLink href="https://cybervt.org/calendar" target="_blank" rel="noopener noreferrer" underline="hover">
                                        Come to a club meeting!
                                    </MuiLink>
                                }
                                secondary="Check our calendar for upcoming meetings and events."
                            />
                        </ListItem>
                    </List>
                </Paper>

                {/* Practice Platforms */}
                <Paper
                    elevation={3}
                    sx={{
                        flex: 1,
                        padding: 3,
                        minWidth: 280,
                        background: 'linear-gradient(135deg, #fce4ec 0%, #fff 100%)',
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Beginner-Friendly Practice Platforms
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <MuiLink href="https://overthewire.org/wargames/bandit/" target="_blank" rel="noopener noreferrer" underline="hover">
                                        OverTheWire Bandit
                                    </MuiLink>
                                }
                                secondary="Learn and practice basic Linux and command-line skills."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <MuiLink href="https://picoctf.org/" target="_blank" rel="noopener noreferrer" underline="hover">
                                        PicoCTF
                                    </MuiLink>
                                }
                                secondary="Simple and always available beginner CTF questions."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <MuiLink href="https://academy.hackthebox.com/" target="_blank" rel="noopener noreferrer" underline="hover">
                                        Hack The Box Academy
                                    </MuiLink>
                                }
                                secondary="Practice penetration testing and hacking skills in a safe environment."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <MuiLink href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer" underline="hover">
                                        TryHackMe
                                    </MuiLink>
                                }
                                secondary="Interactive cybersecurity training through guided exercises."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <MuiLink href="https://pwn.college/" target="_blank" rel="noopener noreferrer" underline="hover">
                                        Pwn.college
                                    </MuiLink>
                                }
                                secondary="Open cybersecurity education platform focused on offensive security skills."
                            />
                        </ListItem>
                    </List>
                </Paper>
            </Stack>

            {/* Second Row: YouTube & Tools */}
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={3}
                sx={{ width: '100%' }}
            >
                {/* YouTube Channels */}
                <Paper
                    elevation={3}
                    sx={{
                        flex: 1,
                        padding: 3,
                        minWidth: 280,
                        background: 'linear-gradient(135deg, #e8f5e9 0%, #fff 100%)',
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        YouTube Channels
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <MuiLink href="https://www.youtube.com/@_JohnHammond" target="_blank" rel="noopener noreferrer" underline="hover">
                                        John Hammond
                                    </MuiLink>
                                }
                                secondary="Tutorials, walkthroughs, and cybersecurity tips."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <MuiLink href="https://www.youtube.com/liveoverflow" target="_blank" rel="noopener noreferrer" underline="hover">
                                        LiveOverflow
                                    </MuiLink>
                                }
                                secondary="Deep dives into hacking concepts and CTF challenges."
                            />
                        </ListItem>
                    </List>
                </Paper>

                {/* Getting Started with Tools */}
                <Paper
                    elevation={3}
                    sx={{
                        flex: 1,
                        padding: 3,
                        minWidth: 280,
                        background: 'linear-gradient(135deg, #fffde7 0%, #fff 100%)',
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Getting Started with Tools
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <MuiLink href="https://www.youtube.com/watch?v=A1Bm9KmPQ0o" target="_blank" rel="noopener noreferrer" underline="hover">
                                        How to install Kali Linux in VMware (YouTube Guide)
                                    </MuiLink>
                                }
                            />
                        </ListItem>
                    </List>
                </Paper>
            </Stack>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginY: 4,
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        maxWidth: 1200,
                        width: '100%',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                    }}
                >
                    <img
                        src="/img/table_photo.jpeg"
                        alt="CyberVT students at table"
                        style={{
                            width: '100%',
                            display: 'block',
                            objectFit: 'cover',
                            height: 500,
                        }}
                    />
                </Paper>
            </Box>
        </Stack >
    );
}

export async function getStaticProps() {
    return { props: siteNavigation.resources.children?.ReadMe ?? {} };
}