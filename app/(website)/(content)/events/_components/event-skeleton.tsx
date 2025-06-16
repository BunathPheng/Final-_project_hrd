import React, { FC } from 'react';
import HeroSlideSkeleton from "@/app/(website)/(content)/events/_components/hero-slide-skeleton";
import {EventSectionSkeleton} from "@/app/(website)/(content)/events/_components/event-section-skeleton";

export const EventSkeleton: FC = () => {
    return (
        <>
            <section>
                <HeroSlideSkeleton />
                <div className="pd-screen container grid mt-12 gap-12">

                    {/* Fetched Ongoing Events */}
                    <EventSectionSkeleton />

                    {/* Fetched Upcoming Events */}
                    <EventSectionSkeleton />

                </div>
            </section>
        </>
    );
}
