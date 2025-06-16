import React, { FC } from 'react';

const MuseumCardSkeleton = ({ isLeft = true }) => {
    const border = isLeft ? "border-l-0 sm:border-l lg:border-l-0 xl:border-l" : "border-r-0 sm:border-r lg:border-r-0 xl:border-r";

    return (
        <div className="relative flex flex-col sm:flex-row lg:flex-col xl:flex-row bg-grey-100 rounded-md py-6 animate-pulse">
            {/* Main Content Section */}
            <div className={`basis-2/3 flex flex-col sm:flex-row gap-5 pb-5 sm:pb-0 lg:pb-5 xl:pb-0 pl-6 ${isLeft ? "" : "sm:order-last lg:order-first xl:order-last"}`}>
                {/* Image Skeleton */}
                <div className="flex pr-5 sm:pr-0 w-full sm:w-[8.25rem] h-56 sm:h-[11.75rem] shrink-0">
                    <div className="rounded-sm w-full h-full bg-grey-200"></div>
                </div>

                {/* Content Skeleton */}
                <div className="flex flex-col gap-4 text-white pr-3 flex-1">
                    {/* Rating Section */}
                    <div className="flex items-center gap-2.5">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-4 h-4 bg-grey-200 rounded-sm"></div>
                            ))}
                        </div>
                        <div className="h-4 w-20 bg-grey-200 rounded"></div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="space-y-2">
                        <div className="h-6 w-3/4 bg-grey-200 rounded"></div>
                    </div>

                    {/* Description Skeleton */}
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-grey-200 rounded"></div>
                        <div className="h-4 w-4/5 bg-grey-200 rounded"></div>
                    </div>

                    {/* Buttons Skeleton */}
                    <div className="flex gap-5">
                        <div className="h-9 w-24 bg-grey-200 rounded"></div>
                        <div className="h-9 w-24 bg-grey-200 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Information Section */}
            <div className={`relative basis-1/3 px-6 pt-5 sm:pt-0 lg:pt-5 xl:pt-0 text-white border-dashed border-white grid content-start gap-3 sm:gap-10 lg:gap-3 xl:gap-10 ${border}`}>
                {/* Information Title */}
                <div className="h-5 w-24 bg-grey-200 rounded mx-auto"></div>

                {/* Contact Info */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-grey-200 rounded"></div>
                        <div className="h-4 w-40 bg-grey-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-grey-200 rounded"></div>
                        <div className="h-4 w-28 bg-grey-200 rounded"></div>
                    </div>
                </div>

                {/* Corner Circles */}
                <div className="absolute -left-6 -top-6 sm:-top-12 lg:-top-6 xl:-top-12 bg-white rounded-full w-12 h-12"></div>
                <div className="absolute -left-6 -bottom-12 bg-white rounded-full w-12 h-12"></div>
                <div className="absolute -right-6 -top-6 sm:-top-12 lg:-top-6 xl:-top-12 bg-white rounded-full w-12 h-12"></div>
                <div className="absolute -right-6 -bottom-12 bg-white rounded-full w-12 h-12"></div>
            </div>
        </div>
    );
};

// Multiple skeleton cards for demo
export const PopularMuseumSkeleton: FC = () => {
    return (
        <>
            <MuseumCardSkeleton isLeft={true} />
            <MuseumCardSkeleton isLeft={false} />
            <MuseumCardSkeleton isLeft={true} />
            <MuseumCardSkeleton isLeft={false} />
        </>
    );
};
