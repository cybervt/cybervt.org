/* React import */
import * as React from 'react';

/* Next.js imports */
import Link from 'next/link';

/* MUI imports */
import {
	Toolbar,
	AppBar,
	IconButton,
	List,
	ListItem,
	Collapse,
	Box,
	Button,
	Stack,
	Menu,
	MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'next/image';
import { getNavArray, globalContext, PageProps, siteTitle, siteNavigation } from '../src/config';

export function MobileAppBar() {
	const [isOpen, setIsOpen] = React.useState(false);
	const context = React.useContext(globalContext);

	const toggleNavigationBarOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<AppBar position="static" sx={{ padding: 2 }}>
			<Toolbar>
				<Box flexGrow={1}>
					<IconButton
						color="inherit"
						aria-label="Menu"
						onClick={toggleNavigationBarOpen}
					>
						<MenuIcon />
					</IconButton>
					{siteTitle.toLowerCase()}
				</Box>
			</Toolbar>
			<Collapse unmountOnExit in={isOpen} timeout="auto">
				<List component="nav">
					<ListItem key="/" style={{ cursor: 'not-allowed' }}>
						<Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
							<Button color="inherit">home</Button>
						</Link>
					</ListItem>
					{Object.entries(siteNavigation)
						.filter(([_, item]) => item.showInNav)
						.map(([key, item]) => (
							<React.Fragment key={key}>
								{item.children ? (
									<>
										<ListItem>
											<Button color="inherit" sx={{ textTransform: 'none' }}>
												{item.title.toLowerCase()}
											</Button>
										</ListItem>
										<List component="div" disablePadding sx={{ pl: 4 }}>
											{Object.entries(item.children).map(([childKey, child]) => (
												<ListItem key={childKey} style={{ cursor: 'not-allowed' }}>
													<Link
														href={child.url}
														style={{ color: 'white', textDecoration: 'none' }}
														{...(child.externalLink && { target: '_blank', rel: 'noopener noreferrer' })}
													>
														<Button
															color="inherit"
															sx={{ textTransform: 'none' }}
															startIcon={childKey === 'instagram' ? <InstagramIcon /> : undefined}
														>
															{child.title.toLowerCase()}
														</Button>
													</Link>
												</ListItem>
											))}
										</List>
									</>
								) : (
									<ListItem key={item.url} style={{ cursor: 'not-allowed' }}>
										<Link
											href={item.url}
											style={{ color: 'white', textDecoration: 'none' }}
											{...(item.externalLink && { target: '_blank', rel: 'noopener noreferrer' })}
										>
											<Button color="inherit" sx={{ textTransform: 'none' }}>
												{item.title.toLowerCase()}
											</Button>
										</Link>
									</ListItem>
								)}
							</React.Fragment>
						))}
				</List>
			</Collapse>
		</AppBar>
	);
}

function DesktopAppBar() {
	const context = React.useContext(globalContext);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [openMenu, setOpenMenu] = React.useState<string | null>(null);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, key: string) => {
		setAnchorEl(event.currentTarget);
		setOpenMenu(key);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setOpenMenu(null);
	};

	return (
		<AppBar position="static" sx={{ padding: 2 }}>
			<Toolbar>
				<Box flexGrow={1}>
					<Link style={{ color: 'white', textDecoration: 'none' }} href="/">
						<Image src="/img/logo.png" alt="CyberVT" width={150} height={62} style={{ verticalAlign: 'middle' }} />
					</Link>
				</Box>
				<Box>
					<Stack direction="row" spacing={2}>
						{Object.entries(siteNavigation)
							.filter(([_, item]) => item.showInNav)
							.map(([key, item]) => (
								item.children ? (
									<div key={key}>
										<Button
											color="inherit"
											sx={{ textTransform: 'none', color: 'text.primary' }} // Set text color to text.primary
											onClick={(e) => handleMenuOpen(e, key)}
											aria-haspopup="true"
											aria-expanded={openMenu === key ? 'true' : undefined}
										>
											{item.title.toLowerCase()}
										</Button>
										<Menu
											anchorEl={anchorEl}
											open={openMenu === key}
											onClose={handleMenuClose}
											MenuListProps={{ 'aria-labelledby': key }}
										>
											{Object.entries(item.children).map(([childKey, child]) => (
												<MenuItem
													key={childKey}
													component={Link}
													href={child.url}
													{...(child.externalLink && { target: '_blank', rel: 'noopener noreferrer' })}
													onClick={handleMenuClose}
													sx={{ color: 'text.primary' }} // Set dropdown text color
												>
													{child.title.toLowerCase()}
												</MenuItem>
											))}
										</Menu>
									</div>
								) : (
									<Link
										key={item.url}
										style={{ color: 'white', textDecoration: 'none' }}
										href={item.url}
										{...(item.externalLink && { target: '_blank', rel: 'noopener noreferrer' })}
									>
										<Button
											color="inherit"
											sx={{ textTransform: 'none', color: 'text.primary' }} // Set text color to text.primary
											variant="text"
										>
											{item.title.toLowerCase()}
										</Button>
									</Link>
								)
							))}
						<Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
							<Button
								color="inherit"
								sx={{ textTransform: 'none' }}
								variant="outlined"
							>
								home
							</Button>
						</Link>
					</Stack>
				</Box>
			</Toolbar>
		</AppBar >
	);
}

export function NavigationBar() {
	const context = React.useContext(globalContext);
	return context.isDesktop ? <DesktopAppBar /> : <MobileAppBar />;
}