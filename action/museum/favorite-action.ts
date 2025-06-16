"use server";

import { ApiResponse } from "@/types/response";
import { apiRequest } from "@/utils/api";
import { revalidatePath } from "next/cache";
// import { toast } from "sonner";

type FavoriteProps = {
    museumId: number | string;
    status: "UNFAVORITE" | "FAVORITE";
    visitorId?: string | null;
};

export const updateFavorite = async ({
    museumId,
    status,
    visitorId,
}: FavoriteProps) => {
    if (!visitorId) {
        // toast.error("Please login first.");
        return;
    }

    const response = await apiRequest<ApiResponse<null>>(
        `/favorites/${museumId}?favoriteType=${status}`,
        {
            method: "POST",
        }
    );
     revalidatePath("/profile/favorite-museum");

    return response;
};
