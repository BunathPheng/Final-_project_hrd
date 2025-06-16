import { Button } from "@/components/ui/button";
import { SearchNormal } from "iconsax-reactjs";
import React, { FC } from "react";

export const SearchInput: FC = () => {
    return (
        <form>
            <div className="bg-grey-50 relative rounded-sm h-12 hidden sm:flex items-center px-1">
                <input
                    type="text"
                    className="outline-none px-3 w-56 placeholder:text-grey-400"
                    placeholder="What are you looking for?"
                />
                <Button size={"icon"}>
                    <SearchNormal size={18} />
                </Button>
            </div>
        </form>
    );
};
