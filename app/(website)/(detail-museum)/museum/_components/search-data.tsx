"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchNormal } from "iconsax-reactjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, FormEvent } from "react";

export const SearchData: FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const tab = searchParams.get("tab") || "";
    const zoneId = searchParams.get("zone-id") || "";

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const search = formData.get("search") as string;

        // Navigate with updated query
        router.push(`${pathname}?tab=${tab}${zoneId ? "&zone-id=" + zoneId : ""}&search=${encodeURIComponent(search)}`, { scroll: false });
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-80">
            <Input type="text" name="search" placeholder="Search by title..." />
            <div className="absolute top-0 right-0">
                <Button type="submit">
                    <SearchNormal size={21} />
                </Button>
            </div>
        </form>
    );
};
