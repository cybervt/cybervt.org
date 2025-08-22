import React from 'react';
import { Stack, Link as MuiLink, Typography } from '@mui/material';
import Link from 'next/link';
import { siteNavigation } from '../src/config';

interface Newsletter {
    semester: 'Spring' | 'Fall';
    year: string;
    filename: string;
    url: string;
}

type Props = {
    grouped: Record<string, Newsletter[]>;
};

export default function NewsletterPage({ grouped }: Props) {
    return (
        <Stack spacing={2} sx={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
            {Object.keys(grouped)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map((year) => (
                    <Stack key={year} spacing={1}>
                        <Typography variant="h5" component="h2">{year}</Typography>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {grouped[year]
                                .sort((a, b) => ['Spring', 'Fall'].indexOf(b.semester) - ['Spring', 'Fall'].indexOf(a.semester))
                                .map((n) => {
                                    const thumbUrl = `/newsletters/thumbnails/${n.filename.replace(/\.pdf$/i, '.png')}`;
                                    return (
                                        <li key={n.filename} style={{ marginBottom: '1.5rem' }}>
                                            <MuiLink href={`/pdf/${n.filename}`} underline="none" sx={{ display: 'inline-block', textAlign: 'center' }}>
                                                <img
                                                    src={thumbUrl}
                                                    alt={`${n.semester} ${n.year} Newsletter Thumbnail`}
                                                    style={{ width: '180px', height: 'auto', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 8, cursor: 'pointer' }}
                                                />
                                            </MuiLink>
                                            <br />
                                            <MuiLink href={`/pdf/${n.filename}`} underline="hover">
                                                {n.semester} {n.year} Newsletter
                                            </MuiLink>
                                        </li>
                                    );
                                })}
                        </ul>
                    </Stack>
                ))}
        </Stack>
    );
}

// --- Static props for build-time data ---
import fs from 'fs';
import path from 'path';

function parseNewsletterFilename(filename: string): Newsletter | null {
    const match = filename.match(/^(Spring|Fall)_(\d{4})\.pdf$/i);
    if (!match) return null;
    return {
        semester: match[1] as 'Spring' | 'Fall',
        year: match[2],
        filename,
        url: `/newsletters/${filename}`,
    };
}

export async function getStaticProps() {
    const newslettersDir = path.join(process.cwd(), 'public', 'newsletters');
    let files: string[] = [];
    try {
        files = fs.readdirSync(newslettersDir);
    } catch {
        files = [];
    }
    const newsletters = files
        .map(parseNewsletterFilename)
        .filter(Boolean) as Newsletter[];

    const semesterOrder = ['Spring', 'Fall'];
    newsletters.sort((a, b) => {
        if (a.year !== b.year) return parseInt(b.year) - parseInt(a.year);
        return semesterOrder.indexOf(b.semester) - semesterOrder.indexOf(a.semester);
    });

    const grouped: Record<string, Newsletter[]> = {};
    newsletters.forEach((n) => {
        if (!grouped[n.year]) grouped[n.year] = [];
        grouped[n.year].push(n);
    });

    // Merge props for layout header
    return { props: { ...siteNavigation.newsletter, grouped } };

}
