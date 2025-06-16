"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileUpload from "@/components/ui/upload-file";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown2, Trash } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";


interface FormAddArtifactProps {
    onDelete?: () => void;
    artifactNumber?: number;
}

export default function FormAddArtifact({ onDelete, artifactNumber }: FormAddArtifactProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(true); // Form content expanded by default

    const handleDelete = (): void => {
        // Hide the form immediately
        setIsVisible(false);

        // Call parent's delete function if provided
        if (onDelete) {
            onDelete();
        }
    };

    const toggleExpanded = (): void => {
        setIsExpanded(prev => !prev);
    };

    // Don't render anything if deleted
    if (!isVisible) {
        return null;
    }

    return (
        <>
            {/* Toggle Header - Same style as your example */}
            <div className="flex items-center justify-between ">
                <div
                    className="flex items-center justify-between cursor-pointer flex-1"
                    onClick={toggleExpanded}
                >
                    <h3 className="text-s2">
                        Artifact No <span className="text-primary-700 ">{artifactNumber || 1}</span>
                    </h3>
                    <ArrowDown2
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-0' : 'rotate-180'
                            }`}
                        size={20}
                        color="#dc2626"
                    />
                </div>

            </div>
            <section className=" bg-white">
                {/* Collapsible Content */}
                {isExpanded && (
                    <div className="flex gap-3 mt-3 ">
                        <div className="border-1 p-5  rounded-md transition-all duration-500 w-full border-grey-400">
                            <div className="grid grid-cols-2 gap-x-15 gap-y-7 mb-1 w-fulll transition-all duration-500">
                                <div className="col-span-2">
                                    <Label className="mb-3">Title</Label>
                                    <Input placeholder="Name" className="font-normal" />
                                </div>

                                <div className="col-span-2">
                                    <Label className="mb-3">Description</Label>
                                    <Textarea placeholder="Write your description" />
                                </div>

                                <div className="col-span-2">
                                    <FileUpload title="Upload 3D Artifact" acceptedFileTypes="STL, OBJ, FBX, and GBL" />
                                </div>
                            </div>
                        </div>
                        {/* Delete Button */}
                        <Button
                            onClick={handleDelete}
                            size={"sm"}
                            className="cursor-pointer px-2"
                        >
                            <Trash size={18} color="#FFFFFF" />
                        </Button>

                    </div>
                )}
            </section>
        </>
    );
}
