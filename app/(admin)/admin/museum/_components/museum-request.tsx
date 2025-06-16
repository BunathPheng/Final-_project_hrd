import Innercard from "@/components/feature/card/inner-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Call, Location, Message, Timer1 } from "iconsax-reactjs";
import Image from "next/image";
import { FC } from "react";
import { ConfirmApproval } from "./confirm-approval";
import { ConfirmRequest } from "./confirm-request";

export const MuseumRequest: FC = () => {
    return (
        <>
            <div className="grid w-full bg-white shadow-600 relative overflow-hidden rounded-md">
                <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center drop-shadow-600">
                    <h3 className="text-h3 text-white">National Museum of Cambodia</h3>
                </div>
                <Image src={"/banner/national-museum.webp"} className="w-full rounded-md h-62 object-center object-cover" width={1440} height={400} alt="Museum Banner" />
            </div>

            <div className="grid grid-cols-5 w-full gap-7 content-start">
                <div className="col-span-3 grid gap-7 content-start">
                    {/* About the Museum */}
                    <Innercard className="gap-5">
                        <h6 className="text-s1 text-grey-900">About the Museum</h6>
                        <p className="text-p1 text-grey-800">Founded in 1897, the National Museum of Art & History houses over 200,000 artifacts spanning five millennia of human history. Our carefully curated exhibits showcase artistic achievements, technological innovations, and cultural treasures from civilizations around the world.</p>
                        <div className="flex gap-7 w-full">
                            <dl className="flex gap-2">
                                <dt className="text-s2 text-grey-900">Created:</dt>
                                <dd className="text-p2 text-primary-700">June 12, 2025</dd>
                            </dl>
                            <dl className="flex gap-2">
                                <dt className="text-s2 text-grey-900">Last Updated:</dt>
                                <dd className="text-p2 text-primary-700">June 14, 2025</dd>
                            </dl>
                        </div>
                        <div className="flex items-center gap-2 rounded-md w-fit px-3 py-1.5 bg-yellow/30">
                            <Timer1 size={20} className="[&>*]:stroke-yellow" />
                            <span className="text-p3 text-grey-900">Pending</span>
                        </div>
                    </Innercard>
                    {/* Message to Museum */}
                    <Innercard className="space-y-5">
                        <h5 className="text-h5 text-grey-900">Message to Museum</h5>
                        <Input placeholder="Send direct message to museum" />
                        <div className="ml-auto">
                            <Button>
                                <Message size={24} color="#fff" />
                                Send Message
                            </Button>
                        </div>
                    </Innercard>
                </div>
                <div className="col-span-2 grid gap-7 content-start">
                    {/* Contact Information */}
                    <Innercard className="gap-5">
                        <h6 className="text-s1 text-grey-900">Contact Information</h6>
                        <div className="flex items-center gap-3">
                            <Call size={16} className="[&>*]:stroke-primary-700" />
                            <p className="text-p1 text-grey-900">(+855) 12 345 678</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Message size={16} className="[&>*]:stroke-primary-700" />
                            <p className="text-p1 text-grey-900">nmcinfo@museum.com</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Location size={16} className="[&>*]:stroke-primary-700" />
                            <p className="text-p1 text-grey-900">STREET 123, PHNOM PENH</p>
                        </div>
                    </Innercard>
                    {/* Museum Approval */}
                    <Innercard className="gap-5">
                        <h6 className="text-s1 text-grey-900">Museum Approval</h6>
                        <div className="flex items-center gap-5">
                            <ConfirmApproval />
                            <ConfirmRequest />
                        </div>
                    </Innercard>
                </div>
            </div>

            {/* Google Map */}
            <Innercard className="space-y-5">
                <h5 className="text-h5 text-grey-900">Museum Location</h5>
                <div className="w-full h-[26rem] rounded-sm border border-grey-400 overflow-hidden">
                    <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.8046230935715!2d104.92657147452695!3d11.565859544137748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109514824227a9d%3A0xb8be437d2b4aa725!2sNational%20Museum%20of%20Cambodia!5e0!3m2!1sen!2skh!4v1747831834460!5m2!1sen!2skh" loading="lazy"></iframe>
                </div>
            </Innercard>
        </>
    );
}
