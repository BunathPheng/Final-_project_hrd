import { Call, Sms, User } from "iconsax-reactjs";
import Image from "next/image";

export const VisitorInfo: React.FC<{ status: string; }> = ({ status }) => {
    console.log(status);

    return (
        <div className="grid gap-5 w-full">
            <h6 className="text-p2 text-grey-600">Visitor Information</h6>
            <div className="grid gap-5 w-full">
                <div className="flex items-center justify-center p-5">
                    <Image src={"/profile/man.webp"} className="w-36 h-36 rounded-full border-2 border-grey-100 object-cover" width={140} height={140} alt="Profile" />
                </div>
                <div className="rounded-md bg-slate-light px-3 py-2.5 flex gap-5 items-center">
                    <User size={24} className="[&>*]:stroke-grey-900" />
                    <dl className="flex gap-2 items-center">
                        <dt className="text-p2 text-grey-900">Visitor Name: </dt>
                        <dd className="text-p3 text-grey-900">Bunath</dd>
                    </dl>
                </div>
                <div className="rounded-md bg-slate-light px-3 py-2.5 flex gap-5 items-center">
                    <Sms size={24} className="[&>*]:stroke-grey-900" />
                    <dl className="flex gap-2 items-center">
                        <dt className="text-p2 text-grey-900">Email: </dt>
                        <dd className="text-p3 text-grey-900">bunathpheng@gmail.com</dd>
                    </dl>
                </div>
                <div className="rounded-md bg-slate-light px-3 py-2.5 flex gap-5 items-center">
                    <Call size={24} className="[&>*]:stroke-grey-900" />
                    <dl className="flex gap-2 items-center">
                        <dt className="text-p2 text-grey-900">Contact Number: </dt>
                        <dd className="text-p3 text-grey-900">087 270 311</dd>
                    </dl>
                </div>
            </div>
        </div>
    );
}
