import HeadingTitle from "@/components/feature/label/heading-title"
import { Suspense } from "react"
import { MapPicker } from "./map-picker"
import MuseumArea from "./museum-area";
import { MuseumAreaSkeleton } from "./area-skeleton";
import { PageProps } from "@/types/response";

export const MuseumNearYou: React.FC<PageProps> = async ({ searchParams }) => {
    const resolvedSearchParams = await searchParams;
    const suspenseKey = `${resolvedSearchParams?.lat || '11.565860'}-${resolvedSearchParams?.lng || '104.926571'}-${resolvedSearchParams?.distance || '5'}`;

    return (
        <div className="grid gap-12 w-full pd-screen">
            {/* Museum Near You */}
            <section className="grid gap-10">
                <HeadingTitle title="Museum" highlight="Near You" />
                <MapPicker />
            </section>

            {/* Museum in your area */}
            <section className="grid gap-10">
                <HeadingTitle title="Museum" highlight="In Your Area" />
                <Suspense key={suspenseKey} fallback={<MuseumAreaSkeleton />}>
                    <MuseumArea searchParams={searchParams} />
                </Suspense>
            </section>
        </div>
    )
}
