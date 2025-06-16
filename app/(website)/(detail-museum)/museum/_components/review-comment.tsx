import { PageProps } from "@/types/response";
import { Comment } from "./comment";
import { ReviewTab } from "./review-tab";
import { Suspense } from "react";
import { CommentSkeleton } from "./comment-skeleton";

type ReviewCommentProps = PageProps & {
    museumId: string;
};

export const ReviewComment: React.FC<ReviewCommentProps> = async ({ searchParams, museumId }) => {
    const resolveSearchParams = await searchParams;
    const suspenseKey = `${resolveSearchParams?.type || 'recent'}-${resolveSearchParams?.page || '1'}}`;

    return (
        <div className="grid w-full">
            {/* Sort Section */}
            <ReviewTab content={(
                <Suspense key={suspenseKey} fallback={<CommentSkeleton />}>
                    <Comment searchParams={searchParams} museumId={museumId} />
                </Suspense>
            )} />
        </div>
    );
}
