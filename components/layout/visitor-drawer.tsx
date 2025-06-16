"use client"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { NotificationBing, SmsStar } from "iconsax-reactjs";
import { FC, useState } from "react";
import { VisitorNotification } from "../feature/card/visitor-notification";

type NotificationProps = {
    id: number;
    name: string;
    text: string;
    time: string;
    type: string;
    isRead: boolean;
}

const notificationData: NotificationProps[] = [
    {
        id: 1,
        name: "Sosoro",
        text: "SelaMonty",
        time: "Last Wednesday at 9:42 AM",
        type: "register",
        isRead: false
    },
    {
        id: 2,
        name: "Sosoro",
        text: "2 days",
        time: "Last Wednesday at 9:42 AM",
        type: "warning",
        isRead: false
    },
    {
        id: 3,
        name: "Sosoro",
        text: "remarkable event",
        time: "Last Wednesday at 9:42 AM",
        type: "event",
        isRead: true
    },
    {
        id: 4,
        name: "Sosoro",
        text: "SelaMonty",
        time: "Last Wednesday at 9:42 AM",
        type: "register",
        isRead: false
    },
    {
        id: 5,
        name: "Sosoro",
        text: "2 days",
        time: "Last Wednesday at 9:42 AM",
        type: "warning",
        isRead: true
    },
    {
        id: 6,
        name: "Sosoro",
        text: "remarkable event",
        time: "Last Wednesday at 9:42 AM",
        type: "event",
        isRead: true
    },
];

export const VisitorDrawer: FC = () => {
    const [data, setData] = useState(notificationData);

    const readAll = () => {
        const items: NotificationProps[] = [];
        Array.from(data).forEach(item => {
            item.isRead = true;
            items.push(item);
        })
        setData(items);
    }


    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="relative w-fit pt-1 cursor-pointer">
                    <NotificationBing variant="Outline" size={26} />
                    <span className="absolute -top-0.5 -right-4 text-xs rounded-full px-1 text-white bg-primary-700">99+</span>
                </div>
            </SheetTrigger>
            <SheetContent className="py-5 max-w-9/10 min-[450px]:max-w-sm sm:max-w-md w-full [&>button]:hidden rounded-tl-md rounded-bl-md">
                <SheetHeader className="p-0">
                    <div className="flex justify-between w-full items-center px-5">
                        <SheetTitle className="text-xl text-grey-900">Notifications</SheetTitle>
                        <div onClick={readAll} className="cursor-pointer flex items-center gap-2 group">
                            <SmsStar size={18} className="[&>*]:stroke-primary-700" />
                            <span className="text-p1 text-primary-700">Mask as read</span>
                        </div>
                    </div>
                </SheetHeader>

                <VisitorNotification items={data} />
            </SheetContent>
        </Sheet>
    )
}
