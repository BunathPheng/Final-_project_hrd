import { FC } from "react";

// Main skeleton component with grid layout
export const MuseumSkeleton: FC = () => {
    return (
        <>
            <div className="h-96 w-full animate-pulse bg-grey-100 flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-5">
                    <div className="rounded-md bg-grey-200 w-52 h-10"></div>
                    <div className="rounded-md bg-grey-200 w-96 h-10"></div>
                </div>
            </div>
            <div className="animate-pulse pd-screen container grid gap-5">
                <div className="rounded-md bg-grey-200 w-1/5 h-10"></div>
                <div className="flex justify-between gap-5">
                    <div className="rounded-md bg-grey-200 w-1/2 h-10"></div>
                    <div className="rounded-md bg-grey-200 w-1/3 h-10"></div>
                </div>
                <div className="h-96 w-full bg-grey-100 rounded-md"></div>
            </div>
        </>
    );
}
