import Pagination from "@/components/feature/lib/pagination";
import { EventProps } from "@/types/events";
import { ApiResponse, PageProps, PaginationProps } from "@/types/response";
import { apiRequest } from "@/utils/api";
import { EventsItem } from "./events-item";
import { getMuseumId } from "@/utils/session";
import { Showing } from "@/components/feature/lib/showing";

type EventsComponentProps = {
    items: EventProps[],
    pagination: PaginationProps
}

export const GroupEvents: React.FC<PageProps> = async ({ searchParams }) => {
    const resolveSearchParams = await searchParams;
    const page = resolveSearchParams?.page || '1';
    const search = resolveSearchParams?.search || '';
    const show = resolveSearchParams?.show || '10';

    const museumId = await getMuseumId();

    const response = await apiRequest<ApiResponse<EventsComponentProps>>(`/events/museum/${museumId}/filter?event-status=ALL&page=${page}&size=${show}&search=${search}`);
    const events = response?.payload?.items || [];
    const paging = response?.payload?.pagination;

    return (
        <>
            <section className="grid gap-7 w-full">
                <EventsItem items={events} />
                <div className="flex items-center justify-between">
                    <div className="flex w-full justify-between items-center gap-5">
                        <Pagination paging={paging} />
                        <Showing />
                    </div>
                </div>
            </section>
        </>
    );
}
