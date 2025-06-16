"use client";
import { FC, ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ModifyingGuide from "@/app/(admin)/museum-owner/guides/_components/modifying-guide";

type GuideData = {
    name: string;
    phone: string;
    qr?: string;
    status: true | false;
};

type GuidePopupProps = {
    buttonText?: string;
    buttonIcon?: ReactNode;
    buttonVariant?: "default" | "outline" | "ghost" | "white";
    buttonSize?: "default" | "sm" | "md" | "icon";
    textClassName?: string;
    content?: "add" | "edit";
    guide?: GuideData;
};

export const GuidePopup: FC<GuidePopupProps> = ({
    buttonText = "",
    buttonIcon,
    buttonVariant = "white",
    buttonSize = "default",
    content = "add",
    guide,
}) => {
    const [open, setOpen] = useState(false);
    const handleCloseDialog = () => setOpen(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={buttonVariant} size={buttonSize} className={content === "add" ? "bg-primary-700 hover:bg-primary-800 text-white" : "bg-transparent"}>
                    {buttonIcon && (
                        <span>
                            {buttonIcon}
                        </span>
                    )}
                    <span>
                        {buttonText}
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[800px] bg-white">
                <DialogHeader>
                    <DialogTitle className="text-s1 flex items-center gap-2">
                        {content === "add" ? "Add Guide" : "Edit Guide Information"}
                    </DialogTitle>
                </DialogHeader>

                <ModifyingGuide
                    onClose={handleCloseDialog}
                    content={content}
                    guide={guide}
                />
            </DialogContent>
        </Dialog>
    );
}
