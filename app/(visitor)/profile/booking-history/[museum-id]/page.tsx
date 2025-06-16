import { ApiResponse, PageProps } from "@/types/response";
import { DetailsBooking } from "../../_components/detail-museum";
import { apiRequest } from "@/utils/api";
import { BookingHistoryDetailsProps } from "@/types/booking";

export default async function BookingHistoryDetailPage({ params }: PageProps) {
    const param = await params;
    console.log("params:", param);
    
    try {
        const response = await apiRequest<ApiResponse<BookingHistoryDetailsProps>>(`/bookings/${param?.["museum-id"]}`);
        console.log(response?.payload)
        
        // Pass the booking data to the component
        return (
            <>
                <DetailsBooking bookingData={response?.payload} />
            </>
        );
    } catch (error) {
        console.error("Error fetching booking details:", error);
        return (
            <div>
                <h1>Error loading booking details</h1>
                <p>Please try again later.</p>
            </div>
        );
    }
}