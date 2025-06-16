import { Button } from "@/components/ui/button";
import { Bank, Call, Location } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BookingPopup } from "../../../../../components/feature/dialog/booking-popup";
import { apiRequest } from "@/utils/api";
import { ApiResponse } from "@/types/response";
import { SmartImage } from "../../../../../components/feature/fallback/smart-image";
import StarRating from "../../../../../components/feature/lib/star-rating";
import { AnimatedSection } from "../../../../../components/feature/animation/animation-section";

type MuseumPopularProps = {
    museumId: number;
    name: string;
    description: string;
    logoLink: string;
    address?: string;
    contactNumber?: string;
    review?: {
        averageRating?: number;
        totalReviews?: number;
    };
}

export const PopularMuseum: FC = async () => {
    const lborder: string = "border-l-0 sm:border-l lg:border-l-0 xl:border-l border-t sm:border-t-0 lg:border-t xl:border-t-0";
    const rborder: string = "border-r-0 sm:border-r lg:border-r-0 xl:border-r border-t sm:border-t-0 lg:border-t xl:border-t-0";

    const response = await apiRequest<ApiResponse<{ items: MuseumPopularProps[] }>>(`/museums/filter?page=1&size=4&status=APPROVED&museumSort=popular`);
    const museums = response?.payload?.items || [];

    return (
        <>
            {museums && museums.map((museum, idx) => {
                const isLeft = idx % 2 == 0;
                const border: string = isLeft ? lborder : rborder;
                return (
                    <AnimatedSection key={museum.museumId} className="h-full" animation="zoom-in">
                        <div className={`relative h-full flex flex-col sm:flex-row lg:flex-col xl:flex-row bg-primary-700 rounded-md py-6`}>
                            <div className={`basis-2/3 flex flex-col sm:flex-row gap-5 pb-5 sm:pb-0 lg:pb-5 xl:pb-0 pl-6 ${isLeft ? "" : "sm:order-last lg:order-first xl:order-last"}`}>
                                <div className="flex pr-5 sm:pr-0 w-full sm:w-[8.25rem] h-56 sm:h-[11.75rem] shrink-0">
                                    <SmartImage src={museum?.logoLink} className="rounded-sm w-full h-full object-cover" width={133} height={189} alt="National Museum of Cambodia" />
                                </div>
                                <div className="flex flex-col gap-4 text-white pr-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex gap-1">
                                            <StarRating rating={museum?.review?.averageRating} />
                                        </div>
                                        <p className="text-p1">({museum?.review?.totalReviews} {(museum?.review?.totalReviews || 0) > 1 ? "reviews" : "review"})</p>
                                    </div>
                                    <h4 className="text-p4 line-clamp-2">{museum?.name}</h4>
                                    <p className="text-p5 line-clamp-4">{museum?.description}</p>
                                    <nav className="flex gap-5">
                                        <Link href={`/museum/${museum?.museumId}`}>
                                            <Button variant={"outlineWhite"} size={"sm"}>
                                                <span className="text-p3 px-3">Explore</span>
                                            </Button>
                                        </Link>
                                        <BookingPopup />
                                    </nav>
                                </div>
                            </div>
                            <div className={`relative basis-1/3 px-6 pt-5 sm:pt-0 lg:pt-5 xl:pt-0 text-white border-dashed border-white grid content-start gap-3 sm:gap-10 lg:gap-3 xl:gap-10 ${border}`}>
                                <h5 className="text-p1 text-center">Information</h5>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start gap-2">
                                        <Location size={15} className="shrink-0" />
                                        <p className="text-p5 line-clamp-2">{museum?.address}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Call size={15} className="shrink-0" />
                                        <p className="text-p5">{museum.contactNumber}</p>
                                    </div>
                                </div>
                                {isLeft ? (
                                    <>
                                        <Image src="/card/white-romdol.svg" className="absolute bottom-0 left-4" width={40} height={40} alt="Romdol" />
                                        <Image src="/card/white-romdol.svg" className="absolute -top-2 right-0" width={40} height={40} alt="Romdol" />
                                    </>
                                ) : (
                                    <>
                                        <Image src="/card/white-romdol.svg" className="absolute bottom-0 right-4" width={40} height={40} alt="Romdol" />
                                        <Image src="/card/white-romdol.svg" className="absolute -top-2 left-0" width={40} height={40} alt="Romdol" />
                                    </>
                                )}
                                <div className="absolute -left-6 -top-6 sm:-top-12 lg:-top-6 xl:-top-12 bg-white rounded-full w-12 h-12"></div>
                                <div className="absolute -left-6 -bottom-12 bg-white rounded-full w-12 h-12"></div>
                                <div className="absolute -right-6 -top-6 sm:-top-12 lg:-top-6 xl:-top-12 bg-white rounded-full w-12 h-12"></div>
                                <div className="absolute -right-6 -bottom-12 bg-white rounded-full w-12 h-12"></div>
                            </div>
                        </div>
                    </AnimatedSection>
                )
            })}

            {!museums || museums.length == 0 &&
                <div className="col-span-full flex flex-col items-center justify-center w-full py-12 text-center">
                    <div className="w-24 h-24 bg-grey-50 rounded-full flex items-center justify-center mb-4">
                        <Bank size={40} className="[&>*]:stroke-grey-800" />
                    </div>
                    <h3 className="text-h6 font-medium text-grey-800 mb-2">No museums found</h3>
                </div>
            }
        </>
    );
}
