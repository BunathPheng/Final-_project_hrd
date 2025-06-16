import { EventDetail } from "../_components/event-detail";
import { MoreEvent } from "../_components/more-event";
import { PageProps } from "@/types/response";

export default async function EventDetailPage({ params }: PageProps) {
    const param = await params;
    const eventId = param?.["event-id"] ?? "";

    return (
        <div className="container pd-screen mt-12 grid grid-cols-3 gap-10 content-start">
            {/* Detail Event */}
            <EventDetail eventId={eventId} />

            {/* Other Events */}
            <MoreEvent eventId={eventId} />
        </div>
    );
}
