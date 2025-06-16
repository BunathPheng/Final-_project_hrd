"use client"

import { useState } from "react"
import ToggleCheckbox from "@/components/feature/button/toggle-checkbox"
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
import Image from "next/image"
import { Edit } from "iconsax-reactjs"

export const EditGuide: React.FC<{ status: "available" | "unavailable" }> = ({ status }) => {
    const [isAvailable, setIsAvailable] = useState(status == "available" ? true : false)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Edit
                    className="mx-auto flex w-fit cursor-pointer"
                    size={24}
                    color="var(--color-primary-700)"
                />
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-lg sm:max-h-screen overflow-auto bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="border-b border-grey-100 text-grey-900 pb-3">Edit Guide Information</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <Label>Name</Label>
                    <Input placeholder="Guide Name" defaultValue={"Bunath"} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Contact Number</Label>
                    <Input placeholder="Contact Number" validationMode="number" defaultValue={"012838454"} />
                </div>

                <div className="w-full h-16 flex items-center justify-between gap-3 border-b border-grey-100">
                    <Label htmlFor="status-mode">
                        Status ({isAvailable ? "Available" : "Unavailable"})
                    </Label>
                    <ToggleCheckbox
                        defaultChecked={status == "available" ? true : false}
                        onChange={() => setIsAvailable(isAvailable ? false : true)}
                    />
                </div>

                <div className={"w-full flex flex-col justify-center gap-2.5"}>
                    <Label>Guide QR Code</Label>
                    <Image src="/qr/guide-qr.png" className="object-cover mx-auto" width={150} height={153} alt="Guide QR Code" />
                    <a
                        href="/qr/guide-qr.png"
                        download="guide-qr.png"
                        className="text-s2 text-primary-700 text-center cursor-pointer hover:underline"
                    >
                        Download QR Code
                    </a>
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
        </Dialog >
    )
}
