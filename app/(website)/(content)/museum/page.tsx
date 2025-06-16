import { MuseumNearYou } from "./_components/museum-near-you";
import { MuseumCollection } from "./_components/museum-collection";
import { SmartImage } from "@/components/feature/fallback/smart-image";
import { PageProps } from "@/types/response";
import { JSX, Suspense } from "react";
import { MuseumSkeleton } from "./_components/museum-skeleton";
import { AnimatedSection } from "@/components/feature/animation/animation-section";

export default function MuseumPage({ searchParams }: PageProps): JSX.Element {
    return (
        <div className="grid gap-12">
            <Suspense fallback={<MuseumSkeleton />}>
                {/* Banner Section */}
                <section className="w-full sm:h-[37rem] relative">
                    <SmartImage src="/banner/museum.webp" className="w-full h-full object-[100%_80%] object-cover" width={1440} height={596} alt="Museum Banner" loading="eager" />
                    <div className="absolute top-0 left-0 z-10 w-full h-full bg-black/30"></div>
                    <div className="absolute z-20 top-1/2 left-1/2 -translate-1/2 flex flex-col gap-6 items-center p-5 w-full">
                        <AnimatedSection animation="fade-up">
                            <h1 className="text-h1 drop-shadow-500 text-white text-center">Explore Our Collection</h1>
                        </AnimatedSection>
                        <AnimatedSection animation="fade-up" delay={200}>
                            <p className="text-h5 drop-shadow-500 text-white text-center max-w-3xl">Discover thousands of artworks spanning centuries of human creativity and expression.</p>
                        </AnimatedSection>
                    </div>
                </section >

                <div className="container grid gap-12">
                    {/* Museum Near You */}
                    <MuseumNearYou searchParams={searchParams} />
                    {/* Museum Collections */}
                    <MuseumCollection searchParams={searchParams} />
                </div>
            </Suspense >
        </div >
    );
}
