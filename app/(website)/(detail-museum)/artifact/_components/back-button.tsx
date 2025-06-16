"use client"

import { ArrowLeft2 } from "iconsax-reactjs";
import { FC } from "react";
import { useRouter } from "next/navigation";

export const BackButton: FC = () => {
    const router = useRouter();

    return (
        <>
            <button type="button" onClick={() => router.back()} className="cursor-pointer transition-all px-4 py-2.5 bg-white/10 hover:bg-white/50 rounded-full flex items-center gap-2">
                <ArrowLeft2 size={16} className="[&>*]:stroke-white" />
                <span className="text-p1 text-white">Back</span>
            </button>
        </>
    );
}
