import { SmartImage } from "@/components/feature/fallback/smart-image";
import Pagination from "@/components/feature/lib/pagination";
import StarRating from "@/components/feature/lib/star-rating";
import { ApiResponse, PageProps, PaginationProps } from "@/types/response";
import { ReviewCommentProps } from "@/types/review";
import { apiRequest } from "@/utils/api";
import { formatDate } from "@/utils/format";

type ReviewParamProps = PageProps & {
    museumId: string;
};

type CommentResponseProps = {
    items: ReviewCommentProps[],
    pagination: PaginationProps
}

export const Comment: React.FC<ReviewParamProps> = async ({ searchParams, museumId }) => {
    const resolveSearchParams = await searchParams;
    const reviewType = (resolveSearchParams?.type as string) || "recent";
    const page = (resolveSearchParams?.page as string) || "1";
    const type = reviewType == "low" ? "LOWEST_RATE" : (reviewType == "high" ? "HIGHEST_RATE" : "MOST_RECENTLY")

    const response = await apiRequest<ApiResponse<CommentResponseProps>>(`/reviews/${museumId}?reviewType=${type}&page=${page}&size=10`);
    const reviews = response?.payload?.items || [];
    const paging = response?.payload?.pagination;

    return (
        <>
            <section className="grid mb-12">
                {reviews.map(item => {
                    return (
                        <div key={item.reviewId} className="flex flex-col w-full gap-7 py-8 border-b border-grey-300">
                            <div className="flex w-full justify-between items-center gap-5">
                                <div className="flex items-center gap-3">
                                    <SmartImage src={item?.profileImageLink || ""} className="object-cover border w-13 h-13 rounded-full" width={50} height={50} alt={item?.fullName || ""} />
                                    <div className="flex flex-col">
                                        <h5 className="text-h5 text-grey-900 whitespace-nowrap">{item?.fullName || ""}</h5>
                                        <p className="text-p1 text-grey-900 whitespace-nowrap">{(item.updatedAt ? formatDate(item.updatedAt) : formatDate(item.createdAt || "")) || ""}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1.5">
                                    <StarRating rating={item?.rating || 0} />
                                </div>
                            </div>
                            <p className="text-p1 text-grey-800">{item?.comment || ""}</p>
                        </div>
                    )
                })}
            </section>
            {/* Pagination */}
            <div className="grid justify-center">
                <Pagination paging={paging} scroll={false} />
            </div>
        </>
    );
}
