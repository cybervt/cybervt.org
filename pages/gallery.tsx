import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { Typography, Box } from "@mui/material";
import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import { siteNavigation } from '../src/config';

export async function getStaticProps() {
    const dir = path.join(process.cwd(), "public/img/gallery");
    const files = fs.readdirSync(dir).filter(file => /\.(jpe?g|png|webp)$/i.test(file));
    const photos = files.map(file => {
        const filePath = path.join(dir, file);
        const fileBuffer = fs.readFileSync(filePath);
        const uint8Array = new Uint8Array(fileBuffer.buffer, fileBuffer.byteOffset, fileBuffer.byteLength);
        const dimensions = sizeOf(uint8Array);
        return {
            src: `/img/gallery/${file}`,
            width: dimensions.width || 800,
            height: dimensions.height || 600,
        };
    });

    const navProps = siteNavigation.community.children?.gallery ?? {};
    return { props: { ...navProps, photos } };
}

type Photo = {
    src: string;
    width: number;
    height: number;
};

interface GalleryProps {
    photos: Photo[];
}

export default function Gallery({ photos }: GalleryProps) {
    return (
        <Box sx={{ maxWidth: 1500, mx: "auto", py: -2 }}>
            <RowsPhotoAlbum photos={photos} />
        </Box>
    );
}