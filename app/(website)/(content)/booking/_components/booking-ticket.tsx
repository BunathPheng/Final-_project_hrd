'use client';

import React, { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Add, Minus, TickCircle } from 'iconsax-reactjs';
import Image from 'next/image';
import { DatePicker } from '@/components/ui/date-picker';
import { MdodelQr } from '@/components/feature/qr-code/model-qr';

// Type definitions
type TicketType = 'Local' | 'Foreigner';
type TabType = 'Individual' | 'Tour';
type QuantityAction = 'increment' | 'decrement';

interface TicketPrices {
    Local: number;
    Foreigner: number;
}

interface BookingState {
    ticketType: TicketType;
    quantity: number;
    activeTab: TabType;
}

// Props type definition
type BookingTicketProps = {
    onClose?: () => void;
};

const BookingTicket: React.FC<BookingTicketProps> = ({ onClose }) => {
    // State with proper typing
    const [ticketType, setTicketType] = useState<TicketType>('Local');
    const [quantity, setQuantity] = useState<number>(10);
    const [activeTab, setActiveTab] = useState<TabType>('Individual');

    // Ticket prices configuration
    const ticketPrices: TicketPrices = {
        Local: 4000,
        Foreigner: 20000
    };

    // Calculate total price
    const totalPrice: number = ticketPrices[ticketType] * quantity;

    // Handle quantity changes
    const handleQuantityChange = (action: QuantityAction): void => {
        if (action === 'increment') {
            setQuantity(prev => prev + 1);
        } else if (action === 'decrement' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // Handle quantity input change
    const handleQuantityInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(e.target.value) || 1;
        setQuantity(Math.max(1, value));
    };

    // Handle tab change
    const handleTabChange = (tab: TabType): void => {
        setActiveTab(tab);
    };

    // Handle ticket type change
    const handleTicketTypeChange = (type: TicketType): void => {
        setTicketType(type);
    };

    // Handle booking submission with close functionality
    const handleBookNow = (): void => {
        const bookingData: BookingState & { totalPrice: number } = {
            ticketType,
            quantity,
            activeTab,
            totalPrice
        };

        console.log('Booking data:', bookingData);

        // Add your booking logic here

        // Close the dialog after booking
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-5 ">
                {/* Tab Navigation */}
                <div className="flex" role="tablist">
                    {(['Individual', 'Tour'] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            role="tab"
                            aria-selected={activeTab === tab}
                            className={`flex-1 py-2 px-4 text-s2 border-b-2 transition-colors ${activeTab === tab
                                ? 'text-primary-700 border-primary-700'
                                : 'text-grey-900 border-transparent hover:text-grey-800'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {
                    activeTab === 'Individual' && (
                        <>
                            {/* Ticket Options */}
                            <div className="space-y-3 mb-6">
                                {(Object.keys(ticketPrices) as TicketType[]).map((type) => (
                                    <div
                                        key={type}
                                        className={`p-4 rounded-lg border-l-4 cursor-pointer transition-colors ${ticketType === type
                                            ? 'bg-grey-50 border-primary-700'
                                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                            }`}
                                        onClick={() => handleTicketTypeChange(type)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                handleTicketTypeChange(type);
                                            }
                                        }}
                                    >
                                        <div className="text-h6 text-grey-900">{type}</div>
                                        <div className="text-p1 text-grey-900">
                                            {ticketPrices[type].toLocaleString()} riels /{ticketPrices[type] === ticketPrices.Local ? '1.00$' : '5.00$'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Ticket Type Buttons */}
                            <div className="flex items-center justify-between">
                                <label className="text-p2 text-grey-900">
                                    Ticket type
                                </label>
                                <div className="flex gap-2 items-center justify-between">
                                    {(Object.keys(ticketPrices) as TicketType[]).map((type) => (
                                        <Button
                                            key={type}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleTicketTypeChange(type)}
                                            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${ticketType === type
                                                ? 'bg-primary-700 text-white'
                                                : 'text-primary-700 hover:bg-primary-800'
                                                }`}
                                        >
                                            <TickCircle
                                                variant="Outline"
                                                size={20}
                                                className={`transition-opacity ${ticketType === type ? 'block' : 'hidden'
                                                    }`}
                                            />
                                            {type}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center justify-between">
                                <label className="text-p2 text-grey-900">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleQuantityChange('decrement')}
                                        disabled={quantity <= 1}
                                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-grey-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityInputChange}
                                        min="1"
                                        className="flex-1 h-10 px-3 border border-gray-300 rounded-lg  w-32 text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        aria-label="Quantity"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange('increment')}
                                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-grey-50 transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <Add className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Booking Date */}
                            <div className="flex items-center justify-between">
                                <label htmlFor="booking-date" className="text-p2 text-grey-900">
                                    Booking Date
                                </label>
                                <div className="relative">
                                    <DatePicker />
                                </div>
                            </div>

                            {/* Payment Support */}
                            <div className="flex items-center justify-between">
                                <label className="text-p2 text-grey-900">
                                    Payment support
                                </label>
                                <Image src={"/banner/webill365_logo.svg"} width={20} height={40} alt="webill" className="w-28" />
                            </div>

                            {/* Total Price */}
                            <div className="flex justify-between items-center py-2 border-t border-t-primary-700">
                                <span className="text-p2 text-grey-900">Total Price:</span>
                                <span className="text-lg font-semibold text-gray-900">
                                    {totalPrice.toLocaleString()} riels
                                </span>
                            </div>

                            {/* Book Now Button */}
                            <MdodelQr/>
                            
                        </>
                    )
                }
                {
                    activeTab === 'Tour' && (
                        <>
                            {/* Quantity */}
                            <div className="flex flex-col gap-4">
                                <label className="text-p2 text-grey-900">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleQuantityChange('decrement')}
                                        disabled={quantity <= 1}
                                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-grey-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityInputChange}
                                        min="1"
                                        className="flex-1 h-10 px-3 border border-gray-300 rounded-lg   text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        aria-label="Quantity"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange('increment')}
                                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-grey-50 transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <Add className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                            {/* Booking Date */}
                            <div className='flex flex-col gap-4'>
                                <label htmlFor="booking-date" className="text-p2 text-grey-900">
                                    Booking Date
                                </label>
                                <div className="w-full">
                                    <DatePicker />
                                </div>
                            </div>
                            {/* Book Now Button */}
                            <Button
                                onClick={handleBookNow}
                                className="w-full bg-primary-700 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Request Now
                            </Button>
                            {/* Information Message */}
                            <div className="p-4 bg-gray-50 border-l-4 border-primary-700 rounded-r-lg">
                                <p className="text-sm text-grey-900 leading-relaxed">
                                    Request your museum tour reservation today. After submission, your tour request will be
                                    reviewed by our museum staff. Once approved, a confirmation with your unique QR code
                                    ticket will be sent to your email. Please ensure your contact information is accurate to
                                    receive your digital ticket.
                                </p>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default BookingTicket;
