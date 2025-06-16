"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bank, Eye , Profile2User } from "iconsax-reactjs";

import { clsx } from "clsx";
import Link from "next/link";
import { Logout } from "../feature/popuop/logout";


// Menu items.
const items = [
    {
        title: "Overview",
        url: "/admin/overview",
        icon: Eye,
    },
    {
        title: "Museum",
        url: "/admin/museum",
        icon: Bank,
    },
    {
        title: "Visitor",
        url: "/admin/visitor",
        icon: Profile2User,
    },
]

export function AppSidebar() {
    const pathname = usePathname();
    return (
        <Sidebar className="[&>*]:bg-white pt-5">
            <div className="flex justify-center w-full">
                <Image src="/logo.svg" width={79} height={92} alt="Logo" />
            </div>
            <SidebarContent className="px-5 mt-5 hover-custom-scrollbar">
                <SidebarGroup className="flex flex-col gap-3.5">
                    <h6 className="text-s2">Dashboard</h6>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items
                                .filter((item) => item.title === "Overview")
                                .map((item) => {
                                    const isActive = pathname.startsWith(item.url)
                                    return (
                                        <SidebarMenuItem
                                            key={item.title}
                                            className={clsx(
                                                isActive &&
                                                "bg-primary-50 rounded-sm"
                                            )}
                                        >
                                            <SidebarMenuButton className={clsx("hover:bg-primary-50 hover:text-primary-700 p-0 h-10")}>
                                                <Link href={item.url} className="flex items-center gap-2 w-full h-full px-5 rounded-sm">
                                                    <item.icon color="var(--color-primary-700)" variant="Outline" size={20} />
                                                    <span
                                                        className={clsx(
                                                            "text-p2",
                                                            isActive && "text-primary-700"
                                                        )}
                                                    >
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="flex flex-col gap-3.5">
                    <h6 className="text-s2">User Management</h6>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items
                                .filter((item) => item.title !== "Overview")
                                .map((item) => {
                                    const isActive = pathname.startsWith(item.url)
                                    return (
                                        <SidebarMenuItem
                                            key={item.title}
                                            className={clsx(
                                                isActive &&
                                                "bg-primary-50 rounded-sm"
                                            )}
                                        >
                                            <SidebarMenuButton className={clsx("hover:bg-primary-50 hover:text-primary-700 p-0 h-10")}>
                                                <Link href={item.url} className="flex items-center gap-2 w-full h-full px-5 rounded-sm">
                                                    <item.icon color="var(--color-primary-700)" variant="Outline" size={20} />
                                                    <span
                                                        className={clsx(
                                                            "text-p2",
                                                            isActive && "text-primary-700"
                                                        )}
                                                    >
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <div className="px-7 pb-5">
                <Logout/>
            </div>
        </Sidebar>
    )
}
