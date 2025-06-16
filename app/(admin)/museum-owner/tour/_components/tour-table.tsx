import { ArchiveAdd, InfoCircle, TickCircle, Timer1 } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { ConfirmTour } from "./confirm-tour";

/* eslint-disable @typescript-eslint/no-unused-expressions */
type TourProps = {
    id: number;
    name: string;
    image: string;
    price: number;
    status: string; // unpaid, request, paid
}

const tours: TourProps[] = [
    {
        id: 1,
        name: "Mengse",
        image: "/profile/man.webp",
        price: 85.00,
        status: "paid"
    },
    {
        id: 2,
        name: "Thireach",
        image: "/profile/man.webp",
        price: 65.00,
        status: "unpaid"
    },
    {
        id: 3,
        name: "Bunath",
        image: "/profile/man.webp",
        price: 55.00,
        status: "request"
    },
    {
        id: 4,
        name: "Tikea",
        image: "/profile/man.webp",
        price: 75.00,
        status: "paid"
    },
    {
        id: 5,
        name: "Ny Fong",
        image: "/profile/man.webp",
        price: 45.00,
        status: "unpaid"
    },
    {
        id: 6,
        name: "Thida",
        image: "/profile/man.webp",
        price: 40.00,
        status: "request"
    },
    {
        id: 7,
        name: "Reaksmey",
        image: "/profile/man.webp",
        price: 120.00,
        status: "paid"
    },
    {
        id: 8,
        name: "Mengsrong",
        image: "/profile/man.webp",
        price: 90.00,
        status: "unpaid"
    },
    {
        id: 9,
        name: "Kanha",
        image: "/profile/man.webp",
        price: 95.00,
        status: "request"
    },
    {
        id: 10,
        name: "Maneth",
        image: "/profile/man.webp",
        price: 35.00,
        status: "paid"
    }
];

export const TourTable: React.FC<{ tab: string; }> = ({ tab }) => {

    const tourData: TourProps[] = [];
    Array.from(tours).forEach(item => {
        if (tab == "request")
            item.status == "request" && tourData.push(item);
        else if (tab == "unpaid")
            item.status == "unpaid" && tourData.push(item);
        else if (tab == "paid")
            item.status == "paid" && tourData.push(item);
        else tourData.push(item);
    })

    return (
        <>
            <table className="my-5">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th className="text-left">VISITOR NAME</th>
                        <th>TOUR PRICE</th>
                        <th>TOUR STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {tourData && tourData.map((item, idx) => (
                        <tr key={item.id}>
                            <td className="text-center">{idx + 1}</td>
                            <td className="inline-flex h-full items-center gap-2">
                                <Image
                                    src={item.image}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-grey-100"
                                    width={25}
                                    height={25}
                                    alt={item.name}
                                />
                                <span className="text-p1">{item.name}</span>
                            </td>
                            <td className="text-center">${item.price}</td>
                            <td className="text-center">
                                {item.status == "request" && (
                                    <div className="flex items-center gap-2 w-fit mx-auto rounded-full px-3 py-1.5 bg-light-blue">
                                        <ArchiveAdd size={20} className="[&>*]:stroke-blue" />
                                        <span className="text-p3 text-blue">Request</span>
                                    </div>
                                )}
                                {item.status == "unpaid" && (
                                    <div className="flex items-center gap-2 w-fit mx-auto rounded-full px-3 py-1.5 bg-yellow/25">
                                        <Timer1 size={20} className="[&>*]:stroke-yellow" />
                                        <span className="text-p3 text-yellow">Unpaid</span>
                                    </div>
                                )}
                                {item.status == "paid" && (
                                    <div className="flex items-center gap-2 w-fit mx-auto rounded-full px-3 py-1.5 bg-light-green">
                                        <TickCircle size={20} className="[&>*]:stroke-green" />
                                        <span className="text-p3 text-green">Paid</span>
                                    </div>
                                )}
                            </td>
                            <td className="text-center">
                                <div className="flex h-full gap-1 items-center justify-center">
                                    {item.status == "request" &&
                                        <ConfirmTour />
                                    }
                                    <Link href={`/museum-owner/tour/${item.id}?status=${item.status}`} className="flex w-fit">
                                        <InfoCircle size={24} className="[&>*]:stroke-primary-700" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
