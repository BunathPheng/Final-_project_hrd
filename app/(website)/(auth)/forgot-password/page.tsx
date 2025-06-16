import { AuthHeader } from "@/components/layout/auth-header";
import Image from "next/image";
import { JSX } from "react";
import { ForgotPasswordForm } from "../_components/forgot-password";

export default function ForgetPasswordPage(): JSX.Element {
    return (
        <>
            <div className="relative w-full min-h-screen p-6 flex items-center justify-between">
                <AuthHeader />
                <ForgotPasswordForm />
                <div className="absolute bottom-0 left-0">
                    <Image
                        src="/auth/apsara.svg"
                        className="object-cover w-[20rem] hidden md:block"
                        width={680}
                        height={680}
                        alt="apsara"
                    />
                </div>
                <div className="absolute bottom-0 right-0 w-fit h-fit">
                    <Image
                        src="/auth/angkor.svg"
                        className="object-cover ml-auto w-4/5 h-auto"
                        width={813}
                        height={462}
                        alt="angkor"
                    />
                </div>

                <div className="absolute top-1/7 right-10 lg:right-10 w-fit h-fit">
                    <Image
                        src="/auth/romdol.svg"
                        className="object-cover rotate-10"
                        width={140}
                        height={140}
                        alt="romdom"
                    />
                </div>
                <div className="absolute top-4/7 right-1/7 w-fit h-fit hidden lg:block">
                    <Image
                        src="/auth/romdol.svg"
                        className="object-cover rotate-10"
                        width={140}
                        height={140}
                        alt="romdom"
                    />
                </div>
            </div>
        </>
    );

}