import Image from "next/image";

export const VisitorInfo = () => {
    return (
        <section className="grid w-full content-start">
            <div className="w-full pb-3 border-b border-grey-100">
                <span className="text-s1 text-primary-700">Personal Information</span>
            </div>
            <div className="grid gap-5">
                <div className="w-full flex items-center justify-center mt-5">
                    <Image src={"/profile/man.webp"} className="w-28 h-28 object-cover rounded-full" width={130} height={130} alt="Profile" />
                </div>
                <div className="grid grid-cols-2 gap-5 [&>*>*>dt]:w-32">
                    <div className="grid gap-5 content-start">
                        <dl className="flex gap-2">
                            <dt className="text-s2 text-grey-900">Full Name:</dt>
                            <dd className="text-p1 text-grey-800">Bunath</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="text-s2 text-grey-900">Gender:</dt>
                            <dd className="text-p1 text-grey-800">Female</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="text-s2 text-grey-900">Email:</dt>
                            <dd className="text-p1 text-grey-800">bunath@gmail.com</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="text-s2 text-grey-900">Tel:</dt>
                            <dd className="text-p1 text-grey-800">097 435 3567</dd>
                        </dl>
                    </div>
                    <div className="grid gap-5 content-start">
                        <dl className="flex gap-2">
                            <dt className="text-s2 text-grey-900">Date of Birth:</dt>
                            <dd className="text-p1 text-grey-800">April ,08 2004</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="text-s2 text-grey-900">Joint Since:</dt>
                            <dd className="text-p1 text-grey-800">May ,12 2025</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="text-s2 text-grey-900">Last Update:</dt>
                            <dd className="text-p1 text-grey-800">May ,15 2025</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
