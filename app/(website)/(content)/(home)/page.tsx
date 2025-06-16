import { PopularMuseum } from "@/app/(website)/(content)/(home)/_components/popular-museum";
import HeadingTitle from "@/components/feature/label/heading-title";
import ParticlesComponent from "@/components/feature/lib/particles";
import ViewArtifact from "@/components/feature/lib/view-artifact";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-reactjs";
import Link from "next/link";
import { Suspense } from "react";
import { PopularMuseumSkeleton } from "./_components/popular-skeleton";
import ExploreSkeleton from "./_components/explore-skeleton";
import { MuseumEventGroup } from "./_components/museum-event-group";
import { MuseumEventSkeleton } from "./_components/museum-event-skeleton";
import { AnimatedSection } from "@/components/feature/animation/animation-section";


export default async function ExplorePage() {
    return (
        <>
            <Suspense fallback={<ExploreSkeleton />}>
                <div className="grid w-full gap-12">
                    {/* Banner Section */}
                    <section className="bg-white relative h-[32rem] overflow-hidden">
                        <ParticlesComponent />
                        <div className="absolute z-10 top-1/2 left-10 lg:left-1/10 -translate-y-1/2 flex flex-col gap-5">
                            <h2 className="flex flex-col gap-2 text-grey-900 text-h1">
                                <AnimatedSection>
                                    <p>Step into the museum</p>
                                    <span>with <span className="text-primary-700">SelaMonty</span></span>
                                </AnimatedSection>
                            </h2>
                            <AnimatedSection delay={100}>
                                <p className="text-p1">Where art meets emotion and time slows down.</p>
                            </AnimatedSection>
                            <AnimatedSection delay={200}>
                                <Link href="/museum" className="w-fit">
                                    <Button variant={"outline"} size={"md"}>
                                        Explore
                                        <ArrowRight size={24} className="stroke-primary-700" />
                                    </Button>
                                </Link>
                            </AnimatedSection>
                        </div>
                        <div className="absolute top-1/2 right-1/2 min-[880px]:right-1/10 -translate-y-1/2 translate-x-1/2 min-[880px]:translate-x-0 opacity-60 min-[880px]:opacity-100">
                            <div className="w-96 h-[32rem]">
                                <ViewArtifact src="/artifact/buddha-naga.glb" />
                            </div>
                        </div>
                    </section>

                    <div className="container grid gap-12">
                        {/* Popular Museum Section */}
                        <section className="flex flex-col gap-12 w-full pd-screen">
                            <div className="flex w-full items-center justify-between gap-5">
                                <HeadingTitle title="Popular" highlight="Museum" />
                                <Link href="/museum" className="w-fit text-primary-700 flex gap-2 group">
                                    <span className="text-p1 transition-all group-hover:font-bold">Read more</span>
                                    <ArrowRight size={24} className="stroke-primary-700 [&>*]:transition-all group-hover:[&>*]:stroke-2" />
                                </Link>
                            </div>
                            <div className="grid lg:grid-cols-2 gap-x-6 gap-y-10">
                                <Suspense fallback={<PopularMuseumSkeleton />}>
                                    <PopularMuseum />
                                </Suspense>
                            </div>
                        </section>

                        {/* Museum Event Section */}
                        <section className="flex flex-col gap-12 w-full pd-screen">
                            <div className="flex w-full items-center justify-between gap-5">
                                <HeadingTitle title="Museum's" highlight="Event" />
                            </div>
                            <Suspense fallback={<MuseumEventSkeleton />}>
                                <MuseumEventGroup />
                            </Suspense>
                        </section>
                    </div>
                </div>
            </Suspense>
        </>
    );
}
