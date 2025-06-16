import React, { FC } from "react";

const HeroSlideSkeleton: FC = () => {
    return (
        <div className="grid w-full relative">
            {/* Main skeleton slide container */}
            <div className="keen-slider flex w-full overflow-hidden">
                <div className="keen-slider__slide w-full">
                    {/* Hero section skeleton - adjust height as needed */}
                    <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg">
                        {/* Content skeleton inside hero */}
                        <div className="flex flex-col justify-center items-center h-full p-8 space-y-4">
                            {/* Title skeleton */}
                            <div className="h-8 bg-gray-300 rounded w-3/4 max-w-md"></div>
                            {/* Subtitle skeleton */}
                            <div className="h-4 bg-gray-300 rounded w-1/2 max-w-sm"></div>
                            {/* Button skeleton */}
                            <div className="h-12 bg-gray-300 rounded w-32 mt-6"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Left Arrow Skeleton */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
                <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-full"></div>
            </div>

            {/* Right Arrow Skeleton */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
                <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-full"></div>
            </div>

            {/* Dot Indicators Skeleton */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex gap-4 items-center">
                    {[...Array(3)].map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-3 h-3 rounded-full animate-pulse ${
                                idx === 0
                                    ? "bg-gray-400 scale-110"
                                    : "bg-gray-300"
                            }`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSlideSkeleton;
