"use server";

import { ApiResponse } from "@/types/response";
import { apiRequest } from "@/utils/api";
import { ParamValue } from "next/dist/server/request/params";

type ReviewProps = {
    reviewId?: string;
    museumId?: ParamValue;
    rating: number;
    comment: string;
};

export const reviewMuseum = async ({
    museumId,
    rating,
    comment,
}: ReviewProps) => {
    const response = await apiRequest<ApiResponse<null>>(
        `/reviews/${museumId}`,
        {
            method: "POST",
            body: { rating: rating, comment: comment },
        }
    );

    return response;
};

export const updateReview = async ({
    reviewId,
    rating,
    comment,
}: ReviewProps) => {
    const response = await apiRequest<ApiResponse<null>>(
        `/reviews/${reviewId}`,
        {
            method: "PUT",
            body: { rating: rating, comment: comment },
        }
    );

    return response;
};
