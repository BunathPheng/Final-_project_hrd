"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react"

type tabbarItem = {
    name: string;
    href: string;
    tab: string;
};

export const VisitorTabbar: FC = () => {
    const searchParams = useSearchParams();
    const currentTab = searchParams.get("tab") || "total";

    const tabbarItems: tabbarItem[] = [
        { name: "Total Visitor", href: "/museum-owner/visitor", tab: "total" },
        { name: "Visitor Engagement", href: "/museum-owner/visitor?tab=engagement", tab: "engagement" },
    ];

    return (
        <nav className="border-b border-grey-100 w-full flex gap-8 mb-7">
            {tabbarItems.map((item) => {
                const isActive: boolean = item.name == "Total Visitor" ? item.tab == currentTab : item.tab.startsWith(currentTab);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`transition-colors text-s2 px-3 py-5 border-b-3 hover:border-primary-700 hover:text-primary-700 ${isActive
                            ? "text-primary-700 border-primary-700"
                            : "text-grey-900 border-transparent"
                            }`}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );
}
