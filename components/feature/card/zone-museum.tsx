import { Button } from '@/components/ui/button';
import { ApiResponse, PageProps } from '@/types/response';
import { ZoneProps } from '@/types/zone';
import { apiRequest } from '@/utils/api';
import { InfoCircle, LocationTick } from 'iconsax-reactjs';
import Link from 'next/link';
import React from 'react';
import { SmartImage } from '../fallback/smart-image';
import { getMuseumId } from '@/utils/session';
import { EmptyData } from '../fallback/empty-data';

type ZoneCardProps = {
    items: ZoneProps[];
};

export const ZoneMusuem: React.FC<PageProps> = async ({ searchParams }) => {
    const resolvedSearchParams = await searchParams;
    const search = resolvedSearchParams?.search || "";
    const category = resolvedSearchParams?.category || "";

    const museumId = await getMuseumId();
    const response = await apiRequest<ApiResponse<ZoneCardProps>>(`/zones/filter?museumId=${museumId}&search=${search}&categoryId=${category}&page=1&size=100`);
    const zones = response?.payload?.items || [];

    return (
        <>
            {zones && zones.length > 0 && <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {zones.map((item) => (
                    <div
                        key={item.zoneId}
                        className="bg-white rounded-[10px] max-w-96 w-full shrink-0 shadow-sm overflow-hidden "
                    >
                        {/* Image Container */}
                        <div className="relative h-48">
                            <SmartImage
                                src={item.pictureLink || ""}
                                fallbackSrc="/images/placeholder.svg"
                                alt={item.zoneName || ""}
                                width={300}
                                height={200}
                                className="w-full h-full object-cover !bg-grey-50"
                            />

                            {/* Category Badge */}
                            <div className="absolute top-3 right-3">
                                <span className="bg-primary-700 text-white px-3 py-1 rounded-[4px] text-p4">
                                    {item?.zoneCategoryName || "N/A"}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="text-s1 ] text-grey-900 mb-3 leading-tight ">
                                {item?.zoneName || ""}
                            </h3>

                            {item.description && (
                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {item.description}
                                </p>
                            )}
                            <div className="flex justify-end">
                                <Link href={`/museum-owner/zone/${item.zoneId}`}>
                                    <Button size={"sm"} className='text-p4 text-white font-normal'>
                                        <InfoCircle size={20} />
                                        Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            }

            {(!zones || zones.length === 0) && (
                <EmptyData
                    title="No zones found"
                    description="Try adjusting your search criteria or filters."
                    icon={<LocationTick size={40} className="[&>*]:stroke-grey-800" />}
                />
            )}
        </>
    );
};
