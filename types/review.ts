export type ReviewStatsProps = {
    averageRating?: number;
    totalReviews?: number;
    oneStar?: number;
    twoStars?: number;
    threeStars?: number;
    fourStars?: number;
    fiveStars?: number;
    oneStarPercentage?: number;
    twoStarPercentage?: number;
    threeStarPercentage?: number;
    fourStarPercentage?: number;
    fiveStarPercentage?: number;
};

export type ReviewCommentProps = {
    reviewId?: string;
    museumId?: string;
    fullName?: string;
    profileImageLink?: string;
    comment?: string;
    rating?: number;
    createdAt?: string;
    updatedAt?: string;
    isReviewed?: boolean;
};
