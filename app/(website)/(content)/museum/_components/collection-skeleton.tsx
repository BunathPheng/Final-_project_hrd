import { FC } from "react";

// Main skeleton component with grid layout
export const ColectionSkeleton: FC = ({ count = 4 }: { count?: number }) => (
    <>
        <div className="flex justify-between items-center">
            <div className="h-10 w-36 rounded-md bg-grey-100"></div>
            <div className="h-10 w-48 rounded-md bg-grey-100"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-7 xl:gap-10">
            {Array.from({ length: count }).map((_, index) => (
                <MuseumItemSkeleton key={index} />
            ))}
        </div>
    </>
);


// Individual skeleton card component
const MuseumItemSkeleton: FC = () => (
    <div className="overflow-hidden rounded-md relative bg-white shadow-400 animate-pulse">
        {/* Image skeleton */}
        <div className="h-52 bg-grey-100"></div>

        {/* Favorite button skeleton */}
        <div className="absolute right-3 top-3">
            <div className="w-8 h-8 bg-grey-200 rounded-full"></div>
        </div>

        {/* Content skeleton */}
        <div className="flex flex-col gap-2 p-5">
            {/* Title skeleton */}
            <div className="h-6 bg-grey-100 rounded w-3/4 pr-12"></div>

            {/* Divider skeleton */}
            <div className="rounded-full bg-grey-100 h-1 w-16"></div>

            {/* Description skeleton - 2 lines */}
            <div className="space-y-2">
                <div className="h-4 bg-grey-100 rounded w-full"></div>
                <div className="h-4 bg-grey-100 rounded w-2/3"></div>
            </div>

            {/* Category and rating row skeleton */}
            <div className="flex items-center justify-between gap-3">
                {/* Category badge skeleton */}
                <div className="h-6 bg-grey-100 rounded-full w-20"></div>

                {/* Star rating skeleton */}
                <div className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="w-4 h-4 bg-grey-100 rounded"></div>
                    ))}
                </div>
            </div>

            {/* Button skeleton */}
            <div className="mt-2 flex justify-end">
                <div className="h-10 bg-grey-200 rounded-md w-24"></div>
            </div>
        </div>
    </div>
);
