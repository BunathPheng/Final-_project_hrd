"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft2, Key } from "iconsax-reactjs";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { newPasswordSchema } from "../_lib/validators";
import { resetForgotPasswordActions } from "@/action/auth/reset-forgot-password-action";
import { toast } from "sonner";
import LoadingForm from "@/components/feature/loading/loading-form";

interface NewPasswordFormProps {
    token: string;
}

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ token }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewPasswordFormData>({
        resolver: zodResolver(newPasswordSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: NewPasswordFormData) => {
        setIsLoading(true);

        try {
            const result = await resetForgotPasswordActions({
                token,
                newPassword: data.password,
            });
            if (result?.data?.status === "OK") {
                toast.success(result?.data?.message)
                router.push("/login")
            } else {
                toast.error(result?.data?.errors?.message || result?.data?.errors?.newPassword)
            }
            // 

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-[33.5rem] h-screen lg:mt-0 flex flex-col justify-center"
        >
            <fieldset className="flex flex-col gap-8 mt-5 relative z-10">
                <Link href="/login">
                    <button
                        type="button"
                        className="text-grey-700 cursor-pointer -translate-x-1 hover:text-grey-900 flex items-center gap-2"
                    >
                        <ArrowLeft2 className="text-start" />
                        Back to login
                    </button>
                </Link>

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl md:text-4xl text-red-700 font-bold">
                        New Password
                    </h2>
                    <p className="text-p1 text-grey-900">Please enter your new password below</p>
                </div>


                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        {...register("password")}
                        placeholder="Enter password"
                        startIcon={<Key className="h-5 w-5 text-gray-400" />}
                        togglePassword={true}
                    />
                    {errors.password && (
                        <span className="text-red-600 text-sm">{errors.password.message}</span>
                    )}
                </div>

                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="confirmPassword">
                        Confirm Password
                    </Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                        placeholder="Confirm password"
                        startIcon={<Key className="h-5 w-5 text-gray-400" />}
                        togglePassword={true}
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? <LoadingForm title="Submiting..." /> : "Submit"}
                </Button>
            </fieldset>
        </form>
    );
};