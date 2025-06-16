import { OtpForm } from "../../_components/otp";
import Image from "next/image";
import { AuthHeader } from "@/components/layout/auth-header";
import authService from "@/service/auth/auth.service";

interface OtpPageProps {
    searchParams: Promise<{
        email?: string;
        fullName?: string;
    }>;
}

export default async function OtpPage({ searchParams }: OtpPageProps){
    const resolvedSearchParams = await searchParams;
    const email = resolvedSearchParams?.email || "";
    console.log(email)
    const otpExpiration = await authService.verifyOtpExpirationService(email);  
    const expiration  = otpExpiration?.data?.payload?.expiration;
    return (
        <>
            <AuthHeader/>
            {/* Pass the query parameters to OtpForm */}
            <OtpForm email={email} expiration={expiration} />
            
            <div className="absolute bottom-0 right-0">
                <Image
                    src="/auth/apsora-right.svg"
                    className="object-cover w-[20rem] z-10 hidden md:block"
                    width={680}
                    height={680}
                    alt="Apsara"
                />
            </div>
            <div className="absolute bottom-0 w-fit z-0 h-fit">
                <Image
                    src="/auth/angkor-wat(1).svg"
                    className="object-cover w-[70%] h-auto"
                    width={600}
                    height={500}
                    alt="Angkor"
                />      
            </div>
            <div className="absolute top-1/2 -left-14 w-fit h-fit hidden lg:block">
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