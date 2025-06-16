"use client";

import React from "react";
import { AnimatedSection } from "@/components/feature/animation/animation-section";

type EventSkeletonProps = {
    count?: number;
    isMuseumOwner?: boolean;
};

const EventCollectionSkeleton: React.FC<EventSkeletonProps> = ({ count = 6, isMuseumOwner = false }) => {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-10 w-full">
            {Array.from({ length: count }).map((_, i) => (
                <AnimatedSection key={i} animation="zoom-in" className="overflow-hidden shadow-300 rounded-md bg-white animate-pulse">
                    {/* Image section */}
                    <div className="relative">
                        <div className="w-full h-72 bg-grey-100" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

                        {/* Placeholder for title and subtitle */}
                        <div className="absolute left-7 bottom-5 w-full pr-14 flex flex-col gap-2">
                            <div className="h-6 bg-grey-200 rounded w-3/4" /> {/* Title */}
                            <div className="w-2/5 h-px bg-gradient-to-r from-transparent via-yellow to-transparent" />
                            <div className="h-4 bg-grey-100 rounded w-1/2" /> {/* Subtitle */}
                        </div>

                        {/* Three-dot menu placeholder for Museum Owners */}
                        {isMuseumOwner && (
                            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full" />
                        )}
                    </div>

                    {/* Content section */}
                    <div className="p-7 space-y-5">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent" />

                        {/* Content placeholder */}
                        <div className="h-4 bg-grey-100 rounded w-full" />
                        <div className="h-4 bg-grey-100 rounded w-5/6" />
                        <div className="h-4 bg-grey-100 rounded w-2/3" />

                        {/* Date section */}
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-grey-200 rounded-full" /> {/* Calendar icon */}
                            <div className="h-4 bg-grey-100 rounded w-1/2" /> {/* Date */}
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent" />
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
};

export default EventCollectionSkeleton;
