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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Code } from "iconsax-reactjs"

        export function SearchCode() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'sm'} className="px-3 font-normal">
                    <Code size={16} color="#fff" className="[&>*]:stroke-2 text-p4" />
                    Enter Code
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-sm bg-white"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-s2 text-grey-900 pb-3">Can&apos;t scan QR  Code?</DialogTitle>
                    <DialogDescription className="text-center text-p1 text-grey-800">A text input field where the user can manually enter the QR code.</DialogDescription>
                </DialogHeader>
                <div className="grid w-full gap-5">
                    <div className="grid gap-3">
                        <Label>Code QR</Label>
                        <Input placeholder="Enter Code" />
                    </div>
                </div>
                <DialogFooter className="space-x-3 mt-3">
                    <DialogClose asChild>
                        <Button className="px-6 w-full">Find Code</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
