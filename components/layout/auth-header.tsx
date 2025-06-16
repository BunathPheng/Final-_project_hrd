"use client";

import React, { FC } from "react";
import Image from "next/image";
import { SwitchLanguage } from "@/components/feature/button/switch-language";
import Link from "next/link";

export const AuthHeader: FC = ({ isWhite = false }: { isWhite?: boolean }) => {
    return (
        <div className="fixed top-0 left-0 w-full z-10">
            <div className="px-5 pt-2 flex w-full justify-between items-center">
                <Link href="/" className="custor-pointer">
                    { !isWhite && (<Image src="/logo.svg" width={79} height={92} alt="Logo" />)}
                    { isWhite && (<Image src="/white-logo.png" width={79} height={92} alt="Logo" />)}
                </Link>
                <SwitchLanguage />


            </div>
        </div>
    );
};
