"use client"
import Innercard from "@/components/feature/card/inner-card";
import TrendCard from "@/components/feature/card/trend-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoneyRecive, Ticket } from "iconsax-reactjs";
import { ChartArea } from "lucide-react";
import { FC } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ticketData = [
    { month: 'Jan', local: 320, foreigner: 180 },
    { month: 'Feb', local: 240, foreigner: 330 },
    { month: 'Mar', local: 160, foreigner: 80 },
    { month: 'Apr', local: 320, foreigner: 410 },
    { month: 'May', local: 80, foreigner: 400 },
    { month: 'Jun', local: 320, foreigner: 330 },
    { month: 'Jul', local: 320, foreigner: 180 },
    { month: 'Aug', local: 240, foreigner: 330 },
    { month: 'Sep', local: 160, foreigner: 80 },
    { month: 'Oct', local: 320, foreigner: 410 },
    { month: 'Nov', local: 80, foreigner: 400 },
    { month: 'Dec', local: 320, foreigner: 330 }
];

export const TicketChart: FC = () => {
    return (
        <div className="grid grid-cols-3 gap-7">
            {/* Bar Chart */}
            <Innercard className="col-span-2">
                <div className="mb-5 flex items-center justify-between">
                    <div className="flex gap-2">
                        <ChartArea size={20} className="stroke-grey-200 stroke-2" />
                        <h6 className="text-s2 text-grey-900">Booking Analytics</h6>
                    </div>
                    <div className="">
                        <Select name="booking">
                            <SelectTrigger className="w-full !h-10">
                                <SelectValue placeholder="This Year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">This Year</SelectItem>
                                <SelectItem value="2">Last Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ticketData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid vertical={false} stroke='#dadada' />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                dx={-15}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const total = payload
                                            .filter(entry => entry.value !== undefined)
                                            .reduce((sum, entry) => sum + parseFloat(entry.value as string), 0);
                                        return (
                                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                                                <p className="font-semibold text-gray-800 mb-2">{label}</p>
                                                {payload.map((entry, index) => (
                                                    <div key={index} className="flex items-center gap-2 mb-1">
                                                        <div
                                                            className="w-3 h-3 rounded-sm"
                                                            style={{ backgroundColor: entry.color }}
                                                        />
                                                        <span className="text-sm text-gray-600">
                                                            {entry.dataKey === 'local' ? 'Local' : 'Foreigner'}:
                                                            <span className="font-medium ml-1">{(entry.value || 0).toLocaleString()}</span>
                                                        </span>
                                                    </div>
                                                ))}
                                                <div className="border-t pt-2 mt-2">
                                                    <span className="text-sm font-semibold text-gray-800">
                                                        Total: {total.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar
                                dataKey="local"
                                stackId="a"
                                fill="#B50000"
                            />
                            <Bar
                                dataKey="foreigner"
                                stackId="a"
                                fill="#FFE6E6"
                            />
                        </BarChart>
                    </ResponsiveContainer >
                </div >
            </Innercard >

            <div className="w-full grid gap-7">
                <TrendCard title="Total Sales" amount={63} icon={<MoneyRecive />} percent={15} />
                <TrendCard title="Tickets Sold" amount={548} icon={<Ticket />} percent={-10} />
            </div>
        </div>
    )
}
