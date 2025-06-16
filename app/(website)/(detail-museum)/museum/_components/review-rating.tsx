import StarRating from "@/components/feature/lib/star-rating";
import { ApiResponse } from "@/types/response";
import { ReviewStatsProps } from "@/types/review";
import { apiRequest } from "@/utils/api";
import { formatRiel } from "@/utils/format";

export const ReviewRating: React.FC<{ museumId: string }> = async ({ museumId }) => {
    const response = await apiRequest<ApiResponse<ReviewStatsProps>>(`/reviews/${museumId}/statistics`);
    const reviews = response?.payload || null;

    return (
        <section className="grid grid-cols-8 w-full shadow-600 rounded-md py-8 px-10 gap-7">
            {/* Total Rating */}
            <div className="col-span-3 border-r-2 border-grey-800 flex flex-col items-center justify-center gap-2">
                <h1 className="text-h1 text-grey-900">{reviews?.averageRating?.toFixed(1) || 0}</h1>
                <div className="flex gap-1">
                    <StarRating rating={reviews?.averageRating || 0} />
                </div>
                <p className="text-p1 text-grey-700">Based on {formatRiel(reviews?.totalReviews || 0)} reviews</p>
            </div>

            {/* Star Rating Progress */}
            <ul className="col-span-5 grid w-full gap-5">
                <li className="flex gap-5 w-full justify-center items-center">
                    <p className="text-p1 text-grey-900 w-14">5 Stars</p>
                    <div className="basis-2/3 h-3 rounded-full bg-grey-100 relative">
                        <div className="absolute top-0 left-0 h-full bg-yellow rounded-full" style={{ width: (reviews?.fiveStarPercentage || 0) + "%" }}></div>
                    </div>
                    <span className="text-p1 text-grey-900 w-14">{reviews?.fiveStarPercentage || 0}%</span>
                </li>
                <li className="flex gap-5 w-full justify-center items-center">
                    <p className="text-p1 text-grey-900 w-14">4 Stars</p>
                    <div className="basis-2/3 h-3 rounded-full bg-grey-100 relative">
                        <div className="h-full w-[20%] bg-yellow rounded-full" style={{ width: (reviews?.fourStarPercentage || 0) + "%" }}></div>
                    </div>
                    <span className="text-p1 text-grey-900 w-14">{reviews?.fourStarPercentage || 0}%</span>
                </li>
                <li className="flex gap-5 w-full justify-center items-center">
                    <p className="text-p1 text-grey-900 w-14">3 Stars</p>
                    <div className="basis-2/3 h-3 rounded-full bg-grey-100 relative">
                        <div className="h-full w-[10%] bg-yellow rounded-full" style={{ width: (reviews?.threeStarPercentage || 0) + "%" }}></div>
                    </div>
                    <span className="text-p1 text-grey-900 w-14">{reviews?.threeStarPercentage || 0}%</span>
                </li>
                <li className="flex gap-5 w-full justify-center items-center">
                    <p className="text-p1 text-grey-900 w-14">2 Stars</p>
                    <div className="basis-2/3 h-3 rounded-full bg-grey-100 relative">
                        <div className="h-full w-[3%] bg-yellow rounded-full" style={{ width: (reviews?.twoStarPercentage || 0) + "%" }}></div>
                    </div>
                    <span className="text-p1 text-grey-900 w-14">{reviews?.twoStarPercentage || 0}%</span>
                </li>
                <li className="flex gap-5 w-full justify-center items-center">
                    <p className="text-p1 text-grey-900 w-14">1 Star</p>
                    <div className="basis-2/3 h-3 rounded-full bg-grey-100 relative">
                        <div className="h-full w-[2%] bg-yellow rounded-full" style={{ width: (reviews?.oneStarPercentage || 0) + "%" }}></div>
                    </div>
                    <span className="text-p1 text-grey-900 w-14">{reviews?.oneStarPercentage || 0}%</span>
                </li>
            </ul>
        </section>
    );
}
