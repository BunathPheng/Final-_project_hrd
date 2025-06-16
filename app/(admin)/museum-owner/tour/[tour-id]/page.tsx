import Innercard from '@/components/feature/card/inner-card';
import Maincard from '@/components/feature/card/main-card';
import { Breadcrumb } from '@/components/layout/breadcrumb'
import React from 'react'
import { TourInfo } from '../_components/tour-info';
import { VisitorInfo } from '../_components/visitor-info';
import { BookingInfo } from '../_components/booking-info';
import { GuideTable } from '../_components/guide-table';

export default async function TourDetailPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const currentStatus = (params.status as string) || "all";

    const breadcrumbs = ["Home", "Tour", "Detail"];

    return (
        <>
            <Breadcrumb main="Tour Management" items={breadcrumbs} />
            <Maincard>
                <Innercard className="gap-5">
                    <h6 className="text-s1 text-grey-900">Information</h6>
                    <TourInfo status={currentStatus} />
                    <VisitorInfo status={currentStatus} />
                    <BookingInfo status={currentStatus} />
                </Innercard>
                {currentStatus != "request" &&
                    <Innercard>
                        <GuideTable />
                    </Innercard>
                }
            </Maincard>
        </>
    )
}
