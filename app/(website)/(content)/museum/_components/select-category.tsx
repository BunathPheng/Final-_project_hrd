"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CategoryProps = {
    museumCategoryId: string;
    name: string;
}
export const SelectCategory: React.FC<{ items: CategoryProps[] }> = ({ items }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category") || "all";

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "all")
            params.delete("category"); // Remove category param for "all"
        else
            params.set("category", value);

        // Reset to page 1 when category changes
        params.delete("page");

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <>
            <Select name="category" value={currentCategory} onValueChange={(value) => handleChange(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="All catetories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All catetories</SelectItem>
                    {items && items.map(item => (
                        <SelectItem key={item.museumCategoryId} value={item.museumCategoryId}>{item.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}
