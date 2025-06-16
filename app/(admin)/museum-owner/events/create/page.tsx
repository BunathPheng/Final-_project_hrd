"use client";

import Innercard from "@/components/feature/card/inner-card";
import Maincard from "@/components/feature/card/main-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/ui/upload-file";
import Link from "next/link";
import { JSX, useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { RequiredStar } from "@/components/feature/label/required-star";
import { CreateEvent, createEventSchema } from "@/schema/event-schema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextValidation } from "@/components/feature/fallback/text-validation";
import { uploadFile } from "@/action/upload/file-action";
import { createEvent } from "@/action/event/event-action";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function CreateEventPage(): JSX.Element {
    const breadcrumbs = ["Home", "Events", "Create"];

    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateEvent>({
        resolver: zodResolver(createEventSchema),
        mode: "onChange"
    });

    const submitEvent = async (data: CreateEvent) => {
        setIsSubmit(true);
        const uploadedFiles = await Promise.all(
            data.imageLinks.map(async (file) => {
                return await uploadFile({ file: file, type: "IMAGE" });
            })
        );

        // Extract URLs from upload responses and convert to JSONB format
        const imageUrls = uploadedFiles.map(file => {
            return file.payload?.fileUrl;
        });

        // Create JSONB object
        const imageLinksJsonb = {
            images: imageUrls
        };

        const response = await createEvent({ data, imageLinks: imageLinksJsonb });

        if (response?.status === "CREATED") {
            toast.success("Event created successfully!");
            redirect("/museum-owner/events");
        } else {
            toast.error(response?.message || "Failed to create event.");
        }

        setIsSubmit(false);
    }

    return (
        <>
            <Breadcrumb main="Musuem Management" items={breadcrumbs} />
            <Maincard>
                <Innercard>
                    <form onSubmit={handleSubmit(submitEvent)} encType="multipart/form-data">
                        <h2 className="text-s1 font-bold text-primary-700 border-b-[2px] pb-3 mb-7">
                            Create Event
                        </h2>
                        <div className="grid grid-cols-2 gap-7 mb-7">
                            <div className="flex flex-col gap-2">
                                <Label>Title <RequiredStar /></Label>
                                <Input {...register("title")} placeholder="Title" />
                                <TextValidation text={errors?.title?.message || ""} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Subtitle <RequiredStar /></Label>
                                <Input {...register("subTitle")} placeholder="Subtitle" />
                                <TextValidation text={errors?.subTitle?.message || ""} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Start Date <RequiredStar /></Label>
                                <DatePicker {...register("startDate")} placeholder="Select Start Date" />
                                <TextValidation text={errors?.startDate?.message || ""} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>End Date <RequiredStar /></Label>
                                <DatePicker {...register("endDate")} placeholder="Select End Date" />
                                <TextValidation text={errors?.endDate?.message || ""} />
                            </div>
                            <div className="flex flex-col gap-2 col-span-full">
                                <Label>Curator</Label>
                                <Input {...register("curator")} placeholder="Curator" />
                                <TextValidation text={errors?.curator?.message || ""} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Content<RequiredStar /></Label>
                                <Textarea
                                    {...register("content")}
                                    placeholder="Write your Content"
                                    className="h-28"
                                />
                                <TextValidation text={errors?.content?.message || ""} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Accessibility Note</Label>
                                <Textarea
                                    {...register("accessibilityNote")}
                                    placeholder="Write your Accessibility Note"
                                    className="h-28"
                                />
                                <TextValidation text={errors?.accessibilityNote?.message || ""} />
                            </div>
                        </div>
                        <div className="mb-7">
                            <Controller
                                name="imageLinks"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FileUpload
                                        title="Upload Images"
                                        multiple={true}
                                        maxFiles={10}
                                        required
                                        onFileUpload={(files) => {
                                            onChange(files);
                                        }}
                                    />
                                )}
                            />
                            <TextValidation text={errors?.imageLinks?.message || ""} />
                        </div>
                        <div className="border-t-[2px] pt-5">
                            <div className="flex gap-5 justify-end">
                                <Link href="/museum-owner/events">
                                    <Button
                                        size={"md"}
                                        variant="outline"
                                        className="border-primary-700 text-primary-700"
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    size={"md"}
                                    disabled={isSubmit}
                                    type="submit"
                                    className="px-6"
                                >
                                    {isSubmit ? "Save..." : "Save"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Innercard>
            </Maincard>
        </>
    );
}
