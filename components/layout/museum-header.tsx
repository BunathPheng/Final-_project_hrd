import React from "react";
import { ArrowLeft2 } from "iconsax-reactjs";
import Link from "next/link";
import { BookingPopup } from "../feature/dialog/booking-popup";
import { MuseumDetailProps } from "@/types/museum";
import StarRating from "../feature/lib/star-rating";
import { SmartImage } from "../feature/fallback/smart-image";
import Favorite from "../feature/button/favorite";

export const MuseumHeader: React.FC<{ visitorId: string | null, payload: MuseumDetailProps | null }> = ({ visitorId, payload }) => {
    const museumId = payload?.museumId || "";

    return (
        <header className="grid w-full relative mb-20">
            <div className="w-full h-105">
                <SmartImage src={payload?.bannerLink || ""} fallbackSrc={`https://placehold.co/500x500/f3f3f3/a1a1a1?text=${payload?.name || ""}`} className="object-cover w-full h-full" width={1440} height={420} alt={payload?.name || ""} />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
            {/* Back button */}
            <div className="absolute top-5 left-5">
                <Link href={"/"} className="flex items-center gap-1 bg-white rounded-full px-4 py-2">
                    <ArrowLeft2 size={20} className="[&>*]:stroke-primary-700 [&>*]:stroke-2" />
                    <span className="text-s2 text-primary-700">Back to explore</span>
                </Link>
            </div>
            {/* Header Content */}
            <section className="container pd-screen grid gap-12 absolute left-1/2 -translate-x-1/2 -bottom-13">
                <h2 className="drop-shadow-300 text-h2 text-white">{payload?.name || ""}</h2>
                <div className="bg-white border-t-4 border-primary-700 px-10 shadow-600 h-26 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <SmartImage src={payload?.logoLink || ""} width={57} height={68} alt={payload?.name || ""} />
                        <div className="flex items-center gap-1">
                            <StarRating rating={payload?.review?.averageRating || 0} />
                        </div>
                        <h6 className="flex  items-center gap-1">
                            <span className="text-s2 text-primary-700">{payload?.review?.averageRating || 0}</span>
                            <span className="text-p1 text-grey-800 shrink-0">({payload?.review?.totalReviews || 0} {(payload?.review?.totalReviews && payload?.review?.totalReviews > 1) ? "reviews" : "review"})</span>
                        </h6>
                    </div>
                    <div className="flex gap-5">
                        <Favorite id={museumId} isFavorite={payload?.isFavorite || false} visitorId={visitorId} isButton={true} />
                        <BookingPopup buttonSize="default" buttonVariant="default" buttonText="Booking Tickets" textClassName="text-btn-md rounded-sm" />
                    </div>
                </div>
            </section>
        </header>
    );
};
