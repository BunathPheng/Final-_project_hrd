import { BookingPopup } from "../dialog/booking-popup";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { SmartImage } from "../fallback/smart-image";


export type BookingHistoryProps = {
    bookingId: string;
    museumName:string;
    bookingType:string;
    totalPrice:string | 0;
    ticketStatus:string;
    banner:string | "";
    description:string | "";
}

type BookingHistoryComponentProps = {
    items: BookingHistoryProps[];
};

const BookingHistory: React.FC<BookingHistoryComponentProps> = ({ items }) => {
    return (
        <>
            <div className="grid lg:grid-cols-1 w-full gap-4 xl:gap-10">
                {items && items.map(item => (
                    <div key={item.bookingId} className=" max-w-full shrink-0 flex items-center  bg-white rounded-[10px] shadow-sm ">
                        {/* Image Section */}
                         <div className="relative">
                        <SmartImage
                            src={item?.banner}
                            alt={item?.museumName || ""}
                            className="max-w-64 h-45 object-cover"
                            width={500}
                            height={300}
                            showSkeleton

                        />
                        </div>

                        {/* Content Section */}

                        <div className="p-5">
                            {/* Dynamic Title */}
                            <div className="">
                                <h2 className="text-h5 text-grey-900 mb-2" >{item?.museumName|| ""}</h2>
                                {/* Description */}
                                <p className="text-p3 text-grey-700 mb-6 line-clamp-2 w-1/2">{item?.description}</p>
                            </div>
                            <div className="flex gap-4">
                                <Link href={`/profile/booking-history/${item?.bookingId}`} className="text-primary-700 hover:text-primary-800 transition-colors">
                                    <Button size={"md"}>
                                        Booking Details
                                    </Button>
                                </Link>
                                <BookingPopup buttonSize="md" buttonVariant="outline" buttonText="Booking again" textClassName="text-btb-sm" />
                            </div>
                        </div>
                        <div className="flex flex-col items-end p-5 ">
                            {/* Ticket Price */}
                            <div className="text-h5 text-grey-900 mb-4">
                                ${item?.totalPrice || 0}
                            </div>
                            <div className="flex flex-col gap-2">
                                {/* Ticket Status */}
                                <div className={`text-c2  p-2 text-center  rounded-[10px] ${item.ticketStatus.trim() === 'used' ? 'bg-green-100 text-green-800' : item.ticketStatus.trim() === 'VALID' ? 'text-primary-600  bg-primary-50' : 'text-primary-700'}`}>
                                    {item.ticketStatus}
                                </div>
                                {/* Booking Type */}
                                <div className="text-c2  text-grey-900  p-2 text-center  bg-grey-50 rounded-[10px]">
                                    {item.bookingType || "Undefind"}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
export default BookingHistory;