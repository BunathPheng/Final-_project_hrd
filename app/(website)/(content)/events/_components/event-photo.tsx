"use client"

import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import Image from "next/image";
import React, { FC } from "react";
import {
    useKeenSlider
} from "keen-slider/react"

interface EventPhotoProps {
    images?: string[]; // or string if it's a single image
}

export const EventPhoto: FC<EventPhotoProps> = ({images}) => {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    // const [loaded, setLoaded] = useState(false)

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            loop: false,
            mode: "snap",
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            // created() {
            //     setLoaded(true)
            // },
        },
    )

    const previousSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        instanceRef.current?.prev();
    }

    const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        instanceRef.current?.next();
    }

    return (
        <section className="grid w-full gap-10">
            <div ref={sliderRef} className="keen-slider flex w-full overflow-hidden">
                {images && images.map((img, index) => (
                    <Image key={index} src={img} className="keen-slider__slide rounded-md object-cover w-full h-[31rem]" width={900} height={540} alt="Event" />
                ))}
            </div>
            <div className="w-full relative">
                <button type="button" onClick={previousSlide} disabled={currentSlide === 0} className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 bg-white disabled:[&>svg>*]:stroke-grey-400 shadow-600 w-6 h-6 rounded-full flex items-center justify-center">
                    <ArrowLeft2 size={20} className="[&>*]:stroke-grey-900 stroke-2" />
                </button>
                <div className="grid overflow-hidden w-full">
                    <div className="hidden-scroll keen-slider thumbnail snap-x touch-pan-x relative flex overflow-auto w-full gap-5">
                        {images && images.map((img, index) => (
                            <Image
                                key={index}
                                onClick={() => { instanceRef.current?.moveToIdx(index) }}
                                src={img}
                                className={`keen-slider__slide snap-start w-[6.875rem] h-[6.875rem] rounded-md object-cover border-2 ${currentSlide === index ? "border-primary-700" : ""}`}
                                width={110}
                                height={110}
                                alt="Event"
                            />
                        ))}
                    </div>
                </div>
                <button type="button" onClick={nextSlide} disabled={currentSlide === (images?.length ?? 0 )- 1} className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 bg-white disabled:[&>svg>*]:stroke-grey-400 shadow-600 w-6 h-6 rounded-full flex items-center justify-center">
                    <ArrowRight2 size={20} className="[&>*]:stroke-grey-900 stroke-2" />
                </button>
            </div>
        </section>
    );

}
