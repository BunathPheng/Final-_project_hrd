import { Calendar, Ticket } from "iconsax-reactjs";

export const BookingInfo: React.FC<{ status: string; }> = ({ status }) => {
    console.log(status);

    return (
        <div className="grid gap-5 w-full">
            <h6 className="text-p2 text-grey-600">Booking Information</h6>
            <div className="grid gap-5 w-full">
                <div className="rounded-md bg-slate-light px-3 py-2.5 flex gap-5 items-center">
                    <Calendar size={24} className="[&>*]:stroke-grey-900" />
                    <dl className="flex gap-2 items-center">
                        <dt className="text-p2 text-grey-900">Booking Date: </dt>
                        <dd className="text-p3 text-grey-900">May 12, 2025</dd>
                    </dl>
                </div>
                <div className="rounded-md bg-slate-light px-3 py-2.5 flex gap-5 items-center">
                    <Calendar size={24} className="[&>*]:stroke-grey-900" />
                    <dl className="flex gap-2 items-center">
                        <dt className="text-p2 text-grey-900">Expired Date:</dt>
                        <dd className="text-p3 text-grey-900">May 15, 2025</dd>
                    </dl>
                </div>
                <div className="rounded-md bg-slate-light px-3 py-2.5 flex gap-5 items-center">
                    <Ticket size={24} className="[&>*]:stroke-grey-900" />
                    <dl className="flex gap-2 items-center">
                        <dt className="text-p2 text-grey-900">Ticket Status:</dt>
                        <dd className="text-p3 text-green">Valid</dd>
                    </dl>
                </div>
                <div className="rounded-md bg-slate-light px-3 py-2.5 flex gap-5 items-center">
                    <Ticket size={24} className="[&>*]:stroke-grey-900" />
                    <dl className="flex gap-2 items-center">
                        <dt className="text-p2 text-grey-900">Total Ticket:</dt>
                        <dd className="text-p3 text-grey-900">12</dd>
                    </dl>
                </div>
            </div>
        </div>
    );
}
