"use client"

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";

export const Showing: FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentShowing = searchParams.get("show") || "10";

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        // Reset to page 1 when show changes
        params.set("page", "1");
        params.set("show", value);

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <div className="flex gap-3">
            <Label>Show:</Label>
            <Select name="show" value={currentShowing} onValueChange={(value) => handleChange(value)}>
                <SelectTrigger className="w-34 !h-10">
                    <SelectValue placeholder="10 rows" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10 rows</SelectItem>
                    <SelectItem value="25">25 rows</SelectItem>
                    <SelectItem value="50">50 rows</SelectItem>
                    <SelectItem value="100">100 rows</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};
