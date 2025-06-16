import { BookingHistoryCardSkeleton } from "./booking-history-skeleton";

export default function BookingHistoryLoading() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <BookingHistoryCardSkeleton key={index} />
            ))}
        </div>
    );
}
