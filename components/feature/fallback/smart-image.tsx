"use client"

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

type SmartImageProps = {
    src: string | null;
    fallbackSrc?: string;
    alt: string;
    showSkeleton?: boolean;
    priority?: boolean;
    className?: string;
} & Omit<ImageProps, 'src' | 'alt' | 'priority' | 'onLoad' | 'onError'>;

export const SmartImage: React.FC<SmartImageProps> = ({
    src,
    fallbackSrc = '/images/placeholder.svg',
    alt,
    showSkeleton = true,
    priority = false,
    className = "transition-opacity duration-300",
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentSrc, setCurrentSrc] = useState<string>(fallbackSrc);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const trimmedSrc = src?.trim() || '';
        const isValid = /^https?:\/\/|^\/[a-zA-Z0-9]/.test(trimmedSrc);
        setCurrentSrc(isValid ? trimmedSrc : fallbackSrc);
    }, [src, fallbackSrc]);

    const handleError = () => {
        if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
            setHasError(false);
        } else {
            setHasError(true);
        }
        setIsLoading(false);
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="relative overflow-hidden w-full h-full">
            {/* Skeleton loader */}
            {isLoading && showSkeleton && (
                <div className="absolute inset-0 rounded-md overflow-hidden bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse">
                    <div className="flex items-center shrink-0 justify-center h-full">
                        <svg className="w-12 h-12 text-gray-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Error state */}
            {hasError && (
                <Image
                    {...props}
                    src={fallbackSrc}
                    alt={alt}
                    className={`bg-white ${className}`}
                />
            )}

            <Image
                {...props}
                src={currentSrc}
                alt={alt}
                priority={priority}
                onLoad={handleLoad}
                onError={handleError}
                className={`bg-white ${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            />
        </div>
    );
};
