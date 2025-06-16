import { JSX } from "react";
import { AuthHeader } from "@/components/layout/auth-header";
import Image from "next/image";
import { RegisterMuseumOwnerGoogleForm } from "../../_components/museum-details";
export default async function RegisterMuseumOwnerGoooglePage(): Promise<JSX.Element> {
    return (
        <>
            <AuthHeader />
            <div className="grid grid-cols-12 min-h-screen overflow-hidden">
                <div className="col-span-5 bg-primary-700 relative min-h-screen">
                    <div className="absolute bottom-0 right-[80%] w-fit h-[70px] overflow-hidden hidden lg:block">
                        <Image
                            src="/auth/romdolwhite.png"
                            className="object-cover"
                            width={110}
                            height={110}
                            alt="romdom"
                        />
                    </div>
                    <div className="absolute top-0 left-[80%] w-fit h-fit hidden lg:block">
                        <Image
                            src="/auth/romdolwhite.png"
                            className="object-cover"
                            width={110}
                            height={110}
                            alt="Romdom"
                        />
                    </div>
                    <div className="absolute ml-auto w-4/5   bottom-0 right-0">
                        <Image
                            src="/auth/museum-owner.png"
                            className="object-cover w-[30rem] hidden md:block"
                            width={900}
                            height={900}
                            alt="artifactsS"
                        />
                    </div>
                </div>
                <div className="col-span-7 my-auto relative">
                    <RegisterMuseumOwnerGoogleForm />
                </div>
                <div className="absolute bottom-0  w-[25rem] right-0">
                    <Image
                        src="/auth/angkor.svg"
                        className="object-cover w-4/6 h-auto"
                        width={840}
                        height={462}
                        alt="angkor"
                    />
                </div>

            </div>
        </>

    );

}
