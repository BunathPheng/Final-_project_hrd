"use client";
import React, { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SearchInput } from "../feature/input/search-input";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Facebook, NotificationBing, SmsTracking } from "iconsax-reactjs";
import { SwitchLanguage } from "../feature/button/switch-language";
import Image from "next/image";

// Define the navigation item type
type NavItem = {
    name: string;
    href: string;
};

const navigationItems: NavItem[] = [
    { name: "Explore", href: "/" },
    { name: "Museum", href: "/museum" },
    { name: "Events", href: "/events" },
    { name: "About us", href: "/about-us" },
    { name: "FAQ", href: "/faq" },
];

export const VisitorHeaderLogin: FC = () => {
    const pathname = usePathname();

    return (
        <>
            <header className="bg-primary-700">
                <article className="container h-10 flex items-center w-full justify-between pd-screen">
                    <div className="flex items-center gap-3">
                        <Facebook color="#ffffff" size={24} />
                        <SmsTracking color="#ffffff" size={24} />
                    </div>
                    <div className="flex items-center">
                        <SwitchLanguage color={"text-white"} />
                    </div>
                </article>
                <div className="bg-white w-full">
                   
                    <div className="container h-24 flex items-center justify-between pd-screen">
                         <Image
                        src={"/logo.svg"}
                        width={57}
                        height={68}
                        alt="Logo"
                    />
                        <section className="flex items-center gap-20">
                            <SearchInput />
                            <nav className="flex gap-7">
                                {navigationItems.map((item) => {
                                    const isActive: boolean = item.href == pathname || (pathname.startsWith(item.href) && item.href != "/");
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`transition-colors hover:text-primary-700 ${isActive
                                                ? "text-s2 text-primary-700"
                                                : "text-p1 text-black"
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                            <div className="flex gap-8 items-center">
                                <div className="relative w-fit pt-1">
                                    <NotificationBing variant="Outline" size={26} />
                                    <span className="absolute -top-0.5 -right-4 text-xs rounded-full px-1 text-white bg-primary-700">99+</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-full pr-3 py-1 bg-[#F3F3F3]">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="w-10 h-10 object-fit-cover rounded-full" />
                                    </Avatar>
                                    <h6 className="text-btn-sm">Bunath</h6>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </header>
        </>
    );
};
