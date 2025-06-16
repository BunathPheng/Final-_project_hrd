"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

export const SortTypeBooking: FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const sortValue = searchParams.get("sort") || "ALL";

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "ALL") {
            // Set empty string for API
            params.set("sort", "");
        } else {
            params.set("sort", value);
        }

        // Reset to page 1 when category changes
        params.delete("page");

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <>
            <div className="flex flex-col gap-3 max-w-full">
                <label htmlFor="sortby" className="text-p1 ">Sort by:</label>
                <Select name="sortby" value={sortValue} onValueChange={(value) => handleChange(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All categories</SelectItem>
                        <SelectItem value="TOUR">Tour</SelectItem>
                        <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}