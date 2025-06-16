"use client"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SearchNormal } from "iconsax-reactjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

export const Searching: FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentSearch = searchParams.get("search") || "";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Fix: Cast e.target to HTMLFormElement, not FormData
        const formData = new FormData(e.target as HTMLFormElement);

        // Get the search value from form data
        const searchValue = formData.get("search") as string || "";

        const params = new URLSearchParams(searchParams.toString());

        if (searchValue === "") {
            params.delete("search"); // Remove search param if empty
        } else {
            params.set("search", searchValue);
        }

        // Reset to page 1 when search changes
        params.delete("page");

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="w-full grid gap-2">
            <Label htmlFor="title">
                Search for
            </Label>
            <div className="bg-grey-50 w-full relative rounded-sm h-12 flex items-center px-1">
                <input
                    defaultValue={currentSearch}
                    type="text"
                    name="search"
                    className="outline-none px-3 w-full placeholder:text-grey-400"
                    placeholder="Search by title..."
                />
                <Button size={"icon"}>
                    <SearchNormal size={18} />
                </Button>
            </div>
        </form>
    );
}
