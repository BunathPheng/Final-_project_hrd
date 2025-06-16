"use client";

import Events from "@/components/feature/card/event";
import { EventProps } from "@/types/events";

export const EventsItem: React.FC<{ items: EventProps[] }> = ({ items }) => {
    const handleDeleteEvent = (id: number | string) => {
        console.log(id);
    };

    return (
        <>
            <Events
                items={items}
                isMuseumOwner={true}
                onDelete={handleDeleteEvent}
            />
        </>
    );
}
