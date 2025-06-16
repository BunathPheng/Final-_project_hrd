"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

export const SortTypeChatBooking:FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const sortValue = searchParams.get("booking") || "THIS_YEAR";

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "THIS_YEAR") {
            // Set empty string for API
            params.set("booking", "");
        } else {
            params.set("booking", value);
        }
        // Reset to page 1 when category changes
        params.delete("page");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <>
            <Select name="booking" value={sortValue} onValueChange={(value) => handleChange(value)}>
                <SelectTrigger id="booking" className="w-full !h-10">
                    <SelectValue placeholder="This Year" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="THIS_YEAR">This Year</SelectItem>
                    <SelectItem value="LAST_YEAR">Last Year</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}