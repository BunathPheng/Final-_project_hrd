"use client";

import { useRouter, useSearchParams } from "next/navigation";
import HeadingTitle from "@/components/feature/label/heading-title";
import { DatePicker } from "@/components/ui/date-picker";
import Pagination from "@/components/feature/lib/pagination";
import Events from "@/components/feature/card/event";
import { EventPros } from "@/app/(website)/(content)/events/page";
import { PaginationMode, PaginationProps } from "@/types/response";
import { ShowAmount } from "@/components/feature/lib/show-amount";
import { Suspense } from "react";
import EventCollectionSkeleton from "@/app/(website)/(content)/events/_components/event-collection-skeleton";

type Props = {
    title: string;
    highlight: string;
    filterKey: "ongoing_date" | "upcoming_date";
    dateValue?: string;
    suspenseKey?: string;
    events: EventPros[];
    paging?: PaginationProps;
    mode?: PaginationMode;
};

export default function EventSection({
    title,
    highlight,
    filterKey,
    dateValue,
    suspenseKey,
    events,
    paging,
    mode
}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleDateChange = (date: Date | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (date) {
            params.set(filterKey, date.toISOString().split("T")[0]);
        } else {
            params.delete(filterKey);
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <>
            <section className="grid gap-7 w-full">
                <HeadingTitle
                    title={title}
                    highlight={highlight}
                    className="text-center"
                    first={false}
                />
                <div className="flex items-center justify-between">
                    <h6 className="text-s2 text-grey-900">Filter Date</h6>
                    <DatePicker
                        className="w-sm"
                        value={dateValue ? dateValue : undefined}
                        onChange={handleDateChange}
                    />
                </div>

                <Suspense key={suspenseKey} name="EventCollection" fallback={<EventCollectionSkeleton />}>
                    <Events items={events} />
                </Suspense>

                <div className="flex items-center justify-between">
                    <ShowAmount paging={paging} />
                    <Pagination paging={paging} scroll={false} mode={mode} />
                </div>
            </section>

        </>
    );
};
