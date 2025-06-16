// Single museum item skeleton
const MuseumAreaItemSkeleton = () => (
    <div className="w-full flex items-center gap-8 overflow-hidden rounded-md bg-white shadow-400 animate-pulse">
        {/* Image skeleton */}
        <div className="w-50 min-h-50 h-full shrink-0 bg-grey-200"></div>

        {/* Content skeleton */}
        <div className="basis-full h-full flex flex-col gap-2 xl:gap-2.5 relative py-5 pr-5">
            {/* Favorite button skeleton */}
            <div className="absolute right-5 top-3">
                <div className="w-8 h-8 bg-grey-200 rounded-full"></div>
            </div>

            {/* Title skeleton */}
            <div className="h-6 bg-grey-200 rounded w-3/4 pr-12"></div>

            {/* Divider skeleton */}
            <div className="rounded-full bg-grey-200 h-1 w-16"></div>

            {/* Location section skeleton */}
            <div className="flex items-center gap-2.5">
                <div className="w-[18px] h-[18px] bg-grey-200 rounded shrink-0"></div>
                <div className="flex-1 space-y-1">
                    <div className="h-4 bg-grey-200 rounded w-full"></div>
                    <div className="h-4 bg-grey-200 rounded w-2/3"></div>
                </div>
                <div className="shrink-0 h-6 bg-grey-200 rounded-full w-12"></div>
            </div>

            {/* Opening hours section skeleton */}
            <div className="flex items-center gap-2.5">
                <div className="w-[18px] h-[18px] bg-grey-200 rounded shrink-0"></div>
                <div className="h-4 bg-grey-200 rounded w-3/5"></div>
            </div>

            {/* Rating and button section skeleton */}
            <div className="flex justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 bg-grey-200 rounded"></div>
                    <div className="h-4 bg-grey-200 rounded w-20"></div>
                </div>
                <div className="h-8 bg-grey-200 rounded w-24"></div>
            </div>
        </div>
    </div>
);

// Main skeleton component for the museum list
const MuseumAreaSkeleton = ({ count = 4 }: { count?: number }) => (
    <div className="grid lg:grid-cols-2 w-full gap-7 xl:gap-10">
        {[...Array(count)].map((_, index) => (
            <MuseumAreaItemSkeleton key={index} />
        ))}
    </div>
);

export { MuseumAreaSkeleton, MuseumAreaItemSkeleton };
