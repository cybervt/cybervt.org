import {Button, Box, Card, Typography, Stack} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React from 'react';

import {APIClient} from '../src/Config';
import {queryBugs} from '../src/Api';
import Link from 'next/link';

import Head from 'next/head';
import {SiteTitle} from '../src/Config';

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export default function Reports({bugs}: {bugs: any[]}) {
  /* If bugs.cveId is undefined, then set it to an empty string. */
  const rows = bugs.map(bug => ({...bug, cveId: bug.cveId || 'N/A'}));
  const columns: GridColDef[] = [
    {field: 'year', headerName: 'Year', flex: 1},
    {field: 'cveId', headerName: 'CVE-ID', flex: 2},
    {field: 'product', headerName: 'Product', flex: 3},
    {field: 'vulnerability', headerName: 'Vulnerability', flex: 3},
    {
      field: 'report',
      headerName: 'Report',
      flex: 1,
      renderCell: params => {
        /* Get the report URL from the bug object. */
        const bugReportObj = params.row.bugReport;

        /* If bugReportObj is undefined, then return an empty string. */
        if (!bugReportObj) {
          return 'N/A';
        }

        return (
          <Link href={`bugs/${bugReportObj.slug}`} passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{textTransform: 'none'}}
            >
              View
            </Button>
          </Link>
        );
      },
    },
  ];

  return (
    <div>
      <Head>
        <title>{SiteTitle} | Bug Reports</title>
      </Head>
      <Stack spacing={2}>
        <Typography variant="h4">Bug Reports</Typography>
        <Card sx={{p: 2, borderRadius: 2, boxShadow: 4}}>
          Here are a list of security vulnerabilities that I've found outside of
          work. Other vulnerabilities may be hidden due to non-disclosure
          policies.
        </Card>
        <Card sx={{p: 2, borderRadius: 2, boxShadow: 4}}>
          <Box>
            <DataGrid
              autoHeight
              sx={{flexGrow: 1}}
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </Box>
        </Card>
      </Stack>
    </div>
  );
}

export async function getStaticProps() {
  const {bugs} = await APIClient.request(queryBugs);
  return {
    props: {
      bugs,
    },
  };
}
