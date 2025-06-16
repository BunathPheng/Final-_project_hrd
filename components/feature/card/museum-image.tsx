'use client'

import Image from "next/image";

type MuseumImageProps = {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    sizes?: string;
};

const MuseumImage: React.FC<MuseumImageProps> = ({ 
    src, 
    alt, 
    className, 
    width = 400, 
    height = 300, 
    sizes 
}) => {
    return (
        <Image
            src={src || '/placeholder-museum.jpg'}
            alt={alt}
            className={className}
            width={width}
            height={height}
            sizes={sizes}
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-museum.jpg';
            }}
        />
    );
};

export default MuseumImage;