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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Edit } from "iconsax-reactjs"

export function EditMuseum() {
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
                    <DialogTitle className="text-center text-grey-900 pb-3">Edit About Museum</DialogTitle>
                </DialogHeader>
                <div className="grid w-full gap-5">
                    <div className="grid gap-3">
                        <Label>Museum Name</Label>
                        <Input placeholder="Museum Name" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="All catetories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="-1">All catetories</SelectItem>
                                <SelectItem value="1">History</SelectItem>
                                <SelectItem value="2">Art</SelectItem>
                                <SelectItem value="3">Science</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-3">
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Write your description"
                            className="h-10"
                        />
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
