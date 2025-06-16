"use client"

import { useState } from "react"
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
import { CloseCircle, Link } from "iconsax-reactjs"

interface DisconnectProps {
    onDisconnect?: () => void
}

export function Disconnect({ onDisconnect }: DisconnectProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleDisconnect = async () => {
        // Remove from localStorage
        localStorage.removeItem("connect-webill")

        // Call parent callback to trigger re-render
        onDisconnect?.()

        // Close dialog
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size={'md'}>
                    <Link size={20} />
                    Disconnect WeBill365
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
                    <DialogTitle className="text-s1 text-center text-grey-900 pb-3">
                        Disconnect Account
                    </DialogTitle>
                    <DialogDescription className="text-p1 text-center text-grey-800">
                        Are you sure you want to disconnect account?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="grid grid-cols-2 gap-5 w-full mt-3">
                    <DialogClose asChild>
                        <Button
                            size={"md"}
                            variant={"outline"}
                            className="w-full"
                        >
                            No
                        </Button>
                    </DialogClose>
                    <Button
                        size={"md"}
                        className="px-6 w-full"
                        onClick={handleDisconnect}
                    >
                        Yes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
