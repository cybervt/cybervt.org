/* eslint-disable react/iframe-missing-sandbox */
import React from 'react';
import {Typography, Stack} from '@mui/material';
import {globalContext, siteNavigation} from '../src/config';

export default function Events() {
	const context = React.useContext(globalContext);

	/* I don't like the Google Calendar iframe. In the future, we should move away from iframes. */
	const calendar = context.isDesktop
		? <iframe src='https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&title=CyberVT%20Events&showTitle=0&showPrint=0&showTabs=1&showCalendars=0&mode=MONTH&src=Y19ycTk5Y3JoOTduaWw3YW50dW81ajBkczhrNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23F09300' style={{borderWidth: 0}} width='100%' height='600' frameBorder='0' scrolling='no'/>
		: <iframe src='https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&title=CyberVT%20Events&showTitle=0&showPrint=0&showTabs=0&showCalendars=0&mode=AGENDA&src=Y19ycTk5Y3JoOTduaWw3YW50dW81ajBkczhrNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23F09300' style={{borderWidth: 0}} width='100%' height='600' frameBorder='0' scrolling='no'/>;

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
	return {props: siteNavigation.calendar};
}
