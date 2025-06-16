import { FC } from "react";

export const MuseumEventSkeleton: FC = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-10 justify-between animate-pulse">
            {/* Left Side - Images Section */}
            <div className="w-full lg:w-1/2 flex flex-col p-6 md:p-10 rounded-md bg-grey-100 gap-6">
                {/* Main Image with Museum Tag */}
                <div className="relative overflow-hidden">
                    {/* Museum name tag skeleton */}
                    <div className="absolute left-0 top-0 rounded-ee-md rounded-ss-md bg-grey-200 z-10">
                        <div className="h-6 w-32 bg-grey-200 px-5 py-1 rounded-ee-md rounded-ss-md"></div>
                    </div>
                    {/* Main image skeleton */}
                    <div className="w-full h-44 bg-grey-200 rounded-md"></div>
                </div>

                {/* Secondary Images Row */}
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full md:max-w-1/2 h-44 bg-grey-200 rounded-md"></div>
                    <div className="w-full md:max-w-1/2 h-44 bg-grey-200 rounded-md"></div>
                </div>
            </div>

            {/* Right Side - Content Section */}
            <article className="w-full lg:w-1/2 pt-6 md:pt-10 flex flex-col gap-5">
                {/* Title Skeleton */}
                <div className="space-y-2">
                    <div className="h-8 w-full bg-grey-200 rounded"></div>
                    <div className="h-8 w-3/4 bg-grey-200 rounded"></div>
                </div>

                {/* Content Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 w-full bg-grey-200 rounded"></div>
                    <div className="h-4 w-full bg-grey-200 rounded"></div>
                    <div className="h-4 w-3/5 bg-grey-200 rounded"></div>
                </div>

                {/* Event Details Section */}
                <div className="w-full">
                    {/* Date Section */}
                    <div className="flex items-start gap-2 border-b pb-5">
                        <div className="w-5 h-5 bg-grey-200 rounded mt-0.5 flex-shrink-0"></div>
                        <div className="h-5 w-48 bg-grey-200 rounded"></div>
                    </div>

                    {/* Location Section */}
                    <div className="flex items-start gap-2 pt-5">
                        <div className="w-5 h-5 bg-grey-200 rounded mt-0.5 flex-shrink-0"></div>
                        <div className="space-y-1 flex-1">
                            <div className="h-5 w-64 bg-grey-200 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Button Skeleton */}
                <div className="mt-3">
                    <div className="h-12 w-36 bg-grey-200 rounded-md flex items-center gap-2 px-6">
                        <div className="h-4 w-20 bg-grey-200 rounded"></div>
                        <div className="w-6 h-6 bg-grey-200 rounded"></div>
                    </div>
                </div>
            </article>
        </div>
    );
};
