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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {getNavArray, globalContext, PageProps, siteTitle} from '../src/config';

export function MobileAppBar() {
	const [isOpen, setIsOpen] = React.useState(false);

	const context = React.useContext(globalContext);

	const toggleNavigationBarOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<AppBar position='static' sx={{padding: 2}}>
			<Toolbar>
				<Box flexGrow={1}>
					<IconButton
						color='inherit'
						aria-label='Menu'
						onClick={toggleNavigationBarOpen}
					>
						<MenuIcon/>
					</IconButton>
					{siteTitle.toLowerCase()}
				</Box>
			</Toolbar>
			<Collapse unmountOnExit in={isOpen} timeout='auto'>
				<List component='nav'>
					<ListItem key='/' style={{cursor: 'not-allowed'}}>
						<Link passHref href='/'>
							<Button color='inherit'>home</Button>
						</Link>
					</ListItem>
					{getNavArray().filter(c => c.showInNav).map(comp => (
						<ListItem key={comp.url} style={{cursor: 'not-allowed'}}>
							<Link passHref href={comp.url}>
								<Button color='inherit'>{comp.title.toLowerCase()}</Button>
							</Link>
						</ListItem>
					))}
				</List>
			</Collapse>
		</AppBar>
	);
}

function DesktopAppBar() {
	const context = React.useContext(globalContext);

	return (
		<AppBar position='static' sx={{padding: 2}}>
			<Toolbar>
				<Box flexGrow={1}>
					<Link passHref href='/'>
						<Button color='inherit' sx={{textTransform: 'none'}} variant='text'>
							{siteTitle.toLowerCase()}
						</Button>
					</Link>
				</Box>

				<Box>
					<Stack direction='row' spacing={2}>
						{getNavArray().filter(c => c.showInNav).map(comp => (
							<Link key={comp.url} passHref href={comp.url}>
								<Button
									key={comp.title}
									color='inherit'
									sx={{textTransform: 'none'}}
									variant='text'
								>
									{comp.title.toLowerCase()}
								</Button>
							</Link>
						))}
						<Link passHref href='/'>
							<Button
								color='inherit'
								sx={{textTransform: 'none'}}
								variant='outlined'
							>
								home
							</Button>
						</Link>
					</Stack>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export function NavigationBar() {
	const context = React.useContext(globalContext);
	return context.isDesktop ? (
		<DesktopAppBar/>
	) : (
		<MobileAppBar/>
	);
}
