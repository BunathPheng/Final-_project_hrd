import Innercard from "@/components/feature/card/inner-card";
import TrendCard from "@/components/feature/card/trend-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Call, Location, Message, Profile2User, TickCircle, Ticket } from "iconsax-reactjs";
import Image from "next/image";
import { FC } from "react";

export const MuseumApprove: FC = () => {
    return (
        <>
            {/* Museum Banner */}
            <div className="grid w-full bg-white shadow-600 relative overflow-hidden rounded-md">
                <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center drop-shadow-600">
                    <h3 className="text-h3 text-white">National Museum of Cambodia</h3>
                </div>
                <Image src={"/banner/national-museum.webp"} className="w-full rounded-md h-62 object-center object-cover" width={1440} height={400} alt="Museum Banner" />
            </div>

            {/* Trend Card */}
            <div className="grid w-full grid-cols-3 gap-7">
                <TrendCard title="Total Followers" amount={1563} icon={<Profile2User />} percent={15} />
                <TrendCard title="New Followers" amount={48} icon={<Profile2User />} percent={-10} />
                <TrendCard title="New Bookings" amount={15} icon={<Ticket />} percent={23.5} />
            </div>

            <div className="grid grid-cols-5 w-full gap-7 content-start">
                <div className="col-span-3 grid gap-7 content-start">
                    {/* About the Museum */}
                    <Innercard className="gap-5">
                        <h6 className="text-s1 text-grey-900">About the Museum</h6>
                        <p className="text-p1 text-grey-800">Founded in 1897, the National Museum of Art & History houses over 200,000 artifacts spanning five millennia of human history. Our carefully curated exhibits showcase artistic achievements, technological innovations, and cultural treasures from civilizations around the world.</p>
                        <div className="flex gap-7 w-full">
                            <dl className="flex gap-2">
                                <dt className="text-s2 text-grey-900">Category:</dt>
                                <dd className="text-p2 text-grey-600">History</dd>
                            </dl>
                            <dl className="flex gap-2">
                                <dt className="text-s2 text-grey-900">Zones:</dt>
                                <dd className="text-p2 text-primary-700">13</dd>
                            </dl>
                            <dl className="flex gap-2">
                                <dt className="text-s2 text-grey-900">Artifacts:</dt>
                                <dd className="text-p2 text-primary-700">156</dd>
                            </dl>
                        </div>
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
                        <div className="flex items-center gap-2 rounded-md w-fit px-3 py-1.5 bg-light-green">
                            <TickCircle size={20} className="[&>*]:fill-green [&>*:first-child]:stroke-green [&>*]:stroke-white" />
                            <span className="text-p3 text-grey-900">Approved</span>
                        </div>
                    </Innercard>
                    {/* Events */}
                    <Innercard className="gap-5">
                        <h5 className="text-h5 text-grey-900">Events</h5>
                        <div className="rounded-md border border-grey-400 p-5 grid w-full gap-5">
                            <h6 className="text-s1 text-grey-900">Renaissance Masters</h6>
                            <span className="text-p5 text-grey-600">April 15 - August 30, 2025</span>
                            <p className="text-p1 text-grey-800">Experience the brilliance of Leonardo, Michelangelo, Raphael, and their contemporaries through 60 original works, including rarely displayed pieces on loan from European collections.</p>
                            <div className="ml-auto w-fit rounded-md bg-primary-50 px-6 py-3">
                                <span className="text-p2 text-primary-700">Thun Mengse</span>
                            </div>
                        </div>
                        <div className="rounded-md border border-grey-400 p-5 grid w-full gap-5">
                            <h6 className="text-s1 text-grey-900">Renaissance Masters</h6>
                            <span className="text-p5 text-grey-600">April 15 - August 30, 2025</span>
                            <p className="text-p1 text-grey-800">Experience the brilliance of Leonardo, Michelangelo, Raphael, and their contemporaries through 60 original works, including rarely displayed pieces on loan from European collections.</p>
                            <div className="ml-auto w-fit rounded-md bg-primary-50 px-6 py-3">
                                <span className="text-p2 text-primary-700">Pheng Bunath</span>
                            </div>
                        </div>
                    </Innercard>
                    {/* Message to Museum */}
                    <Innercard className="gap-5">
                        <h5 className="text-h5 text-grey-900">Message to Museum</h5>
                        <Input placeholder="Send direct message to museum" />
                        <div className="ml-auto">
                            <Button>
                                <Message size={24} color="#fff" />
                                Send Message
                            </Button>
                        </div>
                    </Innercard>
                </div>
                <div className="col-span-2 grid gap-7 content-start">
                    {/* Booking Analytics */}
                    <Innercard className="gap-5">
                        <h5 className="text-h5 text-grey-900">Booking Analytics</h5>
                        {/* Recent Bookings */}
                        <h6 className="text-p2 text-grey-600">Recent Bookings</h6>
                        <div className="grid w-full gap-5">
                            {/* Local */}
                            <div className="flex items-center justify-between w-full gap-5 rounded-md p-5 bg-slate-light">
                                <div className="grid gap-2">
                                    <p className="text-p1 text-grey-900">Local Visitors</p>
                                    <span className="text-p3 text-grey-600">May 25, 2025</span>
                                </div>
                                <p className="text-p2 text-grey-900"><span className="text-primary-700">12</span> visitors</p>
                            </div>
                            {/* Foreign */}
                            <div className="flex items-center justify-between w-full gap-5 rounded-md p-5 bg-slate-light">
                                <div className="grid gap-2">
                                    <p className="text-p1 text-grey-900">Foreigner Visitors</p>
                                    <span className="text-p3 text-grey-600">May 24, 2025</span>
                                </div>
                                <p className="text-p2 text-grey-900"><span className="text-primary-700">12</span> visitors</p>
                            </div>
                            {/* Tour */}
                            <div className="flex items-center justify-between w-full gap-5 rounded-md p-5 bg-slate-light">
                                <div className="grid gap-2">
                                    <p className="text-p1 text-grey-900">Tour Visitors</p>
                                    <span className="text-p3 text-grey-600">May 22, 2025</span>
                                </div>
                                <p className="text-p2 text-grey-900"><span className="text-primary-700">12</span> visitors</p>
                            </div>
                        </div>

                        {/* Total Booking types */}
                        <h6 className="text-p2 text-grey-600">Total Booking types</h6>
                        <div className="grid grid-cols-2 gap-5 w-full">
                            <div className="bg-slate-light rounded-md px-5 py-3 flex flex-col items-center justify-center gap-2">
                                <p className="text-p2 text-grey-600">Local</p>
                                <span className="text-h6 text-primary-700">1245</span>
                            </div>
                            <div className="bg-slate-light rounded-md px-5 py-3 flex flex-col items-center justify-center gap-2">
                                <p className="text-p2 text-grey-600">Foreigner</p>
                                <span className="text-h6 text-primary-700">325</span>
                            </div>
                        </div>

                        {/* Total Booking */}
                        <h6 className="text-p2 text-grey-600">Total Booking</h6>
                        <div className="grid grid-cols-2 gap-5 w-full">
                            <div className="bg-slate-light rounded-md px-5 py-3 flex flex-col items-center justify-center gap-2">
                                <p className="text-p2 text-grey-600">Tour</p>
                                <span className="text-h6 text-primary-700">15</span>
                            </div>
                            <div className="bg-slate-light rounded-md px-5 py-3 flex flex-col items-center justify-center gap-2">
                                <p className="text-p2 text-grey-600">Individual</p>
                                <span className="text-h6 text-primary-700">225</span>
                            </div>
                        </div>
                    </Innercard>

                    {/* Schedule & Price */}
                    <Innercard className="gap-5">
                        <h5 className="text-h5 text-grey-900">Schedule & Price</h5>
                        {/* Opening Hours */}
                        <h6 className="text-p2 text-grey-600">Opening Hours</h6>
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
                        {/* Ticket Prices */}
                        <h6 className="text-p2 text-grey-600">Ticket Prices</h6>
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
                    </Innercard>
                </div>
            </div>

            {/* Google Map */}
            <Innercard className="gap-5">
                <h5 className="text-h5 text-grey-900">Museum Location</h5>
                <div className="w-full h-[26rem] rounded-sm border border-grey-400 overflow-hidden">
                    <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.8046230935715!2d104.92657147452695!3d11.565859544137748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109514824227a9d%3A0xb8be437d2b4aa725!2sNational%20Museum%20of%20Cambodia!5e0!3m2!1sen!2skh!4v1747831834460!5m2!1sen!2skh" loading="lazy"></iframe>
                </div>
            </Innercard>
        </>
    );
}
