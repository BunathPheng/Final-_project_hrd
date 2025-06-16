"use client";

import React, { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CloseCircle, TickCircle } from "iconsax-reactjs";
import { useSearchParams } from "next/navigation";
import { EditGuide } from "./edit-guide";

type Guide = {
    id: number;
    name: string;
    phone: string;
    status: "available" | "unavailable";
};

export const GuideData: FC = () => {
    const searchParams = useSearchParams();
    const currentTab = searchParams.get("status") || "all";

    const [guides, setGuides] = useState<Guide[]>([]);

    useEffect(() => {
        const generated = Array.from({ length: 10 }, (_, index) => {
            const status: "available" | "unavailable" = Math.random() < 0.5 ? "available" : "unavailable";
            return {
                id: index + 1,
                name: "Bunath",
                phone: "012 345 689",
                status,
            };
        });
        setGuides(generated);
    }, []);

    const filteredGuides =
        currentTab === "all" ? guides : guides.filter((guide) => guide.status === currentTab);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th className="text-left">NAME</th>
                    <th>CONTACT NUMBER</th>
                    <th className="text-left">STATUS</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {filteredGuides.map((guide, idx) => (
                    <tr key={guide.id}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="text-p1">{guide.name}</td>
                        <td className="text-center">{guide.phone}</td>
                        <td>
                            <Button
                                size="sm"
                                className={`cursor-default ${guide.status === "available"
                                    ? "bg-emerald-100 hover:bg-emerald-100"
                                    : "bg-primary-50 hover:bg-primary-50"
                                    }`}
                            >
                                {guide.status === "available" ? (
                                    <>
                                        <TickCircle size={24} color="green" variant="Bold" />
                                        <span className="text-p1 text-green">Available</span>
                                    </>
                                ) : (
                                    <>
                                        <CloseCircle size={24} color="var(--color-primary-700)" variant="Bold" />
                                        <span className="text-p1 text-primary-700">Unavailable</span>
                                    </>
                                )}
                            </Button>
                        </td>
                        <td className="text-center">
                            <EditGuide status={guide.status} />
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
    );
}
