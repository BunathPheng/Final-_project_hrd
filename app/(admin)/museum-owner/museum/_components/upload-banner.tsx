"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import FileUpload from "@/components/ui/upload-file"
import { Camera } from "iconsax-reactjs"

export function UploadBanner() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Camera size={24} color="#fff" className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-2xl bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogTitle></DialogTitle>
                <div className="grid w-full">
                    <FileUpload className="upload-banner" />
                </div>
                <DialogFooter className="space-x-3 mt-3">
                    <DialogClose asChild>
                        <Button size={"md"} variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button size={"md"} className="px-6">Save</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
