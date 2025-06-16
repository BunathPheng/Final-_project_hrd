import Innercard from '@/components/feature/card/inner-card';
import Maincard from '@/components/feature/card/main-card';
import { Breadcrumb } from '@/components/layout/breadcrumb'
import FileUpload from '@/components/ui/upload-file';
import { Call, Category2, I3Dcube, Layer, Location, Message } from 'iconsax-reactjs';
import Image from 'next/image';
import React, { JSX } from 'react'
import { UploadBanner } from './_components/upload-banner';
import { EditMuseum } from './_components/edit-museum';
import { EditTicket } from './_components/edit-ticket';
import { EditContact } from './_components/edit-contact';
import { EditLocation } from './_components/edit-location';
import { EditSchedule } from './_components/edit-schedule';
import { WebillForm } from './_components/webill-form';

const defaultImages = [
    {
        url: "https://image-tc.galaxy.tf/wijpeg-87c83dri3kglj836kubeiybcf/the-national-museum-3.jpg",
        name: "Landscape 1",
        size: "543 KB"
    },
    {
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/71/83/bc/photo1jpg.jpg?w=900&h=500&s=1",
        name: "Landscape 2",
        size: "788 KB"
    },
];

export default function MusuemPage(): JSX.Element {
    const breadcrumbs = ["Home", "Musuem"];

    return (
        <>
            <Breadcrumb main="Musuem Management" items={breadcrumbs} />
            <Maincard>
                {/* Museum Banner */}
                <div className="grid w-full bg-white shadow-600 relative overflow-hidden rounded-md">
                    <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center drop-shadow-600">
                        <h3 className="text-h3 text-white">National Museum of Cambodia</h3>
                    </div>
                    <div className="absolute right-5 bottom-5">
                        <UploadBanner />
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
                            <div className="flex w-full justify-end">
                                <EditMuseum />
                            </div>
                        </Innercard>

                        <div className="grid grid-cols-3 gap-7">
                            <Innercard className="gap-3">
                                <div className="flex items-center justify-center gap-2">
                                    <Category2 size={20} className="[&>*]:stroke-primary-700" />
                                    <p className="text-s1 text-grey-600">Category</p>
                                </div>
                                <p className="text-s1 text-grey-900 text-center">History</p>
                            </Innercard>
                            <Innercard className="gap-3">
                                <div className="flex items-center justify-center gap-2">
                                    <Layer size={20} className="[&>*]:stroke-primary-700" />
                                    <p className="text-s1 text-grey-600">Total Artifacts</p>
                                </div>
                                <p className="text-s1 text-grey-900 text-center">12,454</p>
                            </Innercard>
                            <Innercard className="gap-3">
                                <div className="flex items-center justify-center gap-2">
                                    <I3Dcube size={20} className="[&>*]:stroke-primary-700" />
                                    <p className="text-s1 text-grey-600">Total Zones</p>
                                </div>
                                <p className="text-s1 text-grey-900 text-center">12</p>
                            </Innercard>
                        </div>

                        {/* Upload Landscape */}
                        <Innercard>
                            <FileUpload
                                className="upload-landscape"
                                multiple={true}
                                maxFiles={10}
                                defaultImages={defaultImages}
                            />
                        </Innercard>
                    </div>
                    <div className="col-span-2 grid gap-7 content-start">
                        {/* Museum Schedule */}
                        <Innercard className="gap-5">
                            <h5 className="text-h5 text-grey-900">Museum Schedule</h5>
                            <div className="px-5 py-3 rounded-md border border-grey-400 grid gap-2">
                                <div className="flex w-full items-center justify-between">
                                    <p className="text-p1 text-grey-900">Tuesday - Saturday </p>
                                    <p className="text-p1 text-grey-900">
                                        <span className="text-primary-700">9</span> AM - <span className="text-primary-700">6</span> PM
                                    </p>
                                </div>
                                <div className="flex w-full items-center justify-between">
                                    <p className="text-p1 text-grey-900">Sunday - Monday </p>
                                    <p className="text-p1 text-primary-700">Closed</p>
                                </div>
                            </div>
                            <div className="flex w-full justify-end">
                                <EditSchedule />
                            </div>
                        </Innercard>
                        {/* Ticket Prices */}
                        <Innercard className="gap-5">
                            <h5 className="text-h5 text-grey-900">Ticket Prices</h5>
                            <div className="px-5 py-3 rounded-md border border-grey-400 grid gap-2">
                                <div className="flex w-full items-center justify-between">
                                    <p className="text-p1 text-grey-900">20,000 riels / $5.00</p>
                                    <p className="text-p1 text-grey-900">Foreigner</p>
                                </div>
                                <div className="flex w-full items-center justify-between">
                                    <p className="text-p1 text-grey-900">4,000 riels / $1.00</p>
                                    <p className="text-p1 text-grey-900">Local</p>
                                </div>
                            </div>
                            <div className="flex w-full justify-end">
                                <EditTicket />
                            </div>
                        </Innercard>

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
                            <div className="flex w-full justify-end">
                                <EditContact />
                            </div>
                        </Innercard>
                    </div>
                </div>

                {/* WeBill 365 */}
                <WebillForm />

                {/* Google Map */}
                <Innercard className="gap-5">
                    <h5 className="text-h5 text-grey-900">Museum Location</h5>
                    <div className="w-full h-[26rem] rounded-sm border border-grey-400 overflow-hidden">
                        <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.8046230935715!2d104.92657147452695!3d11.565859544137748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109514824227a9d%3A0xb8be437d2b4aa725!2sNational%20Museum%20of%20Cambodia!5e0!3m2!1sen!2skh!4v1747831834460!5m2!1sen!2skh" loading="lazy"></iframe>
                    </div>
                    <div className="flex w-full justify-end">
                        <EditLocation />
                    </div>
                </Innercard>
            </Maincard>
        </>
    )
}
