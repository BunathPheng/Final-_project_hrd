"use client"

import * as React from "react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { More, SmsStar } from "iconsax-reactjs";

export function BottomDrawer() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <More className="cursor-pointer [&>*]:stroke-grey-900" size={24} />
            </DrawerTrigger>
            <DrawerContent className="sm:max-w-sm ml-auto [&>*:first-child]:hidden">
                <DrawerHeader className="p-0">
                    <DrawerClose className="px-5 py-2 rounded-tl-md rounded-tr-md cursor-pointer">
                        <DrawerTitle>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-grey-200">
                                    <SmsStar size={18} className="[&>*]:stroke-grey-900" />
                                </div>
                                <p className="text-p2 text-grey-900">Mark all as read</p>
                            </div>
                        </DrawerTitle>
                    </DrawerClose>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
}
