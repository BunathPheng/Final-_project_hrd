import { DatePickerWithRange } from '@/components/ui/date-range-picker';

import BookingHistoryContainer from './_components/booking-history-container';
import { Suspense } from 'react';
import BookingHistoryLoading from '@/components/feature/card/booking-history-loading';
import {  PageProps, PaginationProps } from '@/types/response';
import { Searching } from '@/app/(website)/(content)/museum/_components/searching';
import { SortTypeBooking } from './_components/sort-type-booking';


type BookingHistoryProps = {
     bookingId: string;
    museumName:string;
    bookingType:string;
    totalPrice:string | 0;
    ticketStatus:string;
    banner:string | "";
    description:string | "";

}

export type BookingResponseProps = {
    items: BookingHistoryProps[];
    pagination: PaginationProps;
}


export default async function BookingHistorydPage({ searchParams }: PageProps) {
       const resolvedSearchParams = await searchParams;
        const suspenseKey = `${resolvedSearchParams?.sort || 'all'}-${resolvedSearchParams?.page || '1'}-${resolvedSearchParams?.search || ''}`;
    return (
        <>
            <h1 className="text-s1 text-grey-900 border-b-1 border-b-grey-100 pb-5 mb-6">Booking History</h1>
            {/* Section date range picker */}
            <div className="flex justify-end mb-6">
                <DatePickerWithRange className='max-w-90 w-full ' />
            </div>
            {/* Section search and filter */}
            <div className="flex items-center justify-between lg:flex-row gap-5 mb-6">
                {/* <div className="relative w-full max-w-90"> */}
                    <Searching/>
                {/* </div> */}
                <div className="w-full max-w-90">
                    <SortTypeBooking/>
                </div>
            </div>
            <Suspense key={suspenseKey} name="BookingHistory" fallback={<BookingHistoryLoading />}>
                <BookingHistoryContainer searchParams={searchParams} />
            </Suspense>
        </>
    )
}
