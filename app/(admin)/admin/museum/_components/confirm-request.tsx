"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CloseCircle } from "iconsax-reactjs"

export function ConfirmRequest() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"md"}>
                    <CloseCircle size={24} />
                    Reject
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-xs bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <div className="flex items-center justify-center">
                        <CloseCircle size={64} className="fill-primary-700 [&>*]:stroke-white" />
                    </div>
                    <DialogTitle className="text-s1 text-center text-grey-900 pb-3">Reject Museum</DialogTitle>
                    <DialogDescription className="text-p1 text-center text-grey-800">Are you sure you want to reject this musuem?</DialogDescription>
                </DialogHeader>
                <DialogFooter className="grid grid-cols-2 gap-5 w-full mt-3">
                    <DialogClose asChild>
                        <Button size={"md"} variant={"outline"} className="w-full">No</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button size={"md"} className="px-6 w-full">Yes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
