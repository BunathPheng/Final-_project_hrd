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
import FileUpload from "@/components/ui/upload-file"
import { Edit } from "iconsax-reactjs"
import { Textarea } from "@/components/ui/textarea"
import { ZoneCategoryProps, ZoneProps } from "@/types/zone"
import { useState } from "react"
import { EditZone, editZoneSchema } from "@/schema/zone-schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextValidation } from "@/components/feature/fallback/text-validation"
import { SelectCategoryZone } from "./select-category-zone"
import { updateZoneInformation } from "@/action/zone/zone-action"
import { RequiredStar } from "@/components/feature/label/required-star"

export const EditZoneInformation: React.FC<{ zoneId: string, payload: ZoneProps | null, items: ZoneCategoryProps[] }> = ({ zoneId, payload, items }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [open, setOpen] = useState(false);
    const images = payload?.pictureLink ? [{ url: payload.pictureLink }] : [];
    const [defaultImage, setDefaultImage] = useState<{ url: string }[]>(images);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<EditZone>({
        resolver: zodResolver(editZoneSchema),
        mode: "onChange"
    });

    const submitZone = async (data: EditZone) => {
        setIsSubmit(true);

        await updateZoneInformation(zoneId, data);

        setIsSubmit(false);
        setOpen(false);
    }

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);

        if (!newOpen) {
            // Reset form when dialog closes
            reset();
            setIsSubmit(false);
        } else {
            // Reset form with current payload values when dialog opens
            reset({
                name: payload?.zoneName || "",
                videoLink: payload?.videoLink || "",
                description: payload?.description || "",
                categoryId: payload?.zoneCategoryId || "",
                pictureLink: payload?.pictureLink || "",
                file: undefined,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild >
                <Button size={'sm'} className="px-3 font-normal">
                    <Edit size={16} color="#fff" className="[&>*]:stroke-2 text-p4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-2xl max-h-screen overflow-auto bg-white [&>button]:hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-grey-900 pb-3 border-b-1 border-grey-200">Edit Zone Information</DialogTitle>
                </DialogHeader >
                <form onSubmit={handleSubmit(submitZone)} encType="multipart/form-data" className="grid gap-5 grid-cols-2 content-start">
                    <div className="flex flex-col gap-2" >
                        <Label>Title <RequiredStar /></Label>
                        <Input placeholder="Title" {...register("name")} defaultValue={payload?.zoneName || ""} className="text-grey-900" />
                        <TextValidation text={errors?.name?.message || ""} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Category <RequiredStar /></Label>
                        <SelectCategoryZone defaultValue={payload?.zoneCategoryId || ""} items={items} />
                    </div>
                    <div className="flex flex-col gap-2 col-span-2">
                        <Label>Video Link</Label>
                        <Input placeholder="Video Link" {...register("videoLink")} defaultValue={payload?.videoLink || ""} className="text-grey-900" />
                        <TextValidation text={errors?.videoLink?.message || ""} />
                    </div>
                    <div className="flex flex-col gap-2 col-span-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Write description" {...register("description")} defaultValue={payload?.description || ""} className="border-1 border-grey-400" />
                        <TextValidation text={errors?.description?.message || ""} />
                    </div>
                    <div className="flex flex-col gap-2 col-span-2 mb-3">
                        <FileUpload
                            title="Update Zone"
                            defaultImages={defaultImage}
                            acceptedFileTypes="PNG, JPG, JPEG, and WEBP"
                            required
                            onChange={(files) => {
                                setValue("file", files?.[0]);
                                setDefaultImage([]);
                            }}
                        />
                        <TextValidation text={errors?.pictureLink?.message || ""} />
                    </div>
                </form>
                <DialogFooter className="space-x-3 mt-3">
                    <DialogClose asChild>
                        <Button size={"md"} variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button
                        size={"md"}
                        disabled={isSubmit}
                        onClick={handleSubmit(submitZone)}
                        className="px-6"
                    >
                        {isSubmit ? "Save..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
