import Favorite from "../button/favorite";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SmartImage } from "../fallback/smart-image";
import StarRating from "../lib/star-rating";

type MuseumProps = {
    museumId: number;
    name: string;
    description: string;
    logoLink: string;
    museumCategory: {
        museumCategoryId?: string;
        name?: string;
    };
    isFavorite?: boolean;
    review?: {
        averageRating?: number;
    };
}

type MuseumComponentProps = {
    items: MuseumProps[];
};

export const Museum: React.FC<MuseumComponentProps> = ({ items }) => {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-7 xl:gap-10">
            {items && items.map(item => (
                <div key={item?.museumId} className="overflow-hidden rounded-md relative bg-white shadow-400">
                    <div className="h-52">
                        <SmartImage src={item?.logoLink} className="w-full h-full object-cover" width={400} height={200} alt={item?.name} />
                    </div>
                    <div className="absolute right-3 top-3">
                        <Favorite id={item?.museumId} isFavorite={item?.isFavorite || false} />
                    </div>
                    <div className="flex flex-col gap-2 p-5">
                        <h6 className="text-h6 line-clamp-1 pr-12">{item?.name}</h6>
                        <div className="rounded-full bg-primary-700 h-1 w-16"></div>
                        <p className="text-p1 text-grey-800 line-clamp-2">{item?.description}</p>
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-p4 text-grey-900 px-3 py-1 rounded-full bg-grey-50">{item?.museumCategory?.name}</span>
                            <div className="flex gap-1.5">
                                <StarRating rating={item?.review?.averageRating} />
                            </div>
                        </div>
                        <div className="mt-2 flex justify-end">
                            <Link href={`/museum/${item?.museumId}`}>
                                <Button size={"md"}>Read more</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
