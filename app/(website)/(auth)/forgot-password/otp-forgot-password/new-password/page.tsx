
import Image from "next/image";
import { AuthHeader } from "@/components/layout/auth-header";
import { NewPasswordForm } from "../../../_components/new-password";

interface NewPasswordPageProps {
    searchParams: Promise<{
        token?: string;
    }>;
}

export default async function NewPassword({ searchParams }: NewPasswordPageProps) {
    const resolvedSearchParams = await searchParams;
    const token = resolvedSearchParams?.token || "";
    return (
        <>
            <AuthHeader />
            <div className="grid grid-cols-12 min-h-screen overflow-hidden">
                <div className="col-span-7 relative">
                    <NewPasswordForm token={token} />
                    <div className="absolute bottom-0 left-0">
                        <Image
                            src="/auth/angkor.svg"
                            className="object-cover w-4/6 h-auto"
                            width={840}
                            height={462}
                            alt="angkor"
                        />
                    </div>
                    <div className="absolute top-0 left-[80%] w-fit h-fit hidden lg:block">
                        <Image
                            src="/auth/romdol.svg"
                            className="object-cover"
                            width={140}
                            height={140}
                            alt="aomdom"
                        />
                    </div>
                </div>
                <div className="col-span-5 bg-primary-700 relative min-h-screen">
                    <div className="absolute top-0 right-[80%] w-fit h-fit hidden lg:block">
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
                            src="/auth/apsara1.png"
                            className="object-cover w-[20rem] hidden md:block"
                            width={680}
                            height={680}
                            alt="apsara"
                        />
                    </div>
                    <div className="absolute bottom-0 right-[80%] w-fit h-[70px] overflow-hidden hidden lg:block">
                        <Image
                            src="/auth/romdolwhite.png"
                            className="object-cover"
                            width={110}
                            height={110}
                            alt="romdom"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}