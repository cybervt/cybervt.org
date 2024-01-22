import React from 'react';
import { Link, Typography, Box } from '@mui/material';
import { globalContext } from '../src/config';

export default function Events() {
    const context = React.useContext(globalContext);

    const url = 'https://outlook.office365.com/owa/calendar/3edc428e321341ddbecc68b81c4cbbba@vt.edu/f02bab09096e422ba69eb018532c5bca9370545146257834267/calendar.html';
    const message = 'Office365 does not support iframe which broke this calendar, please click on the link above to view it on another page.'

    return (
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Link href={url} target="_blank" rel="noopener" variant="h6">
             View Calendar
        </Link>
        <Typography variant="body1" color='textSecondary'>
            {message}
        </Typography>
      </Box>
    )      
}           
