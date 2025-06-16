import { BookingPopup } from "../dialog/booking-popup";
import { Clock, Location, Message, Ticket } from "iconsax-reactjs";
import MuseumImage from "./museum-image";
import Favorite from "../button/favorite";
import { getVisitorId } from "@/utils/session";
import { FavoriteMuseumProps } from "@/types/museum";

// Add this type for museum hours
type MuseumHours = {
    day: string;
    openingTime: string;
    closingTime: string;
};

// Update your FavoriteMuseumProps to include hours
type FavoriteMuseumComponentProps = {
    items: (FavoriteMuseumProps & {
        museumHours?: MuseumHours[]
    })[];
};

const FavoriteMuseum: React.FC<FavoriteMuseumComponentProps> = async ({ items }) => {
    const visitorId = await getVisitorId();

    // Filter items to only show favorites
    const favoriteItems = items.filter(item => item.isFavorite === true);

    // Function to get today's opening hours
    const getTodaysHours = (museumHours?: MuseumHours[]): string => {
        if (!museumHours || museumHours.length === 0) {
            return "Hours not available";
        }

        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

        // Map JavaScript day of week to your day names
        const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        const todayName = dayNames[dayOfWeek];

        // Find today's hours
        const todaysSchedule = museumHours.find(hour => hour.day === todayName);

        if (!todaysSchedule) {
            return "Hours not available";
        }

        // Format the time (remove seconds if present)
        const formatTime = (time: string): string => {
            const [hours, minutes] = time.split(':');
            const hour24 = parseInt(hours);
            const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
            const ampm = hour24 < 12 ? 'AM' : 'PM';
            return `${hour12}:${minutes} ${ampm}`;
        };

        const openTime = formatTime(todaysSchedule.openingTime);
        const closeTime = formatTime(todaysSchedule.closingTime);

        return `${openTime} - ${closeTime}`;
    };


    return (
        <>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 max-w-full gap-7 shrink-0 ">
                {favoriteItems.map(item => (
                    <div key={item.museumId} className="max-w-90 w-full mx-auto bg-white rounded-[10px] shadow-md overflow-hidden">
                        {/* Image Section */}
                        <div className="relative">
                            <MuseumImage
                                src={item.logoLink}
                                alt={item?.museumName}
                                className="object-cover rounded-t-lg h-50"
                                width={400}
                                height={300}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {/* Heart Icon - Now Dynamic */}
                            <div
                                className="absolute top-1 right-1 p-2"
                            >
                                <Favorite id={item?.museumId} isFavorite={item.isFavorite} visitorId={visitorId} />
                            </div>

                        </div>
                        {/* Content Section */}
                        <div className="flex flex-col p-4">
                            {/* Dynamic Title */}
                            <h2 className="text-s1 text-grey-900 mb-4 line-clamp-1">{item.museumName}</h2>
                            {/* Contact Information */}
                            <div className="space-y-3 mb-6">
                                {/* Email - Only show if available */}
                                {item.museumEmail && (
                                    <div className="flex items-center gap-3 text-grey-900">
                                        <Message size={24} className="text-primary-700" />
                                        <span className="text-p3">{item.museumEmail}</span>
                                    </div>
                                )}

                                {/* Address - Dynamic */}
                                {item.museumAddress && (
                                    <div className="flex items-center text-grey-900 gap-3">
                                        <Location size={24} className="text-primary-700 shrink-0" />
                                        <span className="text-p3 line-clamp-1">{item.museumAddress}</span>
                                    </div>
                                )}

                                {/* Opening Hours - Dynamic */}
                                <div className="flex items-center text-grey-900 gap-3">
                                    <Clock size={24} className="text-primary-700" />
                                    <div className="flex gap-3">
                                        <span className="text-p3">Today:</span>
                                        <span className="text-p3 font-medium">{getTodaysHours(item.museumHours)}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Book Now Button */}
                            <div className="flex justify-end">
                                <BookingPopup buttonIcon={<Ticket size={24} className="text-white" />} buttonSize="md" buttonVariant="default" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FavoriteMuseum;
