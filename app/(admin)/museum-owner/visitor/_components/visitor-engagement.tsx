import Innercard from "@/components/feature/card/inner-card";
import { SearchTable } from "@/components/feature/input/search-table";
import Pagination from "@/components/feature/lib/pagination";
import { Showing } from "@/components/feature/lib/showing";
import StarRating from "@/components/feature/lib/star-rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Profile2User, Send2 } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

export default function VisitorEngagement(): JSX.Element {
    const review = [
        {
            id: 1,
            name: "Thun Mengse",
            date: "July 12, 2025",
            comment:
                "The National Museum of Cambodia houses an incredible collection of Khmer art and artifacts. The building itself is a beautiful example of traditional architecture. The sculptures from Angkor period are particularly impressive. Well worth a visit when in Phnom Penh!",
        },
        {
            id: 2,
            name: "Thun Mengse",
            date: "July 12, 2025",
            comment:
                "The National Museum of Cambodia houses an incredible collection of Khmer art and artifacts. The building itself is a beautiful example of traditional architecture. The sculptures from Angkor period are particularly impressive. Well worth a visit when in Phnom Penh!",
        },
        {
            id: 3,
            name: "Thun Mengse",
            date: "July 12, 2025",
            comment:
                "The National Museum of Cambodia houses an incredible collection of Khmer art and artifacts. The building itself is a beautiful example of traditional architecture. The sculptures from Angkor period are particularly impressive. Well worth a visit when in Phnom Penh!",
        },
        {
            id: 4,
            name: "Thun Mengse",
            date: "July 12, 2025",
            comment:
                "The National Museum of Cambodia houses an incredible collection of Khmer art and artifacts. The building itself is a beautiful example of traditional architecture. The sculptures from Angkor period are particularly impressive. Well worth a visit when in Phnom Penh!",
        },
        {
            id: 5,
            name: "Thun Mengse",
            date: "July 12, 2025",
            comment:
                "The National Museum of Cambodia houses an incredible collection of Khmer art and artifacts. The building itself is a beautiful example of traditional architecture. The sculptures from Angkor period are particularly impressive. Well worth a visit when in Phnom Penh!",
        },
        {
            id: 6,
            name: "Thun Mengse",
            date: "July 12, 2025",
            comment:
                "The National Museum of Cambodia houses an incredible collection of Khmer art and artifacts. The building itself is a beautiful example of traditional architecture. The sculptures from Angkor period are particularly impressive. Well worth a visit when in Phnom Penh!",
        },
    ];

    return (
        <>
            <div className="flex items-center justify-between w-full gap-5 mb-7">
                <div className="flex gap-2 items-center">
                    <Profile2User size={24} className="[&>*]:stroke-primary-700" />
                    <h4 className="text-s1 text-grey-900">Visitor</h4>
                </div>
                <div className="flex gap-6 items-center">
                    <Link href="/museum-owner/events/create">
                        <Select name="category">
                            <SelectTrigger className="w-50">
                                <SelectValue placeholder="Sorted by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Recently">
                                    Most Recently
                                </SelectItem>
                                <SelectItem value="Highest">
                                    Highest Rate
                                </SelectItem>
                                <SelectItem value="Lowest">
                                    Lowest Rate
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </Link>
                    <SearchTable />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-7 mb-7">
                {review.map((reviewItem) => (
                    <Innercard key={reviewItem.id}>
                        <div className="flex justify-between mb-3">
                            <div className="inline-flex h-full items-center gap-2">
                                <Image
                                    src={"/profile/man.webp"}
                                    className="w-11 h-11 rounded-full object-cover"
                                    width={25}
                                    height={25}
                                    alt="Picture"
                                />
                                <div className="flex flex-col">
                                    <span className="text-h6">
                                        {reviewItem.name}
                                    </span>
                                    <span className="text-p1 text-grey-700">
                                        {reviewItem.date}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <StarRating rating={5} />
                            </div>
                        </div>
                        <span className="text-p1 text-grey-700 line-clamp-3 mb-3">
                            {reviewItem.comment}
                        </span>
                        <div className="flex justify-between gap-7">
                            <Input placeholder="Reply to the message" />
                            <Button
                                variant="outline"
                                className="border-primary-700 text-primary-700"
                            >
                                <Send2
                                    size={24}
                                    className="fill-primary-700 [&>*]:stroke-white"
                                />
                            </Button>
                        </div>
                    </Innercard>
                ))}
            </div>
            <div className="flex w-full justify-between items-center gap-5 pt-5 border-t border-grey-100">
                <Pagination />
                <Showing />
            </div>
        </>
    );
}
