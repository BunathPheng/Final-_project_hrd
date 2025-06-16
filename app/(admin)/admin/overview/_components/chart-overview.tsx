/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Innercard from '@/components/feature/card/inner-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartArea } from 'lucide-react';
import React from 'react';
import { PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Area, AreaChart, Tooltip, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample data that matches the trend pattern from your image
const followersData = [
    { month: "Jan", followers: 600 },
    { month: "Feb", followers: 720 },
    { month: "Mar", followers: 250 },
    { month: "Apr", followers: 620 },
    { month: "May", followers: 140 },
    { month: "Jun", followers: 180 },
    { month: "Jul", followers: 350 },
    { month: "Aug", followers: 420 },
    { month: "Sep", followers: 480 },
    { month: "Oct", followers: 520 },
    { month: "Nov", followers: 320 },
    { month: "Dec", followers: 150 }
];

const chartData = [
    { name: "Pending", value: 1500, fill: "#b50000" }, // Dark red
    { name: "Approved", value: 500, fill: "#ffe6e6" }, // Light red/pink
];

const chartConfig = {
    value: {
        label: "Museums",
    },
    pending: {
        label: "Pending",
        color: "#b50000",
    },
    approved: {
        label: "Approved",
        color: "#ffe6e6",
    },
} satisfies ChartConfig;

const totalMuseums = chartData.reduce((acc, curr) => acc + curr.value, 0);

interface TooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
                <p className="text-sm font-medium text-gray-900">{`${label}`}</p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium text-red-600">{`Followers: ${payload[0].value.toLocaleString()}`}</span>
                </p>
            </div>
        );
    }
    return null;
};

export const ChartOverview = () => {
    return (
        <div className="grid grid-cols-5 gap-7">
            {/* Area Chart */}
            <Innercard className="col-span-3">
                <div className="mb-5 flex items-center justify-between">
                    <div className="flex gap-2">
                        <ChartArea size={20} className="stroke-grey-200 stroke-2" />
                        <h6 className="text-s2 text-grey-900">Followers Trend</h6>
                    </div>
                    <div className="">
                        <Select name="follower">
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
                        <AreaChart data={followersData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="followersGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FFB0B0" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#FFB0B0" stopOpacity={0} />
                                </linearGradient>
                            </defs>
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
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="linear"
                                dataKey="followers"
                                stroke="#B50000"
                                strokeWidth={2}
                                fill="url(#followersGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Innercard>

            {/* Donut Chart */}
            <Innercard className="col-span-2">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <ChartArea size={20} className="stroke-grey-200 stroke-2" />
                        <h6 className="text-s2 text-grey-900">Museum Registration</h6>
                    </div>
                    <div className="">
                        <Select name="follower">
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
                <div className="mt-5 h-full flex flex-col items-center justify-start">
                    <div className="relative w-full h-full flex items-center justify-start">
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-square max-h-60 w-full max-w-60 mx-auto"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={2}
                                        dataKey="value"
                                        nameKey="name"
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                        {/* Center Text Overlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center pointer-events-none">
                            <div className="text-s1 text-grey-900">
                                {totalMuseums.toLocaleString()}
                            </div>
                            <div className="text-p1 text-grey-200">
                                Total museums
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-1 mt-5">
                    <div className="py-2 pl-5 border-l-4 border-primary-50 flex w-full justify-between">
                        <p className="text-p1 text-grey-900">Pending</p>
                        <div className="flex items-center gap-2">
                            <p className="text-p1 text-grey-900">500</p>
                            <span className="text-p3 text-grey-400">(25%)</span>
                        </div>
                    </div>
                    <div className="py-2 pl-5 border-l-4 border-primary-700 flex w-full justify-between">
                        <p className="text-p1 text-grey-900">Approved</p>
                        <div className="flex items-center gap-2">
                            <p className="text-p1 text-grey-900">1500</p>
                            <span className="text-p3 text-grey-400">(75%)</span>
                        </div>
                    </div>
                </div>
            </Innercard>
        </div >
    );
}
