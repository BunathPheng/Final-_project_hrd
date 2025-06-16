import { JSX } from "react";
import { RegisterForm } from "../../_components/register";
import Image from "next/image";
import { AuthHeader } from "@/components/layout/auth-header";
export default function RegisterVisitorPage(): JSX.Element {
    return (
        <>
            <AuthHeader />
            <RegisterForm />
            <div className="absolute bottom-0 right-0 z-10">
                <Image
                    src="/auth/apsora-right.svg"
                    className="object-cover w-[20rem] hidden md:block"
                    width={680}
                    height={680}
                    alt="Apsara"
                />
            </div>
            <div className="absolute bottom-0 left-0 w-fit h-fit">
                <Image
                    src="/auth/angkor.svg"
                    className="object-cover  w-4/5 h-auto"
                    width={813}
                    height={462}
                    alt="Angkor"
                />
            </div>
            <div className="absolute top-1/2 -left-12 w-fit h-fit hidden lg:block">
                <Image
                    src="/auth/romdol.svg"
                    className="object-cover"
                    width={160}
                    height={160}
                    alt="Romdom"
                />
            </div>
            <div className="absolute top-1/7 right-10 lg:right-10 w-fit h-fit">
                <Image
                    src="/auth/romdol.svg"
                    className="object-cover rotate-10"
                    width={140}
                    height={140}
                    alt="Romdom"
                />
            </div>
        </>
    );

}