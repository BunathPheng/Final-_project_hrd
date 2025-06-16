import { AnimatedSection } from "@/components/feature/animation/animation-section";
import MuseumEventCarousel from "@/components/feature/slider/museum-event";
import { ApiResponse } from "@/types/response";
import { apiRequest } from "@/utils/api";
import { CalendarAdd } from "iconsax-reactjs";
import { FC } from "react";

type MuseumEventsProps = {
    eventId: string;
    museum: {
        name: string;
        address: string;
    };
    title: string;
    subTitle: string;
    content: string;
    startDate: string;
    endDate: string;
    imageLinks?: { images: Array<string> };
}

export const MuseumEventGroup: FC = async () => {
    const response = await apiRequest<ApiResponse<{ items: MuseumEventsProps[] }>>(`/events/filter?page=1&size=5&event-status=ONGOING`);
    const events = response?.payload?.items || [];

    return (
        <>
            {events && events.length > 0 &&
                <AnimatedSection className="grid" animation="fade-up" duration={1000}>
                    <MuseumEventCarousel events={events} />
                </AnimatedSection>
            }
            {!events || events.length == 0 &&
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-24 h-24 bg-grey-50 rounded-full flex items-center justify-center mb-4">
                        <CalendarAdd size={40} className="[&>*]:stroke-grey-800" />
                    </div>
                    <h3 className="text-h6 font-medium text-grey-800 mb-2">No events found</h3>
                </div>
            }
        </>
    );
}
