"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import { XIcon } from "lucide-react"
import TextToSpeech from "./text-to-speech";
import { Maximize4 } from "iconsax-reactjs";

export const DetailArtifactPopup: React.FC<{ title: string, description: string }> = ({ title, description }) => {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <button type="button" className="absolute top-10 left-1/2 -translate-x-1/2 cursor-pointer transition-all flex gap-3 px-4 py-2.5 bg-white/10 hover:bg-white/50 rounded-full">
                    <Maximize4 size={22} className="[&>*]:stroke-white" />
                    <span className="text-p1 text-white">Explore Details</span>
                </button>

            </DialogTrigger>
            <DialogContent className="w-full p-10 backdrop-blur-xs" closeIcon={<XIcon className="text-white" />}>
                <DialogHeader>
                    <DialogTitle className="text-white text-center text-2xl">{title || ""}</DialogTitle>
                </DialogHeader>
                <div className="text-white text-p1 leading-6 text-justify">{description || ""}</div>
                <TextToSpeech
                    text={description || ""}
                    autoPlay={false}
                />
            </DialogContent>
        </Dialog>
    );
};
