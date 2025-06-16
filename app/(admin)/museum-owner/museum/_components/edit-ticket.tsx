"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit } from "iconsax-reactjs"

export function EditTicket() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'sm'} className="px-3 font-normal">
                    <Edit size={16} color="#fff" className="[&>*]:stroke-2 text-p4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-sm bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-grey-900 pb-3">Edit Ticket</DialogTitle>
                </DialogHeader>
                <div className="grid w-full gap-5">
                    <div className="grid gap-3">
                        <Label>Foreigner Price ($)</Label>
                        <Input placeholder="Enter Price" validationMode="float"/>
                    </div>
                    <div className="grid gap-3">
                        <Label>Local Price ($)</Label>
                        <Input placeholder="Enter Price" validationMode="float"/>
                    </div>
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
