import { Star1 } from "iconsax-reactjs";
import React from "react";

type StarRatingProps = {
    rating: number | undefined;
    size?: number;
};

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 24 }) => {
    const stars = [];

    // Use rating directly — no need for parseInt
    const number = rating ? Math.floor(rating) : 0;
    const amount = number > 5 ? 5 : number;

    // Fill stars (rated)
    for (let i = 0; i < amount; i++) {
        stars.push(
            <Star1 key={`rating-${i}`} size={size} className="fill-yellow [&>*]:stroke-yellow" />
        );
    }

    // Empty stars (remaining)
    for (let i = 0; i < 5 - amount; i++) {
        stars.push(
            <Star1 key={`remaining-${i}`} size={size} className="[&>*]:stroke-slate-light-active" />
        );
    }

    return <>{stars}</>;
};

export default StarRating;
