"use client";

import {FC} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";

type tabbarItem = {
    name: string;
    href: string;
    tab: string;
};

export const GuideTabbar: FC = () => {
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('status') || "all";

    const tabbarItems: tabbarItem[] = [
        { name: "All Guides", href: "/museum-owner/guides", tab: "all"},
        { name: "Available", href: "/museum-owner/guides?status=available", tab: "available"},
        { name: "Unavailable", href: "/museum-owner/guides?status=unavailable", tab: "unavailable"},
    ];

    return (
        <nav className="border-b border-grey-100 w-full flex gap-8">
            { tabbarItems.map((item) => {
                const isActive: boolean = item.name == "All Guides" ? item.tab == currentTab : item.tab.startsWith(currentTab);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`transition-colors text-s2 px-3 py-5 border-b-3 hover:border-primary-700 hover:text-primary-700
                            ${isActive ? "text-primary-700 border-primary-700"
                             : "text-grey-900 border-transparent"
                             }`}
                    >
                        {item.name}
                    </Link>
                )
            })}
        </nav>
    )
}
