import Maincard from "@/components/feature/card/main-card";
import Innercard from "@/components/feature/card/inner-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import React, { JSX } from "react";
import { GuideTabbar } from "@/app/(admin)/museum-owner/guides/_components/guide-tabbar";
import { User } from "iconsax-reactjs";
import { SearchTable } from "@/components/feature/input/search-table";
import Pagination from "@/components/feature/lib/pagination";
import { Showing } from "@/components/feature/lib/showing";
import { GuideData } from "@/app/(admin)/museum-owner/guides/_components/guide-data";
import { AddGuide } from "./_components/add-guide";

export default function GuidesPage(): JSX.Element {
    const breadcrumbs = ["Home", "Guides"];

    return (
        <>
            <Breadcrumb main="Tour Management" items={breadcrumbs} />
            <Maincard>
                <Innercard className="space-y-5">
                    <GuideTabbar />
                    <div className="flex justify-between items-center w-full gap-5">
                        <div className="flex gap-2 items-center">
                            <User size={24} className="[&>*]:stroke-primary-700" />
                            <h4 className="text-s1 text-grey-900">Guides</h4>
                        </div>
                        <div className="flex gap-5 items-center">
                            <SearchTable />
                            <AddGuide />
                        </div>
                    </div>

                    {/* Table */}
                    <GuideData />

                    <hr className="border-grey-100" />
                    <div className="flex w-full justify-between items-center gap-5">
                        <Pagination />
                        <Showing />
                    </div>
                </Innercard>
            </Maincard>
        </>
    )
}
