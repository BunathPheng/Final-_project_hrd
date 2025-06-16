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
import { Textarea } from "@/components/ui/textarea"
import FileUpload from "@/components/ui/upload-file"
import { Plus } from "lucide-react"

export function AddZoneArtifact() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex w-full justify-end">
                    <Button size={'md'} className="px-3 font-bold">
                        <Plus size={24} />
                        Add Artifact
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-lg bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="border-b-1 border-b-grey-200 text-grey-900 pb-3">Add Zone Artifact</DialogTitle>
                </DialogHeader>
                <div className="grid gap-5">
                    <div className="grid gap-3">
                        <Label>Title</Label>
                        <Input placeholder="Title" />
                    </div>
                    <div className="grid gap-3">
                        <Label>Description</Label>
                        <Textarea placeholder="Write description" className="border-1 border-grey-400" />
                    </div>
                    <div className="grid gap-3">
                        <FileUpload title="Upload 3D Artifact" acceptedFileTypes="STL, OBJ, FBX, and GBL" />
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
