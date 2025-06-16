/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";

interface InnercardProps extends PropsWithChildren {
    className?: string;
    [key: string]: any; // for spreading additional props
}

export const Innercard: FC<InnercardProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn("grid w-full p-5 bg-white shadow-600 rounded-md", className)} {...props}>
            {children}
        </div>
    );
};

export default Innercard;
