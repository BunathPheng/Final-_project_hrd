"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react"

type tabbarItem = {
    name: string;
    href: string;
    tab: string;
};

export const MuseumTabbar: FC = () => {
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab') || "all";

    const tabbarItems: tabbarItem[] = [
        { name: "All Museums", href: "/admin/museum", tab: "all" },
        { name: "New Requests", href: "/admin/museum?tab=request", tab: "request" },
        { name: "Approvals", href: "/admin/museum?tab=approve", tab: "approve" },
    ];

    return (
        <nav className="border-b border-grey-100 w-full flex gap-8">
            {tabbarItems.map((item) => {
                const isActive: boolean = item.name == "All Museums" ? item.tab == currentTab : item.tab.startsWith(currentTab);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`transition-colors text-s2 px-3 py-5 relative border-b-3 hover:border-primary-700 hover:text-primary-700 ${isActive
                            ? "text-primary-700 border-primary-700"
                            : "text-grey-900 border-transparent"
                            }`}
                    >
                        {item.name}
                        {item.tab == "request" && (
                            <div className="absolute top-0 right-0 px-2 py-px rounded-2xl flex items-center justify-center bg-primary-700">
                                <span className="text-c3 text-white pt-px">7</span>
                            </div>
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
