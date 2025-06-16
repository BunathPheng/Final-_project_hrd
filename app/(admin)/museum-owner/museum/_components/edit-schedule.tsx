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
import { Edit } from "iconsax-reactjs"
import { TimePicker } from "./time-picker"

export function EditSchedule() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'sm'} className="px-3 font-normal">
                    <Edit size={16} color="#fff" className="[&>*]:stroke-2 text-p4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent
                className="max-h-[90vh] overflow-auto sm:max-w-2xl bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-grey-900 pb-3">Edit Museum Schedule</DialogTitle>
                </DialogHeader>
                <div className="grid sm:grid-cols-2 w-full gap-5">
                    <TimePicker />
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
