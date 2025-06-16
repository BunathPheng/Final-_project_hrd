import { ApiResponse } from "@/types/response";
import { apiRequest } from "@/utils/api";
import { JSX } from "react";
import { SelectCategoryZone } from "./select-category-zone";
import { ZoneCategoryProps } from "@/types/zone";

export const CategoryZone = async (): Promise<JSX.Element> => {
    const response = await apiRequest<ApiResponse<ZoneCategoryProps[]>>("/zones/zone-category");
    const category = response?.payload || [];
    return (
        <>
            <SelectCategoryZone items={category} />
        </>
    );
}
