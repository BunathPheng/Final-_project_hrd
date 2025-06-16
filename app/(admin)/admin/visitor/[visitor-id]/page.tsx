import Innercard from '@/components/feature/card/inner-card';
import Maincard from '@/components/feature/card/main-card';
import TrendCard from '@/components/feature/card/trend-card';
import { SearchTable } from '@/components/feature/input/search-table';
import Pagination from '@/components/feature/lib/pagination';
import { Showing } from '@/components/feature/lib/showing';
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Bank, Ticket } from 'iconsax-reactjs';
import React, { JSX } from 'react'
import { VisitorInfo } from '../_components/visitor-info';

export default function VisitorPage(): JSX.Element {
    const breadcrumbs = ["Home", "Visitor"];

    return (
        <>
            <Breadcrumb main="User Management" items={breadcrumbs} />
            <Maincard>
                <div className="grid w-full grid-cols-3 gap-7">
                    <Innercard className="col-span-2">
                        <VisitorInfo />
                    </Innercard>
                    <div className="grid gap-7">
                        <TrendCard title="Total Tickets" amount={48} icon={<Ticket />} percent={10} />
                        <TrendCard title="Total Bookings" amount={15} icon={<Ticket />} percent={5.5} />
                    </div>
                </div>

                <Innercard className="space-y-5">
                    <div className="flex items-center justify-between w-full gap-5">
                        <div className="flex gap-2 items-center">
                            <Bank size={24} className="[&>*]:stroke-primary-700" />
                            <h4 className="text-s1 text-grey-900">Booked Musueum</h4>
                        </div>
                        <SearchTable />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th className="text-left">MUSEUM NAME</th>
                                <th>TICKET TYPE</th>
                                <th>BOOKING TYPE</th>
                                <th>BOOKING DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 10 }, (_, index) => (
                                <tr key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="inline-flex h-full items-center gap-2">
                                        National Museum of Cambodia
                                    </td>
                                    <td className="text-center">Local</td>
                                    <td className="text-center">Individual</td>
                                    <td className="text-center">May 12 , 2025</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex w-full justify-between items-center gap-5 pt-5 border-t border-grey-100">
                        <Pagination />
                        <Showing />
                    </div>
                </Innercard>
            </Maincard>
        </>
    )
}
