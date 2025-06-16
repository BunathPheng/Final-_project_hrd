import HeadingTitle from "@/components/feature/label/heading-title";
import Image from "next/image";
import { ZoneList } from "../_components/zone-list";
import { SearchData } from "../_components/search-data";

export const ZoneTab: React.FC<{ search: string, museumId: string }> = async ({ search, museumId }) => {
    return (
        <div className="grid w-full mt-10 gap-12">
            {/* Search Seaction */}
            <header className="flex w-full justify-between gap-5">
                <HeadingTitle title="VIEW ARTIFACTS BY ZONE" />
                <SearchData />
            </header>

            {/* Zone Image */}
            <Image src={"/banner/zone.jpg"} className="w-full h-auto object-cover" width={1359} height={807} alt="Museum Zone" />

            {/* Zone Lists */}
            <section className="grid gap-8">
                <HeadingTitle title="Museum" highlight="Zone" className="text-center" />
                <ZoneList search={search} museumId={museumId} />
            </section>
        </div>
    );
}
