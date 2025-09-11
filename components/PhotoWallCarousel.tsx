import { useState, useMemo } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';

const path = '/img/wall/';

const wallImages = [
    '2.jpeg', 'IMG_0865.JPG', 'PTS_0826.JPG', 'PTS_0909.JPG',
    '4.jpeg', 'IMG_0944.JPG', 'PTS_0854.JPG',
    '5.jpeg', 'IMG_1051.JPG', 'PTS_0860.JPG',
    'IMG_0843.JPG', 'IMG_3605.jpg', 'PTS_0884.JPG', 'IMG_0840.JPG', '6.jpeg',
];

function chunkArray(arr: string[], size: number) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function PhotoWallCarousel() {
    const [index, setIndex] = useState(0);

    const shuffledImages = useMemo(() => shuffleArray(wallImages.map(img => path + img)), []);
    const groupedImages = useMemo(() => chunkArray(shuffledImages, 3), [shuffledImages]);

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };

    return (
        <Box
            sx={{
                mt: 4,
                mb: 0,
                width: '100%',
                maxWidth: 1470,
                mx: 'auto',
                p: 1,
                overflow: 'hidden',
            }}
        >
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval={5000}
                controls={false}
                indicators={false}
                style={{ width: '100%' }}
            >
                {groupedImages.map((group, idx) => (
                    <Carousel.Item key={idx}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2,
                                flexWrap: 'nowrap',
                                height: { xs: 160, sm: 220, md: 260, lg: 300 },
                                overflow: 'hidden',
                            }}
                        >
                            {group.map((src, i) => (
                                <Box
                                    key={src}
                                    sx={{
                                        width: { xs: '32vw', sm: '28vw', md: '22vw', lg: 480 },
                                        maxWidth: 480,
                                        minWidth: 120,
                                        height: '100%',
                                        overflow: 'hidden',
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        flex: '0 0 auto',
                                    }}
                                >
                                    <img
                                        src={src}
                                        alt={`Photo wall ${i + 1}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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

export default PhotoWallCarousel;