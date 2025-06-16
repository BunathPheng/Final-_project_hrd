import Favorite from "@/components/feature/button/favorite";
import { SmartImage } from "@/components/feature/fallback/smart-image";
import Pagination from "@/components/feature/lib/pagination";
import { ShowAmount } from "@/components/feature/lib/show-amount";
import StarRating from "@/components/feature/lib/star-rating";
import { Button } from "@/components/ui/button";
import { ApiResponse, PageProps, PaginationProps } from "@/types/response";
import { apiRequest } from "@/utils/api";
import Link from "next/link";
import { EmptyMuseum } from "./empty-museum";
import { SortMuseum } from "./sort-museum";
import { AnimatedSection } from "@/components/feature/animation/animation-section";
import { getVisitorId } from "@/utils/session";

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
    pagination: PaginationProps;
};

export const MuseumItem: React.FC<PageProps> = async ({ searchParams }) => {
    const resolvedSearchParams = await searchParams;
    const page = resolvedSearchParams?.page || "";
    const category = resolvedSearchParams?.category || "";
    const search = resolvedSearchParams?.search || "";
    const sort = resolvedSearchParams?.sort || "latest";

    const visitorId = await getVisitorId();

    const responseMuseum = await apiRequest<ApiResponse<MuseumComponentProps>>(`/museums/filter?page=${page}&size=10&search=${search}&museumCategoryId=${category}&status=APPROVED&museumSort=${sort}`);
    const museums = responseMuseum?.payload?.items || [];
    const paging = responseMuseum?.payload?.pagination;

    return (
        <>
            <div className="flex w-full justify-between items-center">
                <ShowAmount paging={paging} />
                <SortMuseum />
            </div>
            {(!museums || museums.length === 0) && <EmptyMuseum />}

            {(museums && museums.length > 0) && (
                <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-7 xl:gap-10">
                        {museums.map(item => (
                            <AnimatedSection key={item?.museumId} animation="zoom-in">
                                <div className="overflow-hidden rounded-md relative bg-white shadow-400">
                                    <div className="h-52">
                                        <SmartImage src={item?.logoLink} className="w-full h-full object-cover" width={400} height={200} alt={item?.name} />
                                    </div>
                                    <div className="absolute right-3 top-3">
                                        <Favorite id={item?.museumId} isFavorite={item?.isFavorite || false} visitorId={visitorId} />
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
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="grid justify-center" >
                        <Pagination paging={paging} scroll={false} />
                    </div>
                </>
            )}
        </>
    );
}
