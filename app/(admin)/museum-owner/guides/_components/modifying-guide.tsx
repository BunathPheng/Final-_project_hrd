"use client";

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import Image from "next/image";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

type GuideData = {
    name: string;
    phone: string;
    qr?: string;
    status: true | false;
};

type ModifyingGuideProps = {
    onClose?: () => void;
    content?: "add" | "edit";
    guide?: GuideData;
};

const ModifyingGuide: React.FC<ModifyingGuideProps> = ({ onClose, content = "add", guide }) => {

    const [name, setName] = useState(guide?.name || "");
    const [phone, setPhone] = useState(guide?.phone || "");
    const [status, setStatus] = useState<true | false>(guide?.status ?? true);

    const handleSave = () => {
        const payload = { name, phone, status };
        if (content === "edit") {
            console.log("Update guide:", payload);
        } else {
            console.log("Create new guide:", payload);
        }
        onClose?.();
    };

    return (
        <div className="space-y-7 border-t-[1px]">
            <div className="pt-5 flex flex-col gap-2">
                <Label>Name</Label>
                <Input
                    placeholder="Guide Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-s2">Contact Number</Label>
                <Input
                    placeholder="Contact Number"
                    validationMode="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <div className={"w-full h-11 flex justify-between border-b-[1px]"}>
                <Label className="text-s2" htmlFor="status-mode">Status (Available) </Label>
                <Switch
                    checked={status}
                    onCheckedChange={setStatus}
                    id="status-mode" />
            </div>

            <div className={"w-full flex flex-col justify-center gap-2.5"}>
                <Label className="text-s2">Guide QR Code</Label>
                <Image src="/qr/guide-qr.png" className="object-cover mx-auto" width={150} height={153} alt="Guide QR Code" />
                <a
                    href="/qr/guide-qr.png"
                    download="guide-qr.png"
                    className="text-s2 text-primary-700 text-center cursor-pointer hover:underline"
                >
                    Download QR Code
                </a>
            </div>

            <div className="w-full flex justify-end">
                <Button
                    onClick={handleSave}
                    className="bg-primary-700 px-6 text-white py-3 rounded-lg font-medium hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Save
                </Button>
            </div>

        </div>
    );

}

export default ModifyingGuide;
