// import Innercard from '@/components/feature/card/inner-card';
import Maincard from '@/components/feature/card/main-card';
import TrendCard from '@/components/feature/card/trend-card';
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Profile2User, Ticket } from 'iconsax-reactjs';
import React from 'react'
import { ChartOverview } from './_components/chart-overview';
import { ChartArea } from 'lucide-react';
import Link from 'next/link';
import Innercard from '@/components/feature/card/inner-card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { apiRequest } from '@/utils/api';
import { ApiResponse, PageProps } from '@/types/response';
import { OverviewProps } from '@/types/overview';
import { FollowerProps } from '@/types/follower-chart';
import { BookingProps } from '@/types/booking-chart';
import { TopvisitorsProps } from '@/types/topvisitor';
import imageDefault from "../../../../public/profile/default.jpg";

export default async function OverviewPage({ searchParams }: PageProps) {
    const breadcrumbs = ["Home", "Overview"];
    const resolvedSearchParams = await searchParams;
    // const suspenseKey = `${resolvedSearchParams?.sort || 'all'}`;
    const year = resolvedSearchParams?.sort || "";
    const yearBooking = resolvedSearchParams?.booking || "";
    const response = await apiRequest<ApiResponse<OverviewProps>>(`/favorites/stat`);
    const responseChart = await apiRequest<ApiResponse<FollowerProps[]>>(`/chart/follower?yearFilter=${year}`);
    const responseChartBooking = await apiRequest<ApiResponse<BookingProps[]>>(`/chart/booking?yearFilter=${yearBooking}`);
    const responseTopVisitor = await apiRequest<ApiResponse<TopvisitorsProps[]>>(`/visitors/museum/top-visitor`);
    const overviews = response?.payload || null;
    const followers = responseChart?.payload || [];
    const bookings = responseChartBooking?.payload || [];
    const topVisitors = responseTopVisitor?.payload || [];
    console.log("TopVisitors", topVisitors)
    return (
        <>
            <Breadcrumb main="Dashboard" items={breadcrumbs} />
            <Maincard>
                <div className="grid w-full grid-cols-3 gap-7">
                    <TrendCard title="Total Followers" amount={overviews?.totalFollowers?.value || 0} icon={<Profile2User />} percent={overviews?.totalFollowers?.percentageChange || 0} />
                    <TrendCard title="New Followers" amount={overviews?.newFollowers?.value || 0} icon={<Profile2User />} percent={overviews?.newFollowers?.percentageChange || 0} />
                    <TrendCard title="New Bookings" amount={overviews?.newBooking?.value || 0} icon={<Ticket />} percent={overviews?.newBooking?.percentageChange || 0} />
                </div>

                {/* Chart */}
                <ChartOverview followerData={followers || []} bookingData={bookings || []} />

                {/* Top Visitor Table */}
                <Innercard>
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex gap-2">
                            <ChartArea size={20} className="stroke-grey-200 stroke-2" />
                            <h6 className="text-s2 text-grey-900">Top Visitors</h6>
                        </div>
                        <Link href={"/museum-owner/visitor"}>
                            <Button size={'sm'}>View all</Button>
                        </Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th className="text-left">VISITOR NAME</th>
                                <th className="text-left">EMAIL</th>
                                <th>GENDER</th>
                                <th>CONTACT NUMBER</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topVisitors.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="inline-flex h-full items-center gap-2">
                                        <Image
                                            src={item?.profileImageLink || imageDefault}
                                            className="w-8 h-8 rounded-full object-cover border-2 border-grey-100"
                                            width={25}
                                            height={25}
                                            alt="Picture"
                                        />
                                        <span className="text-p1">{item?.fullName}</span>
                                    </td>
                                    <td>{item?.appUserRegister?.email}</td>
                                    <td className="text-center">{item?.gender || "N/A"}</td>
                                    <td className="text-center">{item?.contactNumber || "N/A"}</td>
                                </tr>

                            ))}

                        </tbody>
                    </table>
                </Innercard>
            </Maincard>
        </>
    )
}
