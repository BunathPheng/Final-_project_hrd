"use client"

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { FC } from "react"

type tabbarItem = {
    name: string;
    href: string;
    tab: string;
};

export const MuseumTabbar: FC = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const museumId = params['museum-id'];
    const currentTab = searchParams.get('tab') || "overview";

    const tabbarItems: tabbarItem[] = [
        { name: "Overview", href: `/museum/${museumId}`, tab: "overview" },
        { name: "Zones", href: `/museum/${museumId}?tab=zones`, tab: "zones" },
        { name: "Events", href: `/museum/${museumId}?tab=events`, tab: "events" },
        { name: "Reviews", href: `/museum/${museumId}?tab=reviews`, tab: "reviews" },
    ];

    return (
        <nav className="border-b border-grey-100 w-full flex gap-8">
            {tabbarItems.map((item) => {
                const isActive: boolean = item.name == "Overview" ? item.tab == currentTab : item.tab.startsWith(currentTab);

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
