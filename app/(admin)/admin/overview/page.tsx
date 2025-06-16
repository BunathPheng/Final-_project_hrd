// import Innercard from '@/components/feature/card/inner-card';
import Maincard from '@/components/feature/card/main-card';
import TrendCard from '@/components/feature/card/trend-card';
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { InfoCircle, Profile2User, Ticket } from 'iconsax-reactjs';
import React, { JSX } from 'react'
import { ChartOverview } from './_components/chart-overview';
import { ChartArea } from 'lucide-react';
import Link from 'next/link';
import Innercard from '@/components/feature/card/inner-card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function OverviewPage(): JSX.Element {
    const breadcrumbs = ["Home", "Overview"];

    return (
        <>
            <Breadcrumb main="Dashboard" items={breadcrumbs} />
            <Maincard>
                <div className="grid w-full grid-cols-3 gap-7">
                    <TrendCard title="Total Followers" amount={1563} icon={<Profile2User />} percent={15} />
                    <TrendCard title="New Followers" amount={48} icon={<Profile2User />} percent={-10} />
                    <TrendCard title="New Bookings" amount={15} icon={<Ticket />} percent={23.5} />
                </div>

                {/* Chart */}
                <ChartOverview />

                {/* Top Visitor Table */}
                <Innercard>
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex gap-2">
                            <ChartArea size={20} className="stroke-grey-200 stroke-2" />
                            <h6 className="text-s2 text-grey-900">Top Visitors</h6>
                        </div>
                        <Link href={"/admin/visitor"}>
                            <Button size={'sm'}>View all</Button>
                        </Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th className="text-left">NAME</th>
                                <th className="text-left">EMAIL</th>
                                <th>TOTAL BOOKINGS</th>
                                <th>TOTAL TICKETS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 5 }, (_, index) => (
                                <tr key={index}>
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
                </Innercard>
            </Maincard>
        </>
    )
}
