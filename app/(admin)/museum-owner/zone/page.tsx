import Innercard from '@/components/feature/card/inner-card';
import Maincard from '@/components/feature/card/main-card';
import { ZoneMusuem } from '@/components/feature/card/zone-museum';
import { CategoryZone } from '@/components/feature/dropdown/category-zone';
import { SearchTable } from '@/components/feature/input/search-table';
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Button } from '@/components/ui/button';
import { PageProps } from '@/types/response';
import { LocationTick } from 'iconsax-reactjs';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React, { JSX, Suspense } from 'react'
import { ZoneSkeleton } from './_components/zone-skeleton';

export default async function ZonePage({ searchParams }: PageProps): Promise<JSX.Element> {
    const breadcrumbs = ["Home", "Zone"];
    const param = await searchParams;
    const suspenseKey = `${param?.category || ''}-${param?.page || '1'}-${param?.search || ''}`;

    return (
        <>
            <Breadcrumb main="Musuem Management" items={breadcrumbs} />
            <Maincard>
                <Innercard>
                    <div className="flex items-center justify-between w-full gap-5">
                        <div className="flex gap-2 items-center">
                            <LocationTick
                                size={24}
                                className="[&>*]:stroke-primary-700"
                            />
                            <h4 className="text-s1 text-grey-900">Zones</h4>
                        </div>
                        <Link href="/museum-owner/zone/create">
                            <Button size={"md"} className='font-bold'>
                                <Plus size={24} />
                                New Zone
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center justify-between w-full gap-5 mt-8">
                        <div className="w-64">
                            <CategoryZone />
                        </div>
                        <SearchTable />
                    </div>
                    <div className="mt-8 grid w-full">
                        <Suspense key={suspenseKey} fallback={<ZoneSkeleton />}>
                            <ZoneMusuem searchParams={searchParams} />
                        </Suspense>
                    </div>
                </Innercard>
            </Maincard>
        </>
    )
}
