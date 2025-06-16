"use client";

import { SearchNormal } from "iconsax-reactjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC, FormEvent } from "react";

export const SearchTable: FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = new URLSearchParams(searchParams.toString());
    const search = params.get("search") || "";

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const searchTable = formData.get("search-table") as string;

        const newParams = new URLSearchParams(params.toString());
        newParams.set("search", searchTable);
        newParams.delete("page");

        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="relative border border-grey-400 rounded-sm h-12 flex items-center px-3">
                <SearchNormal size={18} className="[&>*]:stroke-grey-400" />
                <input
                    type="text"
                    name="search-table"
                    defaultValue={search}
                    className="outline-none px-3 w-60 placeholder:text-grey-400"
                    placeholder="Search"
                />
                <button type="submit" className="sr-only"></button>
            </div>
        </form>
    );
};
