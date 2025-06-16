"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

export const SortMuseum: FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const sortValue = searchParams.get("sort") || "latest";

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "latest")
            params.delete("sort");
        else
            params.set("sort", value);

        // Reset to page 1 when category changes
        params.delete("page");

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <>
            <div className="flex items-center gap-5">
                <label htmlFor="sortby" className="text-p1">Sort by:</label>
                <Select name="sortby" value={sortValue} onValueChange={(value) => handleChange(value)}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Latest" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="popular">Popular</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}
