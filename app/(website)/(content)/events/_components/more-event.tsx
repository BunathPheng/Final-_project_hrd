import Link from "next/link";
import { MoreEventCard } from "./more-event-card";
import {apiRequest} from "@/utils/api";
import {ApiResponse, PaginationProps} from "@/types/response";

type EventPros = {
    eventId: string;
    title: string;
    subTitle: string;
    content: string;
    status: string;
    imageLinks: { images: string[] };
};

type EventComponentProps = {
    items: EventPros[];
    pagination: PaginationProps;
};

export const MoreEvent: React.FC<{ eventId: string }> = async ({ eventId }) => {
    console.log("Event ID: ", eventId);

    const responseLatestEvent = await apiRequest<ApiResponse<EventComponentProps>>(
        `/events/filter?page=1&size=4&event-status=LATEST`);
    const latestEvent = responseLatestEvent?.payload?.items;

    const responseEndingSoonEvent = await apiRequest<ApiResponse<EventComponentProps>>(
        `/events/filter?page=1&size=4&event-status=NEARLY_EXPIRED`
    );
    const endingSoonEvent = responseEndingSoonEvent?.payload?.items;

    return (
        <aside className="mt-7 grid w-full gap-12 content-start">
            {/* Popular Events */}
            {/*Ending Soon*/}
            <section className="grid gap-7">
                <div className="flex items-center justify-between gap-3 w-full">
                    <h6 className="text-s1 text-grey-900">Closing Soon</h6>
                    <Link href="/events" className="text-p1 underline text-primary-700 hover:text-primary-800">View all</Link>
                </div>
                <MoreEventCard items={endingSoonEvent ?? []} />
            </section>

            {/* Latest Events */}
            {/*New & Upcoming Events*/}
            <section className="grid gap-7">
                <div className="flex items-center justify-between gap-3 w-full">
                    <h6 className="text-s1 text-grey-900">What’s New</h6>
                    <Link href="/events" className="text-p1 underline text-primary-700 hover:text-primary-800">View all</Link>
                </div>
                <MoreEventCard items={latestEvent ?? []} />
            </section>
        </aside>
    );
}
