/* eslint-disable @typescript-eslint/no-unused-vars */
// Updated LoginGoogle (Visitor) component
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import LoadingForm from "@/components/feature/loading/loading-form";
import loadingImageGrey from "../../../../public/loading/loading-grey.svg"

interface LoginGoogleProps {
    handleGoogleLogin?: () => void;
    isLoading?: boolean;
}

const LoginGoogle: FC<LoginGoogleProps> = ({
    isLoading = false
}) => {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    // Handle Google login with visitor role
    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        try {
            // Pass role as URL parameter for Google auth
            await signIn("google", {
                redirect: true,
                callbackUrl: "/",
            });

        } catch (error) {
            toast.error("An error occurred during Google login");
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <>
            <Button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading || isGoogleLoading}
                className="flex items-center justify-center cursor-pointer gap-2 bg-white rounded-md border border-grey-400 px-4 py-2.5 hover:bg-grey-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGoogleLoading ? (
                    <LoadingForm title="Signing in..." imageSrc={loadingImageGrey} titleColor="text-grey-200"/>
                ) : (
                    <>
                        <Image
                            src="/auth/google.png"
                            width={24}
                            height={24}
                            alt="Google"
                        />
                        <span className="text-s1 text-grey-700">
                            Sign in with Google
                        </span>
                    </>
                )}
            </Button>
        </>
    );
};

export default LoginGoogle;