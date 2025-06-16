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
import { Textarea } from "@/components/ui/textarea"
import FileUpload from "@/components/ui/upload-file"

export function EditArtifacts() {
    return (
        <Dialog>
            <DialogTrigger asChild >
                <div className="flex w-full justify-end">
                    <Button size={'sm'} className="px-3 font-normal">
                        <Edit size={16} color="#fff" className="[&>*]:stroke-2 text-p4" />
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-2xl bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-grey-900 pb-3 border-b-1 border-grey-200">Edit Zone Artifact</DialogTitle>
                </DialogHeader>
                <div className="grid gap-5 grid-cols-2">
                    <div className="grid gap-3 col-span-2" >
                        <Label>Title</Label>
                        <Input placeholder="Title" defaultValue={"Treasure of Cambodia"} className="text-grey-900" />
                    </div>
                    <div className="grid gap-3 col-span-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Write description" defaultValue={"Located in the southeast of the Indochina peninsula between longitudes 103º and 108º and between the 10th and 15th parallels, Cambodia is bounded on the north and west by Laos and Thailand, and to the south and east by Vietnam. It has a surface area of 181,035 square kilometres with a population of about eleven and one-half million people (statistics: 1998 census)."} className="border-1 border-grey-400" />
                    </div>
                    <div className="grid gap-3 col-span-2 mb-3">
                        <FileUpload title="Update 3D Artifact" acceptedFileTypes="STL, OBJ, FBX, and GBL" />
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
