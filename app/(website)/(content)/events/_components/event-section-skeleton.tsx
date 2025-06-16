import React, {FC} from "react";

export const EventSectionSkeleton: FC = () => {
    return (
        <>
            <section className="grid gap-7 w-full">
                <div className="rounded-md bg-grey-200 w-1/3 h-10 mx-auto"></div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="w-1/5 h-6 bg-grey-200 rounded-md"></div>
                    <div className="w-1/3 h-12 bg-grey-200 rounded-md"></div>

                </div>
            </section>
        </>
    );
}
