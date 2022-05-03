import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  atomOneLight as lightStyle,
  atomOneDark as darkStyle,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link as MuiLink,
  Paper,
} from '@mui/material';
import React from 'react';
import {
  APIClient,
  GlobalContext,
  SiteTitle,
  LinkedInURL,
} from '../../src/Config';
import {queryAllSlugs, queryBugReport} from '../../src/Api';

import Head from 'next/head';

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export default function BugReport({bugReport}: {bugReport: any}) {
  const context = React.useContext(GlobalContext);

  return (
    <div>
      <Head>
        <title>
          {SiteTitle} | Bug Report | {bugReport.title}
        </title>
      </Head>
      <Stack spacing={2}>
        <Typography variant="h4">{bugReport.title}</Typography>
        <Card sx={{p: 2, borderRadius: 2, boxShadow: 4}}>
          {/* Render the bug report from markdown */}
          <ReactMarkdown
            children={bugReport.content}
            components={{
              code({inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return /* TODO: When SyntaxHighlighter fixes types, remove 'any' */ !inline &&
                  match ? (
                  <SyntaxHighlighter
                    style={
                      (context.currentColorMode === 'dark'
                        ? darkStyle
                        : lightStyle) as any /* eslint-disable-line  @typescript-eslint/no-explicit-any */
                    }
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              table({children}) {
                return (
                  <TableContainer component={Paper} elevation={3}>
                    <Table>{children}</Table>
                  </TableContainer>
                );
              },
              thead({children}) {
                return <TableHead>{children}</TableHead>;
              },
              th({children}) {
                return <TableCell>{children}</TableCell>;
              },
              tr({children}) {
                return <TableRow>{children}</TableRow>;
              },
              td({children}) {
                return <TableCell>{children}</TableCell>;
              },
              tbody({children}) {
                return <TableBody>{children}</TableBody>;
              },
              a({href, children}) {
                return (
                  <MuiLink href={href} sx={{textDecoration: 'none'}}>
                    {children}
                  </MuiLink>
                );
              },
            }}
            remarkPlugins={[remarkGfm]}
          />
        </Card>

        {/* About the author */}
        <Card
          sx={{
            display: 'flex',
            p: 2,
            borderRadius: 2,
            boxShadow: 4,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <CardMedia
            sx={{
              display: 'flex',
              width: '200px',
              height: '200px',
              margin: 'auto',
              borderRadius: 2,
            }}
            component="img"
            image={bugReport.author.picture.url}
            alt="Profile picture"
          />
          <Box
            sx={{
              display: 'flex',
              flex: '1 0 200px',
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5" fontWeight="bold">
                  {bugReport.author.name.toUpperCase()}
                </Typography>
                <Typography variant="body1">
                  {bugReport.author.biography}
                </Typography>
                <Button
                  variant="contained"
                  color="info"
                  href={LinkedInURL}
                  target="_blank"
                >
                  Connect
                </Button>
              </Stack>
            </CardContent>
          </Box>
        </Card>
      </Stack>
    </div>
  );
}

export async function getStaticPaths() {
  const allSlugs = await APIClient.request(queryAllSlugs);

  const paths = allSlugs.bugReports.map(
    (slugObj: {slug: string}) => `/bugs/${slugObj.slug}`
  );

  return {
    paths: paths,
    fallback: false,
  };
}

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export async function getStaticProps(context: any) {
  const slugObj = context.params;

  /* If slug is undefined, then return an empty object. */
  if (slugObj === undefined) {
    return {props: null};
  }

  const myReport = await APIClient.request(queryBugReport, {
    slug: slugObj.report,
  });

  const bugReport = myReport.bugReport;

  return {
    props: {
      bugReport,
    },
  };
}
