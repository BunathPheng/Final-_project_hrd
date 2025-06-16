import BookingHistory from "@/components/feature/card/booking-history";
import { EmptyData } from "@/components/feature/fallback/empty-data";
import Pagination from "@/components/feature/lib/pagination";

import { ApiResponse, PageProps } from "@/types/response";
import { apiRequest } from "@/utils/api";
import { BookingResponseProps } from "../page";


type BookingHistoryProps = {
    bookingId: string;
    museumName:string;
    bookingType:string;
    totalPrice:string | 0;
    ticketStatus:string;
    banner:string | "";
    description:string | "";
}
export default async function BookingHistoryContainer({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const page = resolvedSearchParams?.page || '1';
    const sort  = resolvedSearchParams?.sort || "";
    const search = resolvedSearchParams?.search || "";
    const response = await apiRequest<ApiResponse<BookingResponseProps>>(`/bookings/filter?search=${search}&bookingType=${sort}&page=${page}&size=10`);
    // ... build query params
    console.log("response" ,response)

    const bookingHistory: BookingHistoryProps[] = response?.payload?.items ?? [];
    const paging = response?.payload?.pagination;

    if (bookingHistory.length === 0) {
        return (
            <div className="text-center py-8">
                <EmptyData description="No booking history found" />
            </div>
        );
    }

    return (
        <>
            <BookingHistory items={bookingHistory} />
            <div className="grid mt-10 justify-center">
                {bookingHistory.length > 0 ? (
                    <Pagination paging={paging} scroll={false} />
                ) : bookingHistory.length === 0 ? (
                    <div className="text-center py-8">
                        <EmptyData description='Not found Favorite Museum' />
                    </div>
                ) : null}
            </div>
        </>
    );
}