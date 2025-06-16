import Innercard from '@/components/feature/card/inner-card';
import Maincard from '@/components/feature/card/main-card';
import { SearchTable } from '@/components/feature/input/search-table';
import { Breadcrumb } from '@/components/layout/breadcrumb'
import React from 'react'
import Pagination from '@/components/feature/lib/pagination';
import { Showing } from '@/components/feature/lib/showing';
import { TourTabbar } from './_components/tour-tabbar';
import { UserTag } from 'iconsax-reactjs';
import { TourTable } from './_components/tour-table';
import { PageProps } from '@/types/response';

export default async function TourPage({
    searchParams,
}: PageProps) {
    const params = await searchParams;
    const currentTab = (params?.tab as string) || "all";

    const breadcrumbs = ["Home", "Tour"];

    return (
        <>
            <Breadcrumb main="Tour Management" items={breadcrumbs} />
            <Maincard>
                <Innercard>
                    <TourTabbar />
                    <div className="flex items-center justify-between w-full gap-5 mt-7">
                        <div className="flex gap-2 items-center">
                            <UserTag size={24} className="[&>*]:stroke-primary-700" />
                            <h4 className="text-s1 text-grey-900">Tour</h4>
                        </div>
                        <SearchTable />
                    </div>
                    {/* Tour Lists */}
                    <TourTable tab={currentTab} />
                    <div className="flex w-full justify-between items-center gap-5 border-t border-grey-100 pt-5">
                        <Pagination />
                        <Showing />
                    </div>
                </Innercard>
            </Maincard>
        </>
    )
}
