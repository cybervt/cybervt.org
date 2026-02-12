import Carousel from 'react-bootstrap/Carousel';
import Box from '@mui/material/Box';

const path = '/img/sponsors/';
// Define your sponsor logo file paths here
const sponsorLogos = [
    //`${path}anteantech.png`,
    `${path}hii.svg`,
    `${path}percivaleng.png`,
    //`${path}tcmsecurity.png`,
    //`${path}comptia.png`,
    //`${path}northropgrumman.png`,
    `${path}phantomsecurity.png`,
    `${path}triplepointsecurity.png`
    `${path}smcci.png`
];

function chunkArray(arr: string[], size: number) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

export default function SponsorLogoCarousel() {
    // Show 4 logos at a time, adjust as needed
    const grouped = chunkArray(sponsorLogos, 4);

    return (
        <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', my: 4 }}>
            <Carousel
                interval={4000}
                controls={false}
                indicators={false}
                pause={false}
                style={{ width: '100%' }}
            >
                {grouped.map((group, idx) => (
                    <Carousel.Item key={idx}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 4,
                            py: 2,
                        }}>
                            {group.map((src, i) => (
                                <Box
                                    key={src}
                                    sx={{
                                        width: 400,
                                        height: 150,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 2,
                                        boxShadow: 1,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <img
                                        src={src}
                                        alt={`Sponsor logo ${i + 1}`}
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Box>
    );
}
