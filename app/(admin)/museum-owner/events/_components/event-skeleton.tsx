import { FC } from "react";

// Main skeleton component with grid layout
export const EventSkeleton: FC = ({ count = 6 }: { count?: number }) => (
    <>
        <div className="flex justify-between items-center">
            <div className="h-10 w-36 rounded-md bg-grey-100"></div>
            <div className="h-10 w-48 rounded-md bg-grey-100"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-10 w-full">
            {Array.from({ length: count }).map((_, index) => (
                <EventItemSkeleton key={index} />
            ))}
        </div>
    </>
);


// Individual skeleton card component
const EventItemSkeleton: FC = () => (
    <div className="overflow-hidden rounded-md relative bg-white shadow-400 animate-pulse">
        {/* Image skeleton */}
        <div className="h-52 bg-grey-100 relative">
            {/* Delete/Update button skeleton */}
            <div className="absolute right-3 top-3">
                <div className="w-8 h-8 bg-grey-200 rounded-full"></div>
            </div>

            {/* Title and subtitle skeleton */}
            <div className="absolute bottom-3 left-3 w-full grid gap-2">
                <div className="w-2/3 h-6 bg-grey-200 rounded-md"></div>
                <div className="w-4/5 h-4 bg-grey-200 rounded-md"></div>
            </div>
        </div>

        {/* Content skeleton */}
        <div className="flex flex-col gap-2 p-5">
            {/* Divider skeleton */}
            <div className="rounded-full bg-gradient-to-r from-transparent via-grey-100 to-transparent h-1 w-4/5 mx-auto"></div>

            {/* Description skeleton - 2 lines */}
            <div className="space-y-2">
                <div className="h-4 bg-grey-100 rounded w-full"></div>
                <div className="h-4 bg-grey-100 rounded w-full"></div>
                <div className="h-4 bg-grey-100 rounded w-2/3"></div>
            </div>

            {/* Divider skeleton */}
            <div className="rounded-full bg-gradient-to-r from-transparent via-grey-100 to-transparent h-1 w-4/5 mx-auto"></div>

            {/* Date skeleton */}
            <div className="mt-2 flex gap-2">
                <div className="h-5 w-5 bg-grey-100 rounded-md"></div>
                <div className="h-5 bg-grey-100 rounded-md grow-1"></div>
            </div>
        </div>
    </div>
);
