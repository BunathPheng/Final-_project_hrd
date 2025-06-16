import Innercard from '@/components/feature/card/inner-card';
import Maincard from '@/components/feature/card/main-card';
import TrendCard from '@/components/feature/card/trend-card';
import { SearchTable } from '@/components/feature/input/search-table';
import Pagination from '@/components/feature/lib/pagination';
import { Showing } from '@/components/feature/lib/showing';
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { InfoCircle, Profile2User, Ticket } from 'iconsax-reactjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { JSX } from 'react'

export default async function VisitorAdminPage(): Promise<JSX.Element> {
    const breadcrumbs = ["Home", "Visitor"];

    return (
        <>
            <Breadcrumb main="User Management" items={breadcrumbs} />
            <Maincard>
                <div className="grid w-full grid-cols-3 gap-7">
                    <TrendCard title="New Visitors" amount={166} icon={<Profile2User />} percent={-5} />
                    <TrendCard title="Total Visitors" amount={48} icon={<Profile2User />} percent={10} />
                    <TrendCard title="Total Bookings" amount={15} icon={<Ticket />} percent={5.5} />
                </div>

                <Innercard className="space-y-5">
                    <div className="flex items-center justify-between w-full gap-5">
                        <div className="flex gap-2 items-center">
                            <Profile2User size={24} className="[&>*]:stroke-primary-700" />
                            <h4 className="text-s1 text-grey-900">Visitor</h4>
                        </div>
                        <SearchTable />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th className="text-left">NAME</th>
                                <th className="text-left">EMAIL</th>
                                <th>TOTAL BOOKINGS</th>
                                <th>TOTAL TICKETS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 10 }, (_, index) => (
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
                                        <span className="text-p1">Bunath</span>
                                    </td>
                                    <td>bunnath{index + 1}@gmail.com</td>
                                    <td className="text-center">{Math.floor(Math.random() * 10) + 1}</td>
                                    <td className="text-center">{Math.floor(Math.random() * 100) + 1}</td>
                                    <td className="text-center">
                                        <Link href={`/admin/visitor/${index + 1}`} className="mx-auto flex w-fit">
                                            <InfoCircle size={24} className="[&>*]:stroke-primary-700" />
                                        </Link>
                                    </td>
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
