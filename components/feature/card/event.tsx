/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Edit, Trash } from "iconsax-reactjs";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { formatDate } from "@/utils/format";
import { AnimatedSection } from "@/components/feature/animation/animation-section";
import { EmptyEvent } from "@/app/(website)/(content)/events/_components/empty-event";
import { EventProps } from "@/types/events";
import { SmartImage } from "../fallback/smart-image";

type EventComponentProps = {
    items: EventProps[];
    isMuseumOwner?: boolean;
    onDelete?: (id: string | number) => void;
};

const Events: React.FC<EventComponentProps> = ({
    items,
    isMuseumOwner = false,
    onDelete = () => { },
}) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openMenuId === null) return;

            const target = event.target as Element;
            const menuElement = menuRefs.current[openMenuId];

            // Check if click is on the menu button or inside the menu
            const isClickOnMenuButton = target.closest(
                '[data-menu-button="' + openMenuId + '"]'
            );
            const isClickInsideMenu =
                menuElement && menuElement.contains(target);

            // Close menu if click is outside both the button and menu
            if (!isClickOnMenuButton && !isClickInsideMenu) {
                setOpenMenuId(null);
            }
        };

        if (openMenuId !== null) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [openMenuId]);

    const handleMenuToggle = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    return (
        <>
            {(!items || items.length === 0) && <EmptyEvent />}

            {(items && items.length > 0) && (
                <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 xl:gap-10 w-full">
                        {items &&
                            items.map((item) => (
                                <AnimatedSection key={item?.eventId} animation="zoom-in" className="relative">
                                    {/* Deleting overlay */}
                                    {isDeleting === item?.eventId && (
                                        <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center z-50">
                                            <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-700"></div>
                                                <span className="text-sm font-medium">
                                                    Deleting event...
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {isMuseumOwner ? (
                                        // Museum owner: unclickable card, only 3 dots are clickable
                                        <div
                                            className={`block overflow-hidden h-full shadow-300 rounded-md cursor-default ${isDeleting === item?.eventId ? "opacity-50" : ""
                                                }`}
                                        >
                                            <div className="relative">
                                                <SmartImage
                                                    src={item?.imageLinks?.images[0] || ""}
                                                    className="w-full h-72 object-cover !bg-grey-50"
                                                    width={400}
                                                    height={280}
                                                    alt={item?.title}
                                                />
                                                <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

                                                {/* Three dots menu button - clickable for museum owners */}
                                                <button
                                                    data-menu-button={item?.eventId}
                                                    onClick={(e) =>
                                                        handleMenuToggle(item?.eventId, e)
                                                    }
                                                    disabled={isDeleting === item?.eventId}
                                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors z-10 cursor-pointer hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <MoreHorizontal
                                                        size={20}
                                                        className="text-white"
                                                    />
                                                </button>

                                                <div className="absolute left-7 bottom-5 w-full pr-14 flex flex-col gap-2">
                                                    <h4 className="text-h4 drop-shadow-500 text-white line-clamp-1">
                                                        {item?.title}
                                                    </h4>
                                                    <div className="w-2/5 h-px bg-gradient-to-r from-transparent via-yellow to-transparent"></div>
                                                    <p className="text-p5 drop-shadow-500 text-white line-clamp-1">
                                                        {item?.subTitle}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="grid w-full p-7 gap-5">
                                                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent"></div>
                                                <p className="text-grey-800 text-p1 line-clamp-3">
                                                    {item?.content}
                                                </p>
                                                <div className="flex gap-2 items-center">
                                                    <Calendar className="[&>*]:stroke-primary-700" />
                                                    <dl className="flex gap-1">

                                                        <dt className="text-p1 text-grey-900">
                                                            Date:
                                                        </dt>
                                                        <dd className="text-s2 text-primary-700">
                                                            {formatDate(item?.startDate)}
                                                        </dd>
                                                        <dd className="text-s2 text-grey-900">
                                                            -
                                                        </dd>
                                                        <dd className="text-s2 text-primary-700">
                                                            {formatDate(item?.endDate)}
                                                        </dd>
                                                    </dl>
                                                </div>
                                                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        // Visitor: fully clickable card
                                        <Link
                                            href={`/events/${item?.eventId}`}
                                            className="block overflow-hidden shadow-300 bg-white h-full rounded-md hover:cursor-pointer"
                                        >
                                            <div className="relative">
                                                <SmartImage
                                                    src={item?.imageLinks?.images[0] || ""}
                                                    className="w-full h-72 object-cover !bg-grey-50"
                                                    width={400}
                                                    height={280}
                                                    alt={item?.title}
                                                />
                                                <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

                                                <div className="absolute left-7 bottom-5 w-full pr-14 flex flex-col gap-2">
                                                    <h4 className="text-h4 drop-shadow-500 text-white line-clamp-1">
                                                        {item?.title}
                                                    </h4>
                                                    <div className="w-2/5 h-px bg-gradient-to-r from-transparent via-yellow to-transparent"></div>
                                                    <p className="text-p5 drop-shadow-500 text-white line-clamp-1">
                                                        {item?.subTitle}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="grid w-full p-7 gap-5">
                                                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent"></div>
                                                <p className="text-grey-800 text-p1 line-clamp-3">
                                                    {item?.content}
                                                </p>
                                                <div className="flex gap-2 items-center">
                                                    <Calendar className="[&>*]:stroke-primary-700" />
                                                    <dl className="flex gap-1">
                                                        <dt className="text-p1 text-grey-900">
                                                            Date:
                                                        </dt>
                                                        <dd className="text-s2 text-primary-700">
                                                            {formatDate(item?.startDate)}
                                                        </dd>
                                                        <dd className="text-s2 text-grey-900">
                                                            -
                                                        </dd>
                                                        <dd className="text-s2 text-primary-700">
                                                            {formatDate(item?.endDate)}
                                                        </dd>
                                                    </dl>
                                                </div>
                                                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent"></div>
                                            </div>
                                        </Link>
                                    )}

                                    {/* Dropdown heiligenberg.de Dropdown menu - show only for museum owners */}
                                    {isMuseumOwner && openMenuId === item?.eventId && (
                                        <div
                                            ref={(el) => {
                                                menuRefs.current[item?.eventId] = el;
                                            }}
                                            className="absolute top-16 right-4 bg-white rounded-lg shadow-lg border z-20 min-w-[140px]"
                                        >
                                            <div className="">
                                                <Link href={"/museum-owner/events/update"}>
                                                    <button className="w-full px-4 py-2 text-s2 text-grey-900 hover:bg-grey-50 transition-colors hover:cursor-pointer rounded-tl-md rounded-tr-md flex gap-x-2 items-center">
                                                        <Edit size={20} className="[&>*]:stroke-2 [&>*]:stroke-grey-900" />
                                                        Edit
                                                    </button>
                                                </Link>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button className="w-full px-4 py-2 text-s2 text-primary-700 hover:bg-grey-50 transition-colors hover:cursor-pointer rounded-bl-md rounded-br-md flex gap-x-2 items-center">
                                                            <Trash size={20} className="[&>*]:stroke-2 [&>*]:stroke-primary-700" />
                                                            Delete
                                                        </button>
                                                    </DialogTrigger>
                                                    <DialogContent
                                                        className="sm:max-w-xs bg-white [&>button]:hidden"
                                                        onPointerDownOutside={(e) =>
                                                            e.preventDefault()
                                                        }
                                                        onEscapeKeyDown={(e) =>
                                                            e.preventDefault()
                                                        }
                                                    >
                                                        <DialogHeader>
                                                            <div className="flex items-center justify-center">
                                                                <Trash
                                                                    size={64}
                                                                    className="[&>*]:stroke-primary-700"
                                                                />
                                                            </div>
                                                            <DialogTitle className="text-s1 text-center text-grey-900 pb-3">
                                                                Delete Event
                                                            </DialogTitle>
                                                            <DialogDescription className="text-p1 text-center text-grey-800">
                                                                Are you sure you want to
                                                                delete this event?
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter className="grid grid-cols-2 gap-5 w-full mt-3">
                                                            <DialogClose asChild>
                                                                <Button
                                                                    size={"md"}
                                                                    variant={"outline"}
                                                                    className="w-full"
                                                                >
                                                                    No
                                                                </Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                                <Button
                                                                    size={"md"}
                                                                    className="px-6 w-full"
                                                                    onClick={() => onDelete(item.eventId)}
                                                                >
                                                                    Yes
                                                                </Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    )}
                                </AnimatedSection>
                            ))}
                    </div>
                </>
            )}

        </>
    );
};

export default Events;
