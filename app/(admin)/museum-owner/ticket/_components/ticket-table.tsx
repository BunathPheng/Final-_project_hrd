import Innercard from "@/components/feature/card/inner-card";
import { SearchTable } from "@/components/feature/input/search-table";
import Pagination from "@/components/feature/lib/pagination";
import { Showing } from "@/components/feature/lib/showing";
import { Ticket } from "iconsax-reactjs";
import Image from "next/image";
import { FC } from "react";

type TicketProps = {
    id: number;
    name: string;
    ticketPrice: string;
    ticketType: string;
    ticketStatus: string;
    bookingDate: string;
    expiredDate: string;
}

const ticketsData: TicketProps[] = [
    {
        id: 1,
        name: "Bunath",
        ticketPrice: "$25.00",
        ticketType: "Local",
        ticketStatus: "Used",
        bookingDate: "March 12 , 2025",
        expiredDate: "March 15 , 2025"
    },
    {
        id: 2,
        name: "Bunath",
        ticketPrice: "$37.00",
        ticketType: "Local",
        ticketStatus: "Used",
        bookingDate: "March 12 , 2025",
        expiredDate: "March 15 , 2025"
    },
    {
        id: 3,
        name: "Bunath",
        ticketPrice: "$22.00",
        ticketType: "Local",
        ticketStatus: "Used",
        bookingDate: "March 12 , 2025",
        expiredDate: "March 15 , 2025"
    },
    {
        id: 4,
        name: "Bunath",
        ticketPrice: "$30.00",
        ticketType: "Foreigner",
        ticketStatus: "Used",
        bookingDate: "March 12 , 2025",
        expiredDate: "March 15 , 2025"
    },
    {
        id: 5,
        name: "Bunath",
        ticketPrice: "$37.00",
        ticketType: "Local",
        ticketStatus: "Used",
        bookingDate: "March 12 , 2025",
        expiredDate: "March 15 , 2025"
    },
    {
        id: 6,
        name: "Bunath",
        ticketPrice: "$12.00",
        ticketType: "Foreigner",
        ticketStatus: "Used",
        bookingDate: "March 12 , 2025",
        expiredDate: "March 15 , 2025"
    },
    {
        id: 7,
        name: "Bunath",
        ticketPrice: "$37.00",
        ticketType: "Local",
        ticketStatus: "Used",
        bookingDate: "March 12 , 2025",
        expiredDate: "March 15 , 2025"
    },
    {
        id: 8,
        name: "Bunath",
        ticketPrice: "$13.00",
        ticketType: "Local",
        ticketStatus: "Used",
        bookingDate: "March 12 , 2025",
        expiredDate: "March 15 , 2025"
    },
    {
        id: 9,
        name: "Bunath",
        ticketPrice: "$56.00",
        ticketType: "Foreigner",
        ticketStatus: "Used",
        bookingDate: "March 12 , 2025",
        expiredDate: "March 15 , 2025"
    },
    {
        id: 10,
        name: "Bunath",
        ticketPrice: "$27.00",
        ticketType: "Local",
        ticketStatus: "Used",
        bookingDate: "March 12 , 2025",
        expiredDate: "March 15 , 2025"
    },
];

export const TicketTable: FC = () => {
    return (
        <Innercard>
            <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <Ticket
                        size={24}
                        className="[&>*]:stroke-primary-700"
                    />
                    <h4 className="text-s1 text-grey-900">Ticket Information</h4>
                </div>
                <SearchTable />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th className="text-left">VISITOR NAME</th>
                        <th>TICKET PRICE</th>
                        <th>TICKET TYPE</th>
                        <th>TICKET STATUS</th>
                        <th>BOOKING DATE</th>
                        <th>EXPIRED DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketsData && ticketsData.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="inline-flex h-full items-center gap-2">
                                <Image
                                    src={"/profile/man.webp"}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-grey-100"
                                    width={25}
                                    height={25}
                                    alt="Picture"
                                />
                                <span className="text-p1">{item.name}</span>
                            </td>
                            <td className="text-center">{item.ticketPrice}</td>
                            <td className="text-center">{item.ticketType}</td>
                            <td className="text-center text-primary-700">{item.ticketStatus}</td>
                            <td className="text-center">{item.bookingDate}</td>
                            <td className="text-center">{item.expiredDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex w-full justify-between items-center gap-5 pt-5 border-t border-grey-100">
                <Pagination />
                <Showing />
            </div>
        </Innercard>
    );
}
