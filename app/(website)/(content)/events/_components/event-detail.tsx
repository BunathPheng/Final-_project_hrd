import { EventPhoto } from "./event-photo";
import { ArrowRight, Calendar, InfoCircle, Location, TickCircle } from "iconsax-reactjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {apiRequest} from "@/utils/api";
import {ApiResponse} from "@/types/response";
import {formatDate} from "@/utils/format";

type EventPros = {
    eventId: string;
    title: string;
    subTitle: string;
    content: string;
    startDate: string;
    endDate: string;
    imageLinks: { images: string[] };
    curator: string;
    accessibilityNote: string;
    museum: {
        museumId: string;
        name: string;
    };
};

export const EventDetail: React.FC<{ eventId: string }> = async ({ eventId }) => {
    console.log("Event Id: ",eventId);

    const responseEvent = await apiRequest<ApiResponse<EventPros>>(
        `/events/${eventId}`);
    const event = responseEvent?.payload;

    const formattedStartDate = formatDate(event?.startDate ?? ''); // e.g., "10 August 2025"
    const [startDay, ...startRest] = formattedStartDate.split(" ");

    const formattedEndDate = formatDate(event?.endDate ?? ''); // e.g., "15 August 2025"
    const [endDay, ...endRest] = formattedEndDate.split(" ");


    return (
        <section className="col-span-2 grid gap-10">
            <div className="grid gap-5">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                    <h3 className="text-h3 text-grey-900">{event?.title}</h3>
                    <p className="text-p3 text-grey-800">Managed by <span className="text-p4 text-primary-700">{event?.curator}</span></p>
                </div>

                {/* Event Photo */}
                <EventPhoto images={event?.imageLinks?.images} />
            </div>

            {/* Content Detail */}
            <article className="grid gap-5 w-full">
                <h5 className="text-h5 text-grey-900">{event?.subTitle}</h5>
                <p className="text-p1 text-grey-800">{event?.content}</p>
            </article>

            {/* Date and Location */}
            <section className="py-6 px-10 bg-white shadow-600 rounded-sm border-l-8 border-primary-700">
                <div className="grid grid-cols-3 gap-5 pb-6 border-b border-grey-200">
                    <dl className="grid gap-1">
                        <dt className="flex items-center gap-2.5">
                            <Calendar size={18} className="[&>*]:stroke-grey-800" />
                            <p className="text-p1 text-grey-800">START DATE</p>
                        </dt>
                        <dd className="text-s1">
                            <span className="text-primary-700">{startDay}</span>
                            <span className="text-grey-900"> {startRest.join(" ")}</span>
                        </dd>
                    </dl>
                    <dl className="grid gap-1 border-l border-grey-200 pl-5">
                        <dt className="flex items-center gap-2.5">
                            <Calendar size={18} className="[&>*]:stroke-grey-800" />
                            <p className="text-p1 text-grey-800">END DATE</p>
                        </dt>
                        <dd className="text-s1">
                            <span className="text-primary-700">{endDay}</span>
                            <span className="text-grey-900"> {endRest.join(" ")}</span>
                        </dd>
                    </dl>
                    <dl className="grid gap-1 border-l border-grey-200 pl-5">
                        <dt className="flex items-center gap-2.5">
                            <Location size={18} className="[&>*]:stroke-grey-800" />
                            <p className="text-p1 text-grey-800">LOCATION</p>
                        </dt>
                        <dd className="text-s1">
                            <span className="text-primary-700">{event?.museum?.name}</span>
                        </dd>
                    </dl>
                </div>
                <div className="pt-6 flex justify-between gap-5">
                    <div className="px-2.5 py-1 h-fit bg-light-green rounded-full flex items-center gap-1">
                        <TickCircle size={16} className="[&>*]:stroke-green" />
                        <p className="text-p4 text-green">Registration Open</p>
                    </div>
                    <Link href={`/museum/${event?.museum?.museumId}`}>
                        <Button size={"md"}>
                            Visit us
                            <ArrowRight size={24} />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Accessibility Note */}
            <article className="grid gap-5 w-full">
                <div className="flex items-center gap-3">
                    <InfoCircle size={24} className="[&>*]:stroke-primary-700" />
                    <h5 className="text-h5 text-grey-900">Accessibility Note</h5>
                </div>
                <p className="text-p1 text-grey-800">{event?.accessibilityNote}</p>
            </article>
        </section>
    );

}
