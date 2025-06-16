import { FC } from "react";

export const CommentSkeleton: FC = () => {
    return (
        <div className="grid w-full gap-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col w-full gap-7 py-8 border-b border-grey-100 animate-pulse">
                    {/* Header: Avatar + Name + Date + Rating */}
                    <div className="flex w-full justify-between items-center gap-5">
                        {/* Avatar + Name & Date */}
                        <div className="flex items-center gap-3">
                            <div className="w-13 h-13 rounded-full bg-grey-200"></div>
                            <div className="flex flex-col gap-2">
                                <div className="w-32 h-4 bg-grey-200 rounded-md"></div> {/* Name */}
                                <div className="w-24 h-3 bg-grey-200 rounded-md"></div> {/* Date */}
                            </div>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex gap-1.5">
                            {[...Array(5)].map((_, idx) => (
                                <div key={idx} className="w-8 h-8 shrink-0 bg-grey-200 rounded-md"></div>
                            ))}
                        </div>
                    </div>

                    {/* Comment Line */}
                    <div className="flex flex-col gap-2">
                        <div className="w-full h-4 bg-grey-200 rounded-md"></div>
                        <div className="w-5/6 h-4 bg-grey-200 rounded-md"></div>
                        <div className="w-2/3 h-4 bg-grey-200 rounded-md"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
