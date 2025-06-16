export type EventProps = {
    eventId: string;
    title: string;
    subTitle: string;
    content: string;
    startDate: string;
    endDate: string;
    imageLinks: { images: string[] };
};

export type CreateEventProps = {
    title: string;
    subTitle: string;
    startDate: string;
    endDate: string;
    content: string;
    curator?: string | undefined;
    accessibilityNote?: string | undefined;
};
