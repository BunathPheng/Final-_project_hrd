import { ArchiveAdd, DollarCircle, Status, TickCircle, Timer1 } from "iconsax-reactjs";

export const TourInfo: React.FC<{ status: string; }> = ({ status }) => {

    return (
        <div className="grid gap-5 w-full">
            <h6 className="text-p2 text-grey-600">Tour Information</h6>
            <div className="grid gap-5 w-full">
                {status != "request" &&
                    <div className="rounded-md bg-slate-light px-3 py-2.5 flex gap-5 items-center">
                        <DollarCircle size={24} className="[&>*]:stroke-grey-900" />
                        <dl className="flex gap-2 items-center">
                            <dt className="text-p2 text-grey-900">Tour Price:</dt>
                            <dd className="text-p2 text-grey-400">40,000 riels / $10</dd>
                        </dl>
                    </div>
                }
                <div className="rounded-md bg-slate-light px-3 py-2.5 flex gap-5 items-center">
                    <Status size={24} className="[&>*]:stroke-grey-900" />
                    <dl className="flex gap-2 items-center">
                        <dt className="text-p2 text-grey-900">Tour Status:</dt>
                        <dd>
                            {status == "request" && (
                                <div className="flex items-center gap-2 w-fit mx-auto rounded-full px-3 py-1.5 bg-light-blue">
                                    <ArchiveAdd size={20} className="[&>*]:stroke-blue" />
                                    <span className="text-p3 text-blue">Request</span>
                                </div>
                            )}
                            {status == "unpaid" && (
                                <div className="flex items-center gap-2 w-fit mx-auto rounded-full px-3 py-1.5 bg-yellow/25">
                                    <Timer1 size={20} className="[&>*]:stroke-yellow" />
                                    <span className="text-p3 text-yellow">Unpaid</span>
                                </div>
                            )}
                            {status == "paid" && (
                                <div className="flex items-center gap-2 w-fit mx-auto rounded-full px-3 py-1.5 bg-light-green">
                                    <TickCircle size={20} className="[&>*]:stroke-green" />
                                    <span className="text-p3 text-green">Paid</span>
                                </div>
                            )}
                        </dd>
                    </dl>
                </div>
            </div>
        </div >
    );
}
