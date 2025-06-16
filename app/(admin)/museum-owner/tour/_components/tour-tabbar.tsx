"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react"

type tabbarItem = {
    name: string;
    href: string;
    tab: string;
};

export const TourTabbar: FC = () => {
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab') || "all";

    const tabbarItems: tabbarItem[] = [
        { name: "All Tours", href: "/museum-owner/tour", tab: "all" },
        { name: "Request", href: "/museum-owner/tour?tab=request", tab: "request" },
        { name: "Unpaid", href: "/museum-owner/tour?tab=unpaid", tab: "unpaid" },
        { name: "Paid", href: "/museum-owner/tour?tab=paid", tab: "paid" },
    ];

    return (
        <nav className="border-b border-grey-100 w-full flex gap-8">
            {tabbarItems.map((item) => {
                const isActive: boolean = item.name == "All Tours" ? item.tab == currentTab : item.tab.startsWith(currentTab);

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
