import Image from "next/image"
import QR from "../../../public/qr/qr-1.png";
import bank from "../../../public/qr/ppcbank.svg"
import webill from "../../../public/banner/webill365_logo.svg";
export default function QrCode() {
    return (
        <>
            <div className="p-2  flex flex-col lg:flex-row gap-8">
                <div className="flex-1 items-end space-y-6">
                    <div>
                        <h3 className="text-h4 font-semibold text-grey-00 mb-4">Payment Method</h3>
                        <p className="text-grey-600">Scan to pay with KHQR or transfer to Virtual Account</p>
                    </div>

                    <div className="space-y-4">
                        <Image src={bank} alt="ppcbank" className="object-cover" width={200} height={200} />

                        <div className="space-y-3">
                            <div>
                                <h4 className="text-gray-500 font-medium">Bank Name</h4>
                                <p className="text-gray-800 font-medium">Phnom Penh Commercial Bank</p>
                            </div>

                            <div>
                                <h4 className="text-gray-500 font-medium">Bill account no.</h4>
                                <p className="text-gray-800 font-medium">9700000075405(PHENG BUNATH)</p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-200">
                        <div className="flex items-center  gap-2">
                            <span className="text-gray-500">Powered by :</span>
                            <Image src={webill} alt="qr" width={100} height={100} className="object-cover  p-3" />

                        </div>
                    </div>
                </div>
                <Image src={QR} alt="qr" width={300} height={400} className="object-cover  p-3" />
            </div>
        </>
    )
}