

// Main skeleton component for the museum list
export const ZoneSkeleton = ({ count = 4 }: { count?: number }) => (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(count)].map((_, index) => (
            <div key={index} className="bg-white rounded-[10px] max-w-96 w-full shrink-0 shadow-sm overflow-hidden animate-pulse">
                {/* Image Container Skeleton */}
                <div className="relative h-48 bg-grey-200">
                    {/* Image Placeholder */}
                    <div className="w-full h-full bg-grey-100"></div>

                    {/* Category Badge Skeleton */}
                    <div className="absolute top-3 right-3">
                        <div className="bg-grey-200 rounded-[4px] h-6 w-16"></div>
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="p-4">
                    {/* Title Skeleton */}
                    <div className="mb-3">
                        <div className="h-6 bg-grey-300 rounded w-3/4 mb-2"></div>
                        <div className="h-6 bg-grey-300 rounded w-1/2"></div>
                    </div>

                    {/* Description Skeleton */}
                    <div className="mb-4">
                        <div className="h-4 bg-grey-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-grey-200 rounded w-4/5"></div>
                    </div>

                    {/* Button Skeleton */}
                    <div className="flex justify-end">
                        <div className="h-8 w-20 bg-grey-300 rounded"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
