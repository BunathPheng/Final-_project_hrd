import { Suspense } from "react";
import { apiRequest } from "@/utils/api";
import HeroSlide from "./_components/slide-hero";
import EventSection from "./_components/event-section";
import { EventSkeleton } from "./_components/event-skeleton";
import { ApiResponse, PageProps, PaginationProps } from "@/types/response";

// Utility function to normalize searchParams value to string
const getStringParam = (param: string | string[] | undefined): string => {
    if (Array.isArray(param)) {
        return param[0] || ""; // Take the first value if it's an array, or empty string
    }
    return param || ""; // Return the string or empty string if undefined
};

export type EventPros = {
    eventId: string;
    title: string;
    subTitle: string;
    content: string;
    startDate: string;
    endDate: string;
    imageLinks: { images: string[] };
    museum: {
        museumId: string;
        name: string;
    };
};

type EventComponentProps = {
    items: EventPros[];
    pagination: PaginationProps;
};

async function EventDataLoader({
                                   ongoingPage,
                                   upcomingPage,
                                   ongoingDate,
                                   upcomingDate,
                               }: {
    ongoingPage: string;
    upcomingPage: string;
    ongoingDate: string;
    upcomingDate: string;
}) {
    const responseOngoingEvents = await apiRequest<ApiResponse<EventComponentProps>>(
        `/events/filter?page=${ongoingPage || "1"}&size=10&date-filter=${ongoingDate}&event-status=ONGOING`
    );
    const responseUpcomingEvents = await apiRequest<ApiResponse<EventComponentProps>>(
        `/events/filter?page=${upcomingPage || "1"}&size=10&date-filter=${upcomingDate}&event-status=UPCOMING`
    );

    const responseAvailableEvents = await apiRequest<ApiResponse<EventComponentProps>>(
        `/events/filter?page=1&size=3&event-status=AVAILABLE`
    );

    const ongoingEvents = responseOngoingEvents?.payload?.items || [];
    const ongoingPaging = responseOngoingEvents?.payload?.pagination;
    const upcomingEvents = responseUpcomingEvents?.payload?.items || [];
    const upcomingPaging = responseUpcomingEvents?.payload?.pagination;
    const availableEvents = responseAvailableEvents?.payload?.items || [];

    const suspenseKey = `${ongoingPage}-${upcomingPage}-${ongoingDate}-${upcomingDate}`;

    return (
        <>
            <HeroSlide events={availableEvents} />
            <div className="pd-screen container grid mt-12 gap-12">
                <EventSection
                    title="Events"
                    highlight="Ongoing"
                    filterKey="ongoing_date"
                    suspenseKey={suspenseKey}
                    events={ongoingEvents}
                    paging={ongoingPaging}
                    mode="ongoing"
                />
                <EventSection
                    title="Events"
                    highlight="Coming soon"
                    filterKey="upcoming_date"
                    suspenseKey={suspenseKey}
                    events={upcomingEvents}
                    paging={upcomingPaging}
                    mode="upcoming"
                />
            </div>
        </>
    );
}

export default async function EventPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams; // Resolve the Promise
    const ongoingPage = getStringParam(resolvedSearchParams?.ongoing_page);
    const upcomingPage = getStringParam(resolvedSearchParams?.upcoming_page);
    const ongoingDate = getStringParam(resolvedSearchParams?.ongoing_date);
    const upcomingDate = getStringParam(resolvedSearchParams?.upcoming_date);

    return (
        <div className="grid w-full">
            <Suspense fallback={<EventSkeleton />}>
                <EventDataLoader
                    ongoingPage={ongoingPage}
                    upcomingPage={upcomingPage}
                    ongoingDate={ongoingDate}
                    upcomingDate={upcomingDate}
                />
            </Suspense>
        </div>
    );
}
