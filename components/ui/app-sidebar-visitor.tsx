"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import { Heart , Ticket2, User } from "iconsax-reactjs";

import { clsx } from "clsx";
import Link from "next/link";
import { Logout } from "../feature/popuop/logout";

// Menu items.
const items = [
    {
        title: "My Profile",
        url: "/profile",
        icon: User,
    },
    {
        title: "Favorite Museums",
        url: "/profile/favorite-museum",
        icon: Heart,
    },
    {
        title: "Booking History",
        url: "/profile/booking-history",
        icon: Ticket2,
    },
]

export function AppSidebarVisitor() {
    const pathname = usePathname();

    
    // Function to check if a menu item is active
    const isActiveRoute = (itemUrl: string) => {
        // Exact match for dashboard root
        if (itemUrl === "/profile") {
            return pathname === "/profile";
        }
        // For other routes, check if pathname starts with the item URL
        return pathname.startsWith(itemUrl);
    };

    return (
        <Sidebar className="border-none rounded-md fixed top-0 left-0">
            <SidebarContent className="mt-40">
                <SidebarGroup className="flex flex-col justify-between h-full gap-3.5">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items
                                .filter((item) => item.title !== "Overview")
                                .map((item) => {
                                    const isActive = isActiveRoute(item.url);
                                    return (
                                        <SidebarMenuItem
                                            key={item.title}
                                            className={clsx("flex items-center", isActive && " text-primary-700 text-p2")}
                                        >
                                            {/* Red bar for active item */}
                                            <div className={clsx(
                                                "w-1.5 h-10 rounded-r-full transition-all",
                                                isActive ? "bg-primary-700" : "bg-transparent"
                                            )}></div>

                                            <SidebarMenuButton className={clsx(" hover:text-primary-700")}>
                                                <Link href={item.url} className="flex items-center gap-4 p-2">
                                                    <item.icon className={clsx(
                                                        "text-p2",
                                                        isActive && "text-primary-700"
                                                    )} variant="Outline" size={24} />
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
                    <SidebarFooter>
                        <Logout/> 
                    </SidebarFooter>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
