import Innercard from "@/components/feature/card/inner-card";
import Maincard from "@/components/feature/card/main-card";
import { SearchTable } from "@/components/feature/input/search-table";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "iconsax-reactjs";
import { Plus } from "lucide-react";
import React, { JSX, Suspense } from "react";
import Link from "next/link";
import { GroupEvents } from "./_components/group-events";
import { PageProps } from "@/types/response";
import { EventSkeleton } from "./_components/event-skeleton";

export default async function EventsPage({ searchParams }: PageProps): Promise<JSX.Element> {
    const breadcrumbs = ["Home", "Events"];

    const resolveSearchParams = await searchParams;
    const page = resolveSearchParams?.page || '1';
    const search = resolveSearchParams?.search || '';
    const show = resolveSearchParams?.show || '10';
    const suspenseKey = `${page}-${search}-${show}`;

    return (
        <>
            <Breadcrumb main="Musuem Management" items={breadcrumbs} />
            <Maincard>
                <Innercard>
                    <div className="flex items-center justify-between w-full gap-5">
                        <div className="flex gap-2 items-center">
                            <Calendar
                                size={24}
                                className="[&>*]:stroke-primary-700"
                            />
                            <h4 className="text-s1 text-grey-900">Events</h4>
                        </div>
                        <div className="flex gap-6 items-center">
                            <SearchTable />
                            <Link href="/museum-owner/events/create">
                                <Button>
                                    <Plus size={24} />
                                    New Event
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full grid mt-12 gap-12">
                        <Suspense key={suspenseKey} fallback={<EventSkeleton />}>
                            <GroupEvents searchParams={searchParams} />
                        </Suspense>
                    </div>
                </Innercard>
            </Maincard>
        </>
    );
}
