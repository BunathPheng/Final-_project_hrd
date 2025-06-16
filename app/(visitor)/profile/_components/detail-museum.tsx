// DetailsBooking component - Updated to handle the data structure
import { FC } from 'react';
import { BookingDetailsComponentProps } from "@/types/booking";
import Image from 'next/image';
import QR from "../../../../public/banner/image 20.png";
import { ArrowRight2 } from 'iconsax-reactjs';
import { formatDate } from '@/utils/format';


type BookingInfoItemProps = {
    label: string;
    value: string | number;
    isStatus?: boolean;
};
const BookingInfoItem: FC<BookingInfoItemProps> = ({ label, value, isStatus = false }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'valid':
                return 'text-green-600 text-center bg-green-50 px-2 rounded-md';
            case 'use':
                return 'text-red-600 text-center bg-red-50 px-2 rounded-md';
            case 'expired':
                return 'text-orange-600 text-center bg-orange-50 px-2 rounded-md';
            default:
                return 'text-gray-900';
        }
    };

    return (
        <div className="flex flex-col items-start border-grey-100">
            <div className="">
                <div className="flex flex-col text-start">
                    <span className="text-grey-500">{label}</span>
                    <span className={`text-p2 ${isStatus ? getStatusColor(value.toString()) : 'text-grey-900'}`}>
                        {value}
                    </span>
                </div>
            </div>
        </div>
    );
};

export const DetailsBooking: FC<BookingDetailsComponentProps> = ({ bookingData }) => {
    
    if (!bookingData) {
        return <div>No booking data available</div>;
    }

    return (
        <>
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 pb-6 text-s1 border-b border-gray-200">
                <h1 className="text-grey-900">My Booking</h1>
                <ArrowRight2 size={20} color="#a1a1a1" />
                <h1 className="text-grey-400">Booking Details</h1>
            </div>

            {/* Booking Information Card */}
            <div className="mt-8">
                <h2 className="text-h4 text-grey-900 mb-2">Booking Details</h2>
                <p className="text-p1 text-grey-400 mb-6">Detailed view of your museum booking</p>

                <div className="border border-grey-200 rounded-[10px] p-4">
                    <h1 className="text-s1 text-grey-900 mb-6">Booking information</h1>
                    {/* Left and Right Column Layout */}
                    <div className="flex gap-96">
                        {/* Left Column */}
                        <div className="flex flex-col gap-4">
                            <BookingInfoItem
                                label="Booking ID"
                                value={bookingData?.bookingId}
                            />
                            <BookingInfoItem
                                label="Booking Type"
                                value={bookingData?.bookingType}
                            />
                            <BookingInfoItem
                                label="Ticket Type"
                                value={bookingData?.ticketType || 'N/A'}
                            />
                            <BookingInfoItem
                                label="Ticket Price"
                                value={`${bookingData?.ticketPrice || '0'} dollar`}
                            />
                            <BookingInfoItem
                                label="Ticket Status"
                                value={bookingData?.ticketStatus || 'Unknown'}
                                isStatus={true}
                            />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-4">
                            <BookingInfoItem
                                label="Museum"
                                value={bookingData.museumName || 'N/A'}
                            />
                            <BookingInfoItem
                                label="Booking Date"
                                value={formatDate(bookingData?.bookingDate)}
                            />
                            <BookingInfoItem
                                label="Created Date"
                                value={formatDate(bookingData?.createAt)}
                            />
                            <BookingInfoItem
                                label="Slot Amount"
                                value={bookingData.slotAmount || 'N/A'}
                            />
                             <BookingInfoItem
                                label="Total price"
                                value={bookingData.totalPrice || 'N/A'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* QR */}
            <div className="mt-8 border border-grey-200 rounded-[10px] p-4">
                <h2 className="text-s1 text-grey-900 mb-3">QR Code</h2>
                <p className="text-p1 text-grey-400 mb-6">Scan this QR Ticket</p>
                {/* Placeholder for QR Code */}
                <div className="w-full h-64 flex items-center justify-center rounded-lg">
                    {bookingData.qrCode ? (
                        <Image
                            src={bookingData.qrCodeData.dataUrl} 
                            alt="QR Code" 
                            width={200} 
                            height={200}
                        />
                    ) : (
                        <Image 
                            src={QR} 
                            alt="Default QR Code" 
                            width={200} 
                            height={200}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

// Export type definitions for use in other components
export type { BookingInfoItemProps };