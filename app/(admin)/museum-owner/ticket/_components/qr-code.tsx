import Innercard from "@/components/feature/card/inner-card";
import { Camera } from "iconsax-reactjs";
import Image from "next/image";
import { FC } from "react";
import { SearchCode } from "./search-code";
import { ScanQR } from "./scan-qr";



export const QRCode: FC = () => {
    

    return (
        <Innercard className="col-span-2 content-start gap-5">
            <div className="flex items-center gap-3">
                <Camera size={24} className="[&>*]:stroke-grey-900" />
                <h6 className="text-s1 text-grey-900">
                    QR Code Ticket Validation
                </h6>
            </div>
            <p className="text-p2 text-grey-600">
                Visitors are required to present their QR code at the entrance.
                Please scan the QR code using the camera or scanner device to
                validate the ticket. The ticket information will be shown
                immediately after scanning.
            </p>
            <Image
                src={"/qr/scan-qr.jpg"}
                className="object-cover w-36 h-auto mx-auto py-8"
                width={145}
                height={185}
                alt="Scan QR"
            />
            <div className="flex w-full justify-end">
                <div className="flex gap-5">
                    <SearchCode />
                    <ScanQR/>
                </div>
            </div>
        </Innercard>
    );
};
