import Maincard from '@/components/feature/card/main-card';
import { Breadcrumb } from '@/components/layout/breadcrumb'
import React, { JSX } from 'react'
import { TicketChart } from './_components/chart-ticket';
import { TicketTable } from './_components/ticket-table';
import { PriceSlot } from './_components/price-slot';
import { QRCode } from './_components/qr-code';

export default function TicketPage(): JSX.Element {

    const breadcrumbs = ["Home", "Ticket"];

    return (
        <>
            <Breadcrumb main="Tour Management" items={breadcrumbs} />
            <Maincard>
                <TicketChart />
                <div className="grid grid-cols-3 w-full gap-7">
                    <PriceSlot />
                    <QRCode />
                </div>
                <TicketTable />
            </Maincard>
        </>
    )
}
