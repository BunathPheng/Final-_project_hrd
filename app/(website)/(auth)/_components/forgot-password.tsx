"use client"
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft2, Sms } from "iconsax-reactjs";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormData, forgotPasswordSchema } from "../_lib/validators";
import { forgotPasswordAction } from "@/action/auth/forgot-password-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoginGoogle from "./login-google";
import LoadingForm from "@/components/feature/loading/loading-form";
export const ForgotPasswordForm: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    // Handle credentials login (your existing method)
    const handleForgotPassword = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        try {
            // Use your existing server action
            const result = await forgotPasswordAction(data);
            console.log("result forgot" , result)
            
            const queryParams = new URLSearchParams({
                email: data.email,
                ...(result?.data?.userId && { userId: result.data.userId.toString() }),
                ...(result?.data?.token && { token: result.data.token })
            });
            if(result?.data?.status === 400)
            {
                toast.success(result?.data?.errors?.message);
            }else{
                toast.success(result?.data?.message);
                router.push(`forgot-password/otp-forgot-password?${queryParams.toString()}`);
            }
            
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form
            onSubmit={handleSubmit(handleForgotPassword)}
            className="mx-auto w-[33.5rem] lg:mt-0 flex flex-col justify-center"

        >

            <Link href={"/login"} className="text-grey-700 cursor-pointer max-w-fit  hover:text-grey-900 flex items-center gap-2 mb-6 ">
                <ArrowLeft2 className="text-start" />
                Back login
            </Link>

            <div className="flex flex-col gap-6 justify-center items-start">
                <div className="flex flex-col gap-2">
                    <h1 className="text-h4  lg:text-h4 text-primary-700">
                        Forgot your password?
                    </h1>
                    <div className="text-p1 text-grey-900 ">
                        <p>Don’t worry, happens to all of us.</p>
                        <p>Enter your email below to recover your password</p>
                    </div>
                </div>
                {/* Email Field */}
                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="email">
                        Email Address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email..."
                        startIcon={<Sms className="h-5 w-5 text-gray-400" />}
                        {...register("email")}
                        className={errors.email ? "border-primary-500" : ""}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <span className="text-primary-500 text-sm mt-1">
                            {errors.email.message}
                        </span>
                    )}
                </div>

                <Button type="submit" className="w-full text-white"
                    disabled={isLoading}>
                    {
                        isLoading ? <LoadingForm title="Submiting..."/> : "Submit"
                    }

                </Button>

                <div className="flex flex-col gap-2 w-full">
                    <p className="text-s2 text-grey-900">
                        Or continue with
                    </p>
                    <LoginGoogle />
                </div>
            </div>
        </form>

    );
};