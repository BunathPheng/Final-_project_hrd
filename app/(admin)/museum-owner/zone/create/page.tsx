"use client"
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
import SelectCategoriesZone from "../_components/select-categories-zone";
import { Link1 } from "iconsax-reactjs";
import FormAddArtifact from "../_components/form-addartifact";
import { Plus } from "lucide-react";

export default function CreateZonePage(): JSX.Element {
    const breadcrumbs = ["Home", "Zone", "Create"];

    // State to manage artifact forms
    const [artifactForms, setArtifactForms] = useState<number[]>([]);
    const [nextId, setNextId] = useState(1);

    // Function to add a new artifact form
    const addArtifactForm = (): void => {
        setArtifactForms(prev => [...prev, nextId]);
        setNextId(prev => prev + 1);
    };

    // Function to remove an artifact form
    const removeArtifactForm = (id: number): void => {
        setArtifactForms(prev => prev.filter(formId => formId !== id));
    };

    return (
        <>
            <Breadcrumb main="Museum Management" items={breadcrumbs} />
            <Maincard>
                <Innercard>
                    <div >
                        <h2 className="text-s1 font-bold text-primary-700  pb-3 border-b-1 border-grey-100 mb-7">
                            Create Zone
                        </h2>
                        <h2 className="text-s1 text-grey-900 pb-6">
                            Zone Information
                        </h2>
                        <div className="grid grid-cols-2 gap-7 mb-1">
                            <div>
                                <Label className="mb-3">Name</Label>
                                <Input placeholder="Name" className="font-normal" />
                            </div>
                            <div>
                                <Label className="mb-3">Category</Label>
                                <SelectCategoriesZone />
                            </div>
                            <div className="col-span-2">
                                <Label className="mb-3">Video</Label>
                                <Input placeholder="Video Link" className="font-normal" endIcon={<Link1 color="#a1a1a1" />} />
                            </div>
                            <div className="col-span-2">
                                <Label className="mb-3">Description</Label>
                                <Textarea placeholder="Write your description" />
                            </div>
                            <div className="col-span-2">
                                <FileUpload />
                            </div>

                            {/* Artifact Information Section */}
                            <div className="col-span-2">
                                <Label className="text-s1">Artifact Information</Label>
                            </div>

                            {/* Render all artifact forms */}
                            {artifactForms.map((formId) => (
                                <div key={formId} className="col-span-2">
                                    <FormAddArtifact
                                        onDelete={() => removeArtifactForm(formId)
                                        }
                                        artifactNumber={formId}
                                    />
                                </div>
                            ))}

                            {/* Add Artifact Button */}
                            <div className="col-span-2 pb-3">
                                <Button
                                    type="button"
                                    onClick={addArtifactForm}
                                    size={"md"}
                                    className='font-bold'
                                >
                                    <Plus size={24} />
                                    Add New Artifact
                                </Button>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className=" border-t-[2px] pt-5">
                            <div className="flex gap-5 justify-end">
                                <Link href="/museum-owner/events">
                                    <Button size={"md"}>Save</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Innercard>
            </Maincard>
        </>
    );
}
