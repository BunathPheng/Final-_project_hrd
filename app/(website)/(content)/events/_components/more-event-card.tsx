import Image from "next/image";
import Link from "next/link";

type MoreEventCard = {
    eventId: string;
    title: string;
    subTitle: string;
    content: string;
    status: string;
    imageLinks: { images: string[] };
}

type MoreEventComponentProps = {
    items: MoreEventCard[];
};

export const MoreEventCard: React.FC<MoreEventComponentProps> = ({ items }) => {
    return (
        <div className="w-full grid gap-3">
            {items && items.map(item => (
                <Link key={item.eventId} href={`/events/${item.eventId}`} className="flex w-full gap-6 overflow-hidden border border-grey-100 rounded-md relative p-2">
                    <div className="absolute right-0 top-0 w-2 h-full bg-primary-700"></div>
                    <Image src={item.imageLinks.images[0]} className="rounded-md w-28 h-28 object-cover shrink-0" width={104} height={104} alt={item.title} />
                    <div className="flex flex-col gap-2">
                        <h6 className="text-s2 text-grey-900 line-clamp-1">{item.title}</h6>
                        <p className="text-p1 text-grey-800 line-clamp-2">{item.content}</p>
                        {item.status === "UPCOMING" && (
                            <div className="w-fit px-3 py-1 bg-light-blue rounded-full">
                                <p className="text-c2 text-blue">Coming soon</p>
                            </div>
                        )}
                        { item.status === "ONGOING" &&    (
                            <div className="w-fit px-3 py-1 bg-light-green rounded-full">
                                <p className="text-c2 text-green">Ongoing</p>
                            </div>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    )
}
