/* eslint-disable react/iframe-missing-sandbox */
import React from 'react';
import { Typography, Stack } from '@mui/material';
import { globalContext, siteNavigation } from '../src/config';

export default function Events() {
	const context = React.useContext(globalContext);

	/* I don't like the Google Calendar iframe. In the future, we should move away from iframes. */
	const calendar = context.isDesktop
		? <iframe src='https://calendar.google.com/calendar/embed?src=144d1f0eba1574036c21a52a9596bc8223a46a70aa0384ea818c57dbfd177a63%40group.calendar.google.com&ctz=America%2FNew_York' style={{ borderWidth: 0 }} width='100%' height='600' frameBorder='0' scrolling='no' />
		: <iframe src='https://calendar.google.com/calendar/embed?src=144d1f0eba1574036c21a52a9596bc8223a46a70aa0384ea818c57dbfd177a63%40group.calendar.google.com&ctz=America%2FNew_York' style={{ borderWidth: 0 }} width='100%' height='600' frameBorder='0' scrolling='no' />;

	return (
		<Stack spacing={2}>
			<Typography>
				CyberVT meets weekly in accordance with the Virginia Tech academic year. Below is a calendar of upcoming events, including Zoom links for virtual meetings.
			</Typography>
			{calendar}
		</Stack>
	);
}

export async function getStaticProps() {
	return { props: siteNavigation.calendar };
}
