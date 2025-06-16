"use client"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { NotificationBing, SmsStar } from "iconsax-reactjs";
import { AdminNotification } from "@/components/feature/card/admin-notification";
import { OwnerNotification } from "../feature/card/owner-notification";
import { useState } from "react";

export const RightDrawer: React.FC<{ isAdmin?: boolean }> = ({ isAdmin = true }) => {
    const [isRead, setIsRead] = useState<boolean>(false);

    const readAll = () => {
        setIsRead(true);
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="relative w-fit pt-1 cursor-pointer">
                    <NotificationBing variant="Outline" size={26} />
                    <span className="absolute -top-0.5 -right-4 text-xs rounded-full px-1 text-white bg-primary-700">99+</span>
                </div>
            </SheetTrigger>
            <SheetContent className="py-5 sm:max-w-md w-full [&>button]:hidden rounded-tl-md rounded-bl-md">
                <SheetHeader className="p-0">
                    <div className="flex justify-between w-full items-center px-5">
                        <SheetTitle className="text-xl text-grey-900">Notifications</SheetTitle>
                        <div onClick={readAll} className="cursor-pointer flex items-center gap-2 group">
                            <SmsStar size={18} className="[&>*]:stroke-primary-700" />
                            <span className="text-p1 text-primary-700">Mask as read</span>
                        </div>
                    </div>
                </SheetHeader>

                {isAdmin && <AdminNotification mark={isRead} />}
                {!isAdmin && <OwnerNotification mark={isRead} />}
            </SheetContent>
        </Sheet>
    )
}
