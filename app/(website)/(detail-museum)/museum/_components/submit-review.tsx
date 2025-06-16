"use client"

import { reviewMuseum, updateReview } from "@/action/review/review-action";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReviewCommentProps } from "@/types/review";
import { Star1 } from "iconsax-reactjs";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const SubmitReview: React.FC<{ visitorId: string | null, payload: ReviewCommentProps | null }> = ({ visitorId, payload }) => {
    const { "museum-id": museumId } = useParams();
    const reviewId = payload?.reviewId || "";

    const [rating, setRating] = useState<number>(payload?.rating || 0); // 0 to 5
    const [comment, setComment] = useState<string>(payload?.comment || "");
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleStarClick = (index: number) => {
        setRating(index + 1); // Since index starts at 0, +1 gives 1-5
    };

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validate form
        if (rating === 0 || !comment.trim()) return;
        if (!visitorId) {
            toast.error("Please login first.");
            setLoading(false);
            return;
        }

        if (payload) {
            // Update review data
            const reviewData = {
                reviewId,
                rating,
                comment: comment.trim(),
            };

            const response = await updateReview(reviewData);
            if (response?.status === 400 || response?.status === 500) {
                toast.error("Updating review failed!");
            } else {
                toast.success("Updating review successfully!");
            }
        } else {
            // Create review data
            const reviewData = {
                museumId,
                rating,
                comment: comment.trim(),
            };

            const response = await reviewMuseum(reviewData);
            if (response?.status === 400 || response?.status === 500) {
                toast.error("Submitting review failed!");
            } else {
                toast.success("Submitting review successfully!");
            }
        }
        setLoading(false);
    }

    // Check if form is valid
    const isFormValid = rating > 0 && comment.trim().length > 0 && comment.trim().length <= 500;

    return (
        <form onSubmit={submitReview} className="grid w-full shadow-600 rounded-md p-10 gap-7">
            <h5 className="text-left text-h5 text-grey-900">Write Your Review</h5>
            <div className="grid gap-2">
                <Label>Your Rating</Label>
                <div className="flex gap-1.5">
                    {[...Array(5)].map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => handleStarClick(i)}
                            className="focus:outline-none cursor-pointer"
                        >
                            <Star1
                                size={30}
                                className={
                                    i < rating
                                        ? "fill-yellow [&>*]:stroke-yellow"
                                        : "[&>*]:stroke-slate-light-active"
                                }
                            />
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid gap-2">
                <Label>Your Feedback</Label>
                <Textarea
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience at the museum..."
                    required
                />
                <p className="text-c1 text-grey-600">
                    {comment.length}/500 characters
                </p>
            </div>
            <div className="w-fit">
                {isFormValid && (
                    <Button className="cursor-pointer" disabled={isLoading || false}>
                        {isLoading && <Image src={"/loading/loading.svg"} className="w-7 h-7 object-cover" width={28} height={28} alt="loading" />}
                        {payload ? "Update Review" : "Submit Review"}</Button>
                )}
                {!isFormValid && (
                    <Button type="button" className="cursor-pointer pointer-events-none" disabled>{payload ? "Update Review" : "Submit Review"}</Button>
                )}
            </div>
        </form>
    );
};
