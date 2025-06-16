import Innercard from "@/components/feature/card/inner-card";
import { Paypal, Ticket } from "iconsax-reactjs";
import { FC } from "react"
import { EditTicket } from "./edit-ticket";

export const PriceSlot: FC = () => {
    return (
        <Innercard className="gap-5">
            <h6 className="text-s1 text-grey-900">Pricing Slots and Price</h6>
            <p className="text-p2 text-grey-600">Note Pricing Slots</p>
            <div className="rounded-md p-3 bg-grey-50 flex items-center w-full gap-3">
                <Ticket size={24} className="[&>*]:stroke-grey-900" />
                <dl className="flex gap-1">
                    <dt className="text-p1 text-grey-900">Ticket Types:</dt>
                    <dd className="text-p1 text-grey-600">Local / Foreigner</dd>
                </dl>
            </div>
            <div className="rounded-md p-3 bg-grey-50 flex items-center w-full gap-3">
                <Paypal size={24} className="[&>*]:stroke-grey-900" />
                <dl className="flex gap-1">
                    <dt className="text-p1 text-grey-900">Payment:</dt>
                    <dd className="text-p1 text-grey-600">Online only on this site </dd>
                </dl>
            </div>
            <p className="text-p2 text-grey-600">Price Ticket</p>
            <div className="grid grid-cols-2 gap-5">
                <dl className="rounded-md bg-grey-50 p-3 flex flex-col gap-2">
                    <dt className="text-p2 text-grey-900">Local</dt>
                    <dd className="text-p1 text-grey-900">4,000 riels/1$</dd>
                </dl>
                <dl className="rounded-md bg-grey-50 p-3 flex flex-col gap-2">
                    <dt className="text-p2 text-grey-900">Foreigner</dt>
                    <dd className="text-p1 text-grey-900">20,000 riels/5$</dd>
                </dl>
            </div>
            <div className="flex w-full justify-end">
                <EditTicket />
            </div>

        </Innercard>
    );
}
