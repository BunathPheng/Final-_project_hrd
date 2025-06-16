"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import HeroSection from "./hero-section";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import {EventPros} from "@/app/(website)/(content)/events/page";

type EventComponentProps = {
    events: EventPros[];
};

const HeroSlide: React.FC<EventComponentProps> = ({events}) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    return (
        <>
            <div className="grid w-full relative">
                <div
                    ref={sliderRef}
                    className="keen-slider flex w-full overflow-hidden"
                >
                    {events.map((event, index) => (
                        <div key={index} className="keen-slider__slide w-full">
                            <HeroSection event={event} />
                        </div>
                    ))}
                </div>

                {/* Left Arrow Button */}
                {loaded && instanceRef.current && (
                    <button
                        onClick={() => instanceRef.current?.prev()}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer text-white p-3 rounded-full transition-all duration-300"
                    >
                        <ArrowLeft2 size={50} className="[&>*]:stroke-2" />
                    </button>
                )}

                {/* Right Arrow Button */}
                {loaded && instanceRef.current && (
                    <button
                        onClick={() => instanceRef.current?.next()}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20  text-white cursor-pointer p-3 rounded-full transition-all duration-300"
                    >
                        <ArrowRight2 size={50} className="[&>*]:stroke-2" />
                    </button>
                )}

                {/* Dot Indicators */}
                {loaded && instanceRef.current && (
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="flex gap-4 items-center">
                            {[
                                ...Array(
                                    instanceRef.current.track.details.slides
                                        .length
                                ).keys(),
                            ].map((idx) => {
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            instanceRef.current?.moveToIdx(idx);
                                        }}
                                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${currentSlide === idx
                                            ? "bg-red-700 scale-110"
                                            : "bg-white bg-opacity-50 hover:bg-opacity-75"
                                            }`}
                                    ></button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default HeroSlide;
