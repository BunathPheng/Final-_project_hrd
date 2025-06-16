import { Clock, Location, Star1 } from 'iconsax-reactjs';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Favorite from '@/components/feature/button/favorite';
import { apiRequest } from '@/utils/api';
import { ApiResponse, PageProps } from '@/types/response';
import { SmartImage } from '@/components/feature/fallback/smart-image';
import { convertTo12Hour } from '@/utils/format';
import { EmptyMuseum } from './empty-museum';
import { AnimatedSection } from '@/components/feature/animation/animation-section';
import { getVisitorId } from '@/utils/session';

export type MuseumAreaProps = {
    museumId: string;
    name: string;
    logoLink: string | null;
    address: string | null;
    distanceKm: string | null;
    isFavorite: boolean;
    averageRating: string | null;
    openTime: string | null;
    closeTime: string | null;
    totalReviews: number;
}

const MuseumArea: React.FC<PageProps> = async ({ searchParams }) => {
    const resolvedSearchParams = await searchParams;
    const lat = resolvedSearchParams?.lat || "";
    const lng = resolvedSearchParams?.lng || "";
    const distance = resolvedSearchParams?.distance || "0";

    const visitorId = await getVisitorId();

    const responseMuseum = await apiRequest<ApiResponse<MuseumAreaProps[]>>(`/museums/nearby?lat=${lat}&lng=${lng}&distance=${distance}`);
    const museums = responseMuseum?.payload || [];

    return (
        <>
            {(!museums || museums.length === 0) && <EmptyMuseum description="Try adjusting your search location or distance" />}
            {(museums && museums.length > 0) && (
                <div className="grid lg:grid-cols-2 w-full gap-7 xl:gap-10">
                    {museums.map(item => (
                        <AnimatedSection key={item?.museumId} animation="zoom-in" className="grid overflow-hidden rounded-md bg-white shadow-400">
                            <div className="w-full flex items-start sm:items-start lg:items-start xl:items-center gap-0 sm:gap-5 lg:gap-2 xl:gap-8 h-full">
                                <div className="w-44 sm:w-50 lg:w-44 xl:w-50 h-44 sm:h-50 lg:h-44 xl:h-50 shrink-0 p-4 sm:p-0 lg:p-4 xl:p-0">
                                    <SmartImage src={item?.logoLink} className="w-full h-full rounded-lg sm:rounded-none lg:rounded-lg xl:rounded-none object-cover" width={200} height={200} alt={item?.name} />
                                </div>
                                <div className="basis-full h-full flex flex-col gap-2 xl:gap-2.5 relative py-5 pr-5">
                                    <div className="absolute right-5 top-3">
                                        <Favorite id={item?.museumId} isFavorite={item.isFavorite || false} visitorId={visitorId} />
                                    </div>
                                    <h6 className="text-h6 line-clamp-1 pr-12">{item?.name}</h6>
                                    <div className="rounded-full bg-primary-700 h-1 w-16"></div>
                                    <div className="flex items-center gap-2.5">
                                        <Location size={18} className="shrink-0 [&>*]:stroke-primary-700" />
                                        <p className="text-p1 text-grey-800 line-clamp-1">{item.address}</p>
                                        <span className="shrink-0 text-p4 rounded-full px-2.5 py-0.5 bg-primary-50 text-primary-700">{item?.distanceKm || 0} km</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Clock size={18} className="shrink-0 [&>*]:stroke-primary-700" />
                                        {(item?.openTime && item?.closeTime) &&
                                            <p className="text-p1 text-grey-800 line-clamp-2">Open today: <span className="text-s2 text-slate-darker">{convertTo12Hour(item.openTime)}-{convertTo12Hour(item.closeTime)}</span></p>
                                        }
                                        {(!item?.openTime || !item?.closeTime) &&
                                            <p className="text-p1 text-grey-800 line-clamp-2">Open today: <span className="text-s2 text-primary-700">Closed</span></p>
                                        }
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <div className="flex items-center gap-2.5">
                                            <Star1 size={20} className="fill-yellow [&>*]:stroke-yellow" />
                                            <p className="text-s2 text-primary-700">{item?.averageRating || 0} <span className="text-p1 text-grey-800">({item?.totalReviews || 0})</span></p>
                                        </div>
                                        <Link href={`/museum/${item?.museumId}`}>
                                            <Button size={'sm'}>View Detail</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            )}
        </>
    );
}

export default MuseumArea;
