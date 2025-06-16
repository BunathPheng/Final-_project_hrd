import React, { ReactElement } from "react";
import { ArrowDown, ArrowUp, Icon } from "iconsax-reactjs";

type TrendCardProps = {
    title: string;
    amount: number | 0 ;
    icon: ReactElement<Icon>;
    percent: number | 0;
};

const TrendCard: React.FC<TrendCardProps> = ({ title, amount, icon, percent }) => {
    return (
        <div className="grid w-full gap-5 p-5 rounded-md bg-white shadow-600">
            <div className="flex w-full justify-between items-start gap-3 pb-5 border-b border-grey-100">
                <div className="grid gap-4">
                    <h6 className="text-s2 text-grey-800">{title}</h6>
                    <p className="text-h5 text-grey-900">{amount}</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-grey-50 rounded-full">
                    {React.cloneElement(icon, {
                        size: "18",
                        variant: "Outline",
                        className: "[&>*]:stroke-grey-900"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any)}
                </div>
            </div>
            <div className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                    {percent > 0 && (
                        <ArrowUp size={17} className="[&>*]:stroke-green [&>*]:stroke-2" />
                    )}
                    {percent <= 0 && (
                        <ArrowDown size={17} className="[&>*]:stroke-primary-700 [&>*]:stroke-2" />
                    )}
                    <span className={`text-s2 ${percent > 0 ? "text-green" : "text-primary-700"}`}>{percent}%</span>
                </div>
                <p className="text-p1 text-grey-400">from last month</p>
            </div>
        </div >
    );
};

export default TrendCard;
