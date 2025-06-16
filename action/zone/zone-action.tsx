"use server";

import { UpdateZoneProps } from "@/types/zone";
// import { ApiResponse } from "@/types/response";
// import { apiRequest } from "@/utils/api";


export const updateZoneInformation = async (zoneId: string, data: UpdateZoneProps) => {
    console.log(zoneId, data);

    // const response = await apiRequest<ApiResponse<null>>(
    //     `/reviews/${reviewId}`,
    //     {
    //         method: "PUT",
    //         body: { rating: rating, comment: comment },
    //     }
    // );

    // return response;
};
