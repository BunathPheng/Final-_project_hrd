"use client"

import { updateFavorite } from "@/action/museum/favorite-action";
import { Heart } from "iconsax-reactjs";
import React, { useId } from "react";

type FavoriteProps = {
    id: string | number;
    isFavorite: boolean;
    visitorId?: string | null;
    isButton?: boolean;
};

const Favorite: React.FC<FavoriteProps> = ({ id, isFavorite, visitorId, isButton = false }) => {
    const uniqueId = useId(); // ensures a unique ID per component

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const status = e.target.checked ? "FAVORITE" : "UNFAVORITE";
        const museumId = id;

        await updateFavorite({ museumId, status, visitorId });
    }
    

    return (
        <>
            {!isButton &&
                <label htmlFor={`favorite-${uniqueId}`} className="cursor-pointer flex h-10 w-10 rounded-full items-center justify-center bg-white hadow-100">
                    <input
                        type="checkbox"
                        name="favorite"
                        id={`favorite-${uniqueId}`}
                        value={id}
                        onChange={handleChange}
                        className="sr-only peer"
                        defaultChecked={isFavorite}
                    />
                    <Heart className="[&>*]:stroke-primary-700 peer-checked:fill-primary-700" size={20} />
                </label>
            }
            {isButton &&
                <label htmlFor={`favorite-${uniqueId}`} className="group cursor-pointer">
                    <input
                        type="checkbox"
                        name="favorite"
                        id={`favorite-${uniqueId}`}
                        value={id}
                        onChange={handleChange}
                        className="sr-only peer"
                        defaultChecked={isFavorite}
                    />
                    <div className="peer-checked:[&>svg]:fill-primary-700 hover:peer-checked:[&>svg]:fill-white flex items-center gap-3 text-btn-md border-2 border-primary-700 bg-white text-primary-700 hover:text-white hover:bg-primary-700 h-12 rounded-sm px-4">
                        <Heart className="group-hover:[&>*]:stroke-white" />
                        Favorite
                    </div>
                </label>
            }
        </>
    );
};

export default Favorite;
