"use client"

import { useState } from "react"
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
import { ArchiveAdd, TickCircle, Verify } from "iconsax-reactjs"
import Image from "next/image"

type GuideProps = {
    id: number;
    name: string;
    contactNumber: string;
}

const guideData: GuideProps[] = [
    { id: 1, name: "Danith", contactNumber: "097 234 3256" },
    { id: 2, name: "Lolita", contactNumber: "023 255 7656" },
    { id: 3, name: "Rona", contactNumber: "012 546 653" },
    { id: 4, name: "Thireach", contactNumber: "088 982 1289" },
    { id: 5, name: "Mengse", contactNumber: "012 653 565" },
    { id: 6, name: "Tikea", contactNumber: "055 345 5634" },
    { id: 7, name: "Harry", contactNumber: "033 897 283" },
    { id: 8, name: "Kanha", contactNumber: "099 345 657" },
    { id: 9, name: "Sokha", contactNumber: "021 546 1239" },
    { id: 10, name: "Bopha", contactNumber: "043 982 3255" },
];

export function ConfirmTour() {
    const [selectedGuides, setSelectedGuides] = useState<number[]>([])
    const [tourPrice, setTourPrice] = useState("")

    const handleGuideSelection = (guideId: number) => {
        setSelectedGuides(prev => {
            if (prev.includes(guideId)) {
                return prev.filter(id => id !== guideId)
            } else {
                return [...prev, guideId]
            }
        })
    }

    const isGuideSelected = (guideId: number) => {
        return selectedGuides.includes(guideId)
    }

    const resetForm = () => {
        setSelectedGuides([])
        setTourPrice("")
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button" className="cursor-pointer flex w-fit">
                    <Verify size={24} className="[&>*]:stroke-primary-700" />
                </button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[70rem] bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="flex pb-3 w-full justify-between items-center">
                        <p className="text-s1 text-grey-900">Tour Information</p>
                        <div className="flex items-center gap-2 w-fit rounded-full px-3 py-1.5 bg-light-blue">
                            <ArchiveAdd size={20} className="[&>*]:stroke-blue" />
                            <span className="text-p3 text-blue">Request</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="grid w-full gap-5">
                    <div className="grid gap-3">
                        <Label>Tour Price</Label>
                        <Input
                            placeholder="Enter Tour Price"
                            value={tourPrice}
                            validationMode="float"
                            onChange={(e) => setTourPrice(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-5">
                        <Label>Guides</Label>
                        <div className="grid grid-cols-5 gap-5 max-h-[50vh] overflow-auto">
                            {guideData && guideData.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => handleGuideSelection(item.id)}
                                    className={`
                                        shadow-600 p-5 pt-8 rounded-md relative flex flex-col justify-center items-center gap-2 cursor-pointer transition-all duration-200
                                        ${isGuideSelected(item.id)
                                            ? 'bg-primary-50 border-2 border-primary-700 shadow-lg'
                                            : 'bg-grey-50 border-2 border-transparent hover:bg-primary-50 hover:shadow-md'
                                        }
                                    `}
                                >
                                    {/* Selection indicator */}
                                    {isGuideSelected(item.id) && (
                                        <div className="absolute top-2 right-2 rounded-full flex items-center justify-center">
                                            <TickCircle size={28} className="fill-primary-700 [&>*]:stroke-white" />
                                        </div>
                                    )}

                                    <Image
                                        src={"/profile/man.webp"}
                                        className="w-18 h-18 shrink-0 rounded-full"
                                        width={100}
                                        height={100}
                                        alt={item.name}
                                    />
                                    <h6 className={`text-p2 ${isGuideSelected(item.id) ? 'text-primary-700' : 'text-grey-900'}`}>
                                        {item.name}
                                    </h6>
                                    <p className="text-p3 text-grey-800">{item.contactNumber}</p>
                                    <span className={`
                                        px-6 py-1 rounded-full text-p4 transition-all duration-200
                                        ${isGuideSelected(item.id)
                                            ? 'bg-primary-700 text-white'
                                            : 'bg-white text-primary-700'
                                        }
                                    `}>
                                        {isGuideSelected(item.id) ? 'Selected' : 'Select'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter className="space-x-3 flex w-full justify-between sm:justify-between items-center mt-3">
                    <p className="text-p2 text-grey-900">
                        Selected Guides: <span className="text-primary-700">{selectedGuides.length}</span>
                    </p>
                    <div className="space-x-5">
                        <DialogClose asChild>
                            <Button
                                size={"md"}
                                variant={"outline"}
                                onClick={resetForm}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                size={"md"}
                                className="px-4"
                                onClick={resetForm}
                            >
                                Confirm
                            </Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
