import { EmptyData } from "@/components/feature/fallback/empty-data";
import HeadingTitle from "@/components/feature/label/heading-title";
import { MuseumDetailProps } from "@/types/museum";
import { Image as ImageIcon } from "iconsax-reactjs";
import Image from "next/image";

export const Landscape: React.FC<{ payload: MuseumDetailProps | null }> = ({ payload }) => {
    const landscape = payload?.landscapeLink?.images || [];

    return (
        <section className="grid gap-4">
            <div className="relative z-10">
                <HeadingTitle title="MUSEUM LANDSCAPE" className="text-center" />
            </div>
            <div className="w-full relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white w-[105%] h-24 rounded-[35%_35%_50%_50%]"></div>
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white w-[105%] h-24 rounded-[50%_50%_35%_35%]"></div>
                <div className="overflow-auto hidden-scroll snap-x touch-pan-x flex justify-center-safe w-full gap-8">
                    {landscape && landscape.map((item, idx) => (
                        <Image key={idx} src={item} className="basis-[calc(25%_-2rem)] shrink-0 h-86 snap-start object-cover" width={340} height={350} alt="Landscape" />
                    ))}

                    {landscape.length == 0 && <EmptyData title="No landscapes found" description="" icon={<ImageIcon size={40} className="[&>*]:stroke-grey-800" />} />}
                </div>
            </div>
        </section>
    );
}
