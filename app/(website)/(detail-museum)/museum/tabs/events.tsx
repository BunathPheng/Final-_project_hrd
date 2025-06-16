import Events from "@/components/feature/card/event";
import HeadingTitle from "@/components/feature/label/heading-title";
import Pagination from "@/components/feature/lib/pagination";
import { SearchData } from "../_components/search-data";
import { apiRequest } from "@/utils/api";
import { ApiResponse, PageProps, PaginationProps } from "@/types/response";
import { EventProps } from "@/types/events";

type EventsComponentProps = {
    items: EventProps[],
    pagination: PaginationProps
}

type EventsParamProps = PageProps & {
    museumId: string;
};

export const EventsTab: React.FC<EventsParamProps> = async ({ searchParams, museumId }) => {
    const resolveSearchParams = await searchParams;
    const page = resolveSearchParams?.page || '1';
    const search = resolveSearchParams?.search || '';
    // const suspenseKey = `${page}-${search}`;

    const response = await apiRequest<ApiResponse<EventsComponentProps>>(`/events/museum/${museumId}/filter?event-status=ALL&page=${page}&size=10&search=${search}`);
    const events = response?.payload?.items || [];
    const paging = response?.payload?.pagination;

    return (
        <div className="grid w-full mt-10 gap-12">
            {/* Search Seaction */}
            <header className="flex w-full justify-between gap-5">
                <HeadingTitle title="View Events" />
                <SearchData />
            </header>

            {/* Events List */}
            <section className="grid w-full">
                <Events items={events} />
            </section>

            {/* Pagination */}
            <div className="grid justify-center">
                <Pagination paging={paging} scroll={false} />
            </div>
        </div>
    );
}
