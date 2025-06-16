import { MuseumFeature } from "../_components/museum-feature";
import { Landscape } from "../_components/landscape";
import { TicketDetail } from "../_components/ticket-detail";
import { SearchNormal } from "iconsax-reactjs";
import HeadingTitle from "@/components/feature/label/heading-title";
import { MuseumDetailProps } from "@/types/museum";
import { MarkMap } from "../../../../../components/feature/lib/mark-map";

export const OverviewTab: React.FC<{ payload: MuseumDetailProps | null }> = ({ payload }) => {
    return (
        <div className="grid gap-12">
            {/* Museum Detail */}
            <article className="grid w-full gap-7 mt-10">
                <h4 className="text-h4 text-grey-900 uppercase">ABOUT {payload?.name || ""}</h4>
                <div className="grid grid-cols-5 w-full gap-x-5 gap-y-7">
                    <p className="col-span-3 text-p1 text-grey-800 whitespace-pre-line">{payload?.description || ""}</p>
                    <div className="col-span-2 w-full">
                        <TicketDetail payload={payload} />
                    </div>
                </div>
            </article>

            {/* Museum landscape */}
            <Landscape payload={payload} />

            {/* Museum Feature */}
            <MuseumFeature payload={payload} />

            {/* Museum Location */}
            <section className="grid gap-8">
                <div className="flex items-center justify-center gap-3">
                    <SearchNormal size={26} className="[&>*]:stroke-primary-700" />
                    <HeadingTitle title="Locate Us" className="text-center" />
                </div>
                {/* Google Map */}
                <div className="w-full h-[26rem] rounded-sm border border-grey-400 overflow-hidden">
                    <MarkMap
                        center={{ lat: payload?.lat || 0, lng: payload?.lng || 0 }}
                        zoom={15}
                        markers={[{
                            id: payload?.museumId || "",
                            position: { lat: payload?.lat || 0, lng: payload?.lng || 0 },
                            title: payload?.name || ""
                        }]}
                    />
                </div>
            </section>
        </div>
    );
}
