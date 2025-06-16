/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import { Call, Clock, TickCircle, Timer1 } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

type MuseumCardProps = {
    id: number;
    title: string;
    description: string;
    image: string;
    createdDate: string;
    phoneNumber: string;
    status: string;
}

const museums: MuseumCardProps[] = [
    {
        id: 1,
        title: "Ancient Art Museum",
        description: "Explore a vast collection of ancient artifacts and sculptures.",
        image: "/card/event-1.jpg",
        createdDate: "2023-01-10",
        phoneNumber: "97 101 0001",
        status: "request",
    },
    {
        id: 2,
        title: "Natural History Center",
        description: "Discover the wonders of nature through interactive exhibits.",
        image: "/card/event-2.jpg",
        createdDate: "2022-11-22",
        phoneNumber: "97 101 0002",
        status: "approve",
    },
    {
        id: 3,
        title: "Modern Art Gallery",
        description: "A dynamic space for contemporary visual arts.",
        image: "/card/event-3.jpg",
        createdDate: "2021-06-15",
        phoneNumber: "97 101 0003",
        status: "request",
    },
    {
        id: 4,
        title: "Science Discovery Hall",
        description: "Interactive science exhibits for all ages.",
        image: "/card/zone-1.jpg",
        createdDate: "2024-03-08",
        phoneNumber: "97 101 0004",
        status: "request",
    },
    {
        id: 5,
        title: "War History Museum",
        description: "Preserving the memory of conflicts and heroes.",
        image: "/card/zone-2.jpg",
        createdDate: "2020-09-30",
        phoneNumber: "97 101 0005",
        status: "approve",
    },
    {
        id: 6,
        title: "Children's Innovation Hub",
        description: "A fun and educational experience for young minds.",
        image: "/card/zone-3.jpg",
        createdDate: "2023-07-12",
        phoneNumber: "97 101 0006",
        status: "request",
    },
    {
        id: 7,
        title: "Cultural Heritage Pavilion",
        description: "Celebrating traditions and culture from around the world.",
        image: "/card/zone-4.jpg",
        createdDate: "2019-12-05",
        phoneNumber: "97 101 0007",
        status: "request",
    },
    {
        id: 8,
        title: "Space Exploration Museum",
        description: "Journey through space with immersive exhibits.",
        image: "/card/event-2.jpg",
        createdDate: "2022-04-17",
        phoneNumber: "97 101 0008",
        status: "approve",
    },
    {
        id: 9,
        title: "Historical Archives Hall",
        description: "Dive into historical records and rare manuscripts.",
        image: "/card/zone-1.jpg",
        createdDate: "2021-01-22",
        phoneNumber: "97 101 0009",
        status: "request",
    },
    {
        id: 10,
        title: "Innovation & Tech Exhibit",
        description: "Showcasing the future of technology and design.",
        image: "/card/zone-4.jpg",
        createdDate: "2023-10-01",
        phoneNumber: "97 101 0010",
        status: "request",
    },
];


export const MuseumCard: FC = () => {
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab') || "all";

    const museumData: MuseumCardProps[] = [];
    Array.from(museums).forEach(item => {
        if (currentTab == "request")
            item.status == "request" && museumData.push(item);
        else if (currentTab == "approve")
            item.status == "approve" && museumData.push(item);
        else museumData.push(item);
    })

    return (
        <div className="grid grid-cols-2 w-full gap-5 mt-7">
            {museumData && museumData.map(item => (
                <Link key={item.id} href={`/admin/museum/${item.id}?status=${item.status}`} className="w-full rounded-md border border-grey-100 flex gap-5 p-5 items-start">
                    <Image src={item.image} className="rounded-md w-45 h-52 object-cover" width={180} height={200} alt={item.title} />
                    <div className="grow-1 grid gap-3">
                        <h6 className="text-h6 text-grey-900 line-clamp-1">{item.title}</h6>
                        <p className="text-p1 text-grey-800 line-clamp-2">{item.description}</p>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-700 to-transparent"></div>
                        <div className="flex gap-2 w-full">
                            <Clock size={18} className="[&>*]:stroke-primary-700" />
                            <dl className="flex gap-2">
                                <dt className="text-p4 text-grey-900">Created Date:</dt>
                                <dd className="text-p4 text-primary-700">{item.createdDate}</dd>
                            </dl>
                        </div>
                        <div className="flex gap-2 w-full">
                            <Call size={18} className="[&>*]:stroke-primary-700" />
                            <dl className="flex gap-2">
                                <dt className="text-p4 text-grey-900">Tel:</dt>
                                <dd className="text-p4 text-primary-700">
                                    <span>(+855) </span>
                                    <span className="text-grey-900">{item.phoneNumber}</span>
                                </dd>
                            </dl>
                        </div>
                        <div className="flex w-full justify-end">
                            {item.status == "approve" && (
                                <div className="flex items-center gap-2 rounded-md px-3 py-1.5 bg-light-green">
                                    <TickCircle size={20} className="[&>*]:fill-green [&>*:first-child]:stroke-green [&>*]:stroke-white" />
                                    <span className="text-p3 text-grey-900">Approved</span>
                                </div>
                            )}
                            {item.status == "request" && (
                                <div className="flex items-center gap-2 rounded-md px-3 py-1.5 bg-yellow/30">
                                    <Timer1 size={20} className="[&>*]:stroke-yellow" />
                                    <span className="text-p3 text-grey-900">Pending</span>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
