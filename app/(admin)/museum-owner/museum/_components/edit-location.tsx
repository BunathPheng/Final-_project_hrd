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
import { Edit, Gps } from "iconsax-reactjs"

export function EditLocation() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'sm'} className="px-3 font-normal">
                    <Edit size={16} color="#fff" className="[&>*]:stroke-2 text-p4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-2xl bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-grey-900 pb-3">Edit Location</DialogTitle>
                </DialogHeader>
                <div className="grid w-full gap-5">
                    <div className="flex items-center gap-5">
                        <Input type="text" name="search" placeholder="Enter your location or use current location" />
                        <Button size={"icon"} className="h-12 w-12 shrink-0">
                            <Gps size={32} />
                        </Button>
                    </div>
                    <div className="w-full h-[16rem] rounded-sm border border-grey-400 overflow-hidden">
                        <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.8046230935715!2d104.92657147452695!3d11.565859544137748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109514824227a9d%3A0xb8be437d2b4aa725!2sNational%20Museum%20of%20Cambodia!5e0!3m2!1sen!2skh!4v1747831834460!5m2!1sen!2skh" loading="lazy"></iframe>
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
