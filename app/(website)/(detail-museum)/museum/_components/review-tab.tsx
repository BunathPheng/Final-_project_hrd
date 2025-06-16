"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState, ReactNode, useMemo } from "react";

interface ReviewTabProps {
    content: ReactNode;
}

export const ReviewTab: FC<ReviewTabProps> = ({ content }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const typeFromParams = useMemo(() => {
        return (searchParams.get("type") as string) || "recent";
    }, [searchParams]);

    const [activeTab, setActiveTab] = useState(typeFromParams);

    const tabs = [
        { id: "recent", label: "Most Recently" },
        { id: "high", label: "Highest Rated" },
        { id: "low", label: "Lowest Rated" },
    ];

    useEffect(() => {
        // Sync state with URL query param on mount or param change
        setActiveTab(typeFromParams);
    }, [typeFromParams]);

    const switchTab = (tabId: string) => {
        if (tabId === activeTab) return;

        setActiveTab(tabId);

        const params = new URLSearchParams(searchParams.toString());
        params.set("type", tabId);

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <>
            <div className="flex gap-5 items-center pb-8 border-b border-gray-300">
                <Label htmlFor="sortby">Sort by:</Label>
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        type="button"
                        onClick={() => switchTab(tab.id)}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>

            {/* Render passed-in tab content */}
            {content}
        </>
    );
};
