"use client"
import BookingTicket from "@/app/(website)/(content)/booking/_components/booking-ticket";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Ticket2 } from "iconsax-reactjs";
import { FC, ReactNode, useState } from "react";

type BookingPopupProps = {
    buttonText?: string;
    buttonIcon?: ReactNode;
    buttonVariant?: "default" | "outline" | "ghost" | "white";
    buttonSize?: "default" | "sm" | "md" | "icon";
    textClassName?: string;
    showDialogIcon?: boolean;
    dialogIconColor?: string;
};

export const BookingPopup: FC<BookingPopupProps> = ({
    buttonText = "Book now",
    buttonIcon,
    buttonVariant = "white",
    buttonSize = "sm",
    textClassName = "text-p3",
    showDialogIcon = true,
    dialogIconColor = "#b50000"
}) => {
    const [open, setOpen] = useState(false);

    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (    
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={buttonVariant} size={buttonSize}>
                    {buttonIcon && (
                        <span className="mr-2">
                            {buttonIcon}
                        </span>
                    )}
                    <span className={textClassName}>
                        {buttonText}
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent
                className="max-w-[800px] sm:max-h-[100vh] overflow-auto hidden-scroll bg-white"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-h5 flex items-center gap-2 ">
                        {showDialogIcon && (
                            <Ticket2 size={28} color={dialogIconColor} />
                        )}
                        Booking Ticket
                    </DialogTitle>
                </DialogHeader>
                <BookingTicket onClose={handleCloseDialog} />
            </DialogContent>
        </Dialog>
    );
};