import { MuseumDetailProps } from "./museum";

export type TicketInfoProps = {
    ticketInfoId: string;
    museum: MuseumDetailProps;
    localPrice: number;
    foreignPrice: number;
    totalSlot: number;
    createdAt: string; // ISO date string
    updatedAt: string | null;
};
