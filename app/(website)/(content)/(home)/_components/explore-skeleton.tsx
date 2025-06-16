import React, { FC } from 'react';

export const ExploreSkeleton: FC = () => {
    return (
        <div className="bg-grey-100 h-72 w-full relative animate-pulse">
            <div className="absolute z-10 top-1/2 left-10 lg:left-1/10 -translate-y-1/2 flex flex-col gap-5">
                <div className="h-10 w-72 bg-grey-200 rounded-md"></div>
                <div className="h-10 w-56 bg-grey-200 rounded-md"></div>
                <div className="h-10 w-32 bg-grey-200 rounded-md"></div>
            </div>
        </div>
    );
};

export default ExploreSkeleton;
