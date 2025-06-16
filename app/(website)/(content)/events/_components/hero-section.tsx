import Image from "next/image";
import { formatDateRange } from "@/utils/format";
import { EventPros } from "@/app/(website)/(content)/events/page";

type HeroSectionProps = {
    event: EventPros;
}

const HeroSection: React.FC<HeroSectionProps> = ({ event }) => {
    return (
        <>
            <div className="relative bg-gradient-to-r from-grey-300 to-grey-200 h-96 sm:h-130 max-h-screen text-white overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        width={500} height={500}
                        src={`${event.imageLinks.images[0]}`}
                        alt={event.title}
                        className="object-cover object-center w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black opacity-50" />
                </div>
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
                    <h1 className="text-5xl font-bold leading-tight mb-10 drop-shadow-600">
                        “{event.title}”
                    </h1>
                    <div className="text-center flex flex-col justify-center items-center drop-shadow-600">
                        <p className="text-lg font-semibold">
                            Come and join us for {event.subTitle}
                        </p>
                        <p className="text-lg font-semibold ">
                            at {event.museum.name} | {formatDateRange(event.startDate, event.endDate)}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default HeroSection;
