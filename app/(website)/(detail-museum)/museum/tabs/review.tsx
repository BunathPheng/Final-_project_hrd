import HeadingTitle from "@/components/feature/label/heading-title";
import { SubmitReview } from "../_components/submit-review";
import { ReviewRating } from "../_components/review-rating";
import { ReviewComment } from "../_components/review-comment";
import { ApiResponse, PageProps } from "@/types/response";
import { apiRequest } from "@/utils/api";
import { ReviewCommentProps } from "@/types/review";
import { getVisitorId } from "@/utils/session";

type ReviewParamProps = PageProps & {
    museumId: string;
};

export const ReviewTab: React.FC<ReviewParamProps> = async ({ searchParams, museumId }) => {
    const visitorId = await getVisitorId();
    const response = await apiRequest<ApiResponse<ReviewCommentProps>>(`/reviews/museum/${museumId}/visitor/${visitorId}`);
    const review = response?.payload || null;

    return (
        <div className="grid w-full mt-10 gap-12">
            {/* Title */}
            <HeadingTitle title="Reviews" />

            <div className="grid w-full gap-7">
                {/* Submit Review */}
                <SubmitReview visitorId={visitorId} payload={review} />
                {/* Review Detail */}
                <ReviewRating museumId={museumId} />
                {/* Review Comment */}
                <ReviewComment searchParams={searchParams} museumId={museumId} />
            </div>
        </div>
    );
}
