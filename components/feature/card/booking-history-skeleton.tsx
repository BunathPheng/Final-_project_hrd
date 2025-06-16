
import React, { FC } from 'react';
export const BookingHistoryCardSkeleton: FC = () => {
  return (
    <div className="max-w-full shrink-0 flex items-center bg-white rounded-[10px] shadow-sm animate-pulse">
      {/* Image Section Skeleton */}
      <div className="relative">
        <div className="max-w-64 h-45 bg-grey-200 rounded-lg"></div>
      </div>
      
      {/* Content Section Skeleton */}
      <div className="p-5 flex-1">
        {/* Title Skeleton */}
        <div className="mb-2">
          <div className="h-6 bg-grey-200 rounded w-3/4 mb-2"></div>
        </div>
        
        {/* Description Skeleton */}
        <div className="mb-6 w-1/2">
          <div className="h-4 bg-grey-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-grey-200 rounded w-2/3"></div>
        </div>
        
        {/* Buttons Skeleton */}
        <div className="flex gap-4">
          <div className="h-10 bg-grey-200 rounded w-32"></div>
          <div className="h-10 bg-grey-200 rounded w-28"></div>
        </div>
      </div>
      
      {/* Price and Status Section Skeleton */}
      <div className="flex flex-col items-end p-5">
        {/* Price Skeleton */}
        <div className="mb-4">
          <div className="h-6 bg-grey-200 rounded w-16"></div>
        </div>
        
        {/* Status Badges Skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-8 bg-grey-200 rounded-[10px] w-20"></div>
          <div className="h-8 bg-grey-200 rounded-[10px] w-24"></div>
        </div>
      </div>
    </div>
  );
};
