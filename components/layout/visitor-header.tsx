/* eslint-disable @typescript-eslint/no-explicit-any */

import { Facebook, SmsTracking } from "iconsax-reactjs";
import React, { FC } from "react";
import { SwitchLanguage } from "@/components/feature/button/switch-language";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { SearchInput } from "../feature/input/search-input";
import { VisitorDrawer } from "./visitor-drawer";
import { NavbarItems } from "./navbar-items";
import { auth } from "@/auth";
import { apiRequest } from "@/utils/api";
import { ApiResponse } from "@/types/response";
import defaultimage  from "../../public/profile/default.jpg";
interface VisitorHeaderProps {
    sticky?: boolean;
}

export const VisitorHeader: FC<VisitorHeaderProps> = async ({ sticky = false }) => {
    const session = await auth();
    // Initialize profileData as null
    let profileData = null;

    // Only fetch profile if user is logged in
    if (session?.user) {
        try {
            const profileResponse = await apiRequest<ApiResponse<any>>(
                `/profile/visitor`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        // Add authorization header if your API requires it
                        // 'Authorization': `Bearer ${session.accessToken || ''}`,
                    },
                    fetchOptions: {
                        cache: "force-cache",
                        next: {
                            tags: ["profile"],
                        }
                    }
                }
            );

            // Extract profile data from the response
            if (profileResponse?.success && profileResponse?.payload) {
                profileData = profileResponse.payload;
                console.log("Profile data extracted:", profileData);
                console.log("DOB from profile:", profileData.dob); // This should show "2001-06-10"
            }
        } catch (error) {
            console.log("Error fetching profile:", error);
        }
    }

    return (
        <>
            <header className={`bg-primary-700 ${sticky ? "sticky top-0 z-50" : ""}`}>
                <article className="container h-10 flex items-center w-full justify-between pd-screen">
                    <div className="flex items-center gap-3">
                        <Facebook color="#ffffff" size={24} />
                        <SmsTracking color="#ffffff" size={24} />
                    </div>
                    <div className="flex items-center gap-4">
                        <SwitchLanguage color={"text-white"} />
                    </div>
                </article>
                <div className="bg-white w-full">
                    <div className="container h-20 sm:h-24 flex items-center justify-between pd-screen gap-5">
                        <Link href={"/"} className="cursor-pointer shrink-0">
                            <Image
                                className="h-[60px] w-auto sm:w-[70px] sm:h-[68px]"
                                src={"/logo.svg"}
                                width={70}
                                height={68}
                                alt="Logo"
                            />
                        </Link>
                        <section className="flex items-center gap-5 md:gap-10 xl:gap-20">
                            <SearchInput />
                            <NavbarItems />
                            <div className="flex items-center gap-5">
                                {
                                    (session?.user as any)?.status === "OK" || session?.user?.image ? (
                                        <>
                                            <div className="flex gap-8 items-center">
                                                <div className="relative w-fit pt-1">
                                                    <VisitorDrawer />
                                                </div>

                                                <div className="relative group">
                                                    <Link href={"/profile"}>
                                                        <div className="rounded-full lg:pr-3 transition-colors">
                                                            <div className="relative w-10 h-10 shrink-0">
                                                                <Image
                                                                    src={
                                                                        profileData?.profileImageLink ||
                                                                        session?.user?.image ||
                                                                        defaultimage
                                                                    }
                                                                    alt={
                                                                        profileData?.fullName ||
                                                                        session?.user?.name ||
                                                                        "User"
                                                                    }
                                                                    fill
                                                                    className="rounded-full object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex gap-5">
                                                <Link href={"/register"}>
                                                    <Button size={"md"} className="w-22 sm:w-26" variant={"outline"}>
                                                        Sign up
                                                    </Button>
                                                </Link>
                                                <Link href={"/login"}>
                                                    <Button size={"md"} className="w-22 sm:w-26">
                                                        Login
                                                    </Button>
                                                </Link>
                                            </div>
                                        </>
                                    )
                                }

                                <NavbarItems mobile={true} />
                            </div>
                        </section>
                    </div>
                </div>
            </header>
        </>
    );
};
