import {Typography, Stack} from '@mui/material';

export default function Custom404() {
  return (
    <Stack spacing={2}>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        variant="h4"
      >
        404 - Page Not Found
      </Typography>
      <Typography
        variant="body1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Please let me know if you think this is an error by contacting me.
      </Typography>
    </Stack>
  );
}
