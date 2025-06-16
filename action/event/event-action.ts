"use server";

import { CreateEventProps } from "@/types/events";
import { ApiResponse } from "@/types/response";
import { apiRequest } from "@/utils/api";

type CreateEventComponentProps = {
    data: CreateEventProps;
    imageLinks: { images: (string | undefined)[] };
};

export const createEvent = async ({
    data,
    imageLinks,
}: CreateEventComponentProps) => {
    const response = await apiRequest<ApiResponse<null>>(`/events`, {
        method: "POST",
        body: {
            title: data?.title || "",
            subTitle: data?.subTitle || "",
            content: data?.content || "",
            startDate: new Date(data?.startDate) || "",
            endDate: new Date(data?.endDate) || "",
            curator: data?.curator || "",
            accessibilityNote: data?.accessibilityNote || "",
            imageLinks: imageLinks,
        },
    });

    return response;
};
