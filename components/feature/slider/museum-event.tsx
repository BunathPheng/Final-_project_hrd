"use client"

import React, { useState } from 'react';
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import MuseumEvent from '../../../app/(website)/(content)/(home)/_components/museum-event';
import { MuseumEventSkeleton } from '@/app/(website)/(content)/(home)/_components/museum-event-skeleton';

// 👇 Autoplay plugin
const Autoplay = (options = { interval: 2000 }): KeenSliderPlugin => (slider) => {
    let timeout: ReturnType<typeof setTimeout>
    let mouseOver = false

    function clearNextTimeout() {
        clearTimeout(timeout)
    }

    function nextTimeout() {
        clearTimeout(timeout)
        if (mouseOver) return
        timeout = setTimeout(() => {
            slider.next()
        }, options.interval)
    }

    slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
        })
        slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
        })
        nextTimeout()
    })

    slider.on("dragStarted", clearNextTimeout)
    slider.on("animationEnded", nextTimeout)
    slider.on("updated", nextTimeout)
}

type MuseumEventsProps = {
    eventId: string;
    museum: {
        name: string;
        address: string;
    };
    title: string;
    subTitle: string;
    content: string;
    startDate: string;
    endDate: string;
    imageLinks?: { images: Array<string> };
}

const MuseumEventCarousel: React.FC<{ events: MuseumEventsProps[] }> = ({ events }) => {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            loop: true,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            created() {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                setLoaded(true),
                    // Simulate loading time for content
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 800)
            },
        },
        [Autoplay({ interval: 3000 })] // 👈 Add the autoplay plugin here
    )

    return (
        <>
            {isLoading && <MuseumEventSkeleton />}

            <div ref={sliderRef} className={`keen-slider flex w-full overflow-hidden ${isLoading ? "opacity-0" : "opacity-100"}`}>
                {events && events.map(item => (
                    <div key={item.eventId} className={`keen-slider__slide w-full ${isLoading ? "hidden" : ""}`}>
                        <MuseumEvent {...item} />
                    </div>
                ))}
            </div>

            <div className="my-10 flex justify-center gap-2">
                {loaded && instanceRef.current && (
                    <div className="flex gap-4">
                        {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx)
                                }}
                                className={`w-3 h-3 rounded-full cursor-pointer ${currentSlide === idx
                                    ? "bg-primary-700 hover:bg-primary-800"
                                    : "bg-slate-light-hover hover:bg-slate-dark"
                                    }`}
                            ></button>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default MuseumEventCarousel
