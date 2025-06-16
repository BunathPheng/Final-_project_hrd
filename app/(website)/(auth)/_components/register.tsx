/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, Sms, User } from 'iconsax-reactjs';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import loadingImage from "../../../../public/loading/loading.svg"


// Import your schema and types (you'll need to define these)
import { registerSchema, RegisterFormData } from '../_lib/validators';
import { registerAction } from '@/action/auth/register-action';
import LoginGoogle from './login-google';
import Image from 'next/image';
import { toast } from 'sonner';

export const RegisterForm: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    // Handle registration (fixed method name and logic)
const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
        // Use register action instead of login action
        const result = await registerAction(data);
        if (result?.data?.status == "CREATED") {
            toast.success(result?.data?.message);
            // Navigate to OTP page with query parameters
            const queryParams = new URLSearchParams({
                email: data.email,
                // Add other relevant data you want to pass
                ...(data.fullName && { fullName: data.fullName }),
                ...(result?.data?.userId && { userId: result.data.userId.toString() }),
                ...(result?.data?.token && { token: result.data.token })
            });
            
            router.push(`/register/otp?${queryParams.toString()}`);
            
        } else {
            const errors = result?.data?.errors;
            if (errors && (errors.email || errors.password || errors.fullName || errors.message)) {
                toast.error(
                    errors.email ||
                    errors.password ||
                    errors.fullName ||
                    errors.message
                );
            }
        }
    } catch (error) {
        toast.error("An error occurred during registration");
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className="relative w-full min-h-screen p-6 flex items-center justify-center">
            <form onSubmit={handleSubmit(handleRegister)} className="mx-auto w-[33.5rem]">
                <div className="flex flex-col gap-1">
                    <h1 className="text-h4 lg:text-h4 text-primary-700">
                        Registration
                    </h1>
                    <p className="text-p1 text-grey-900">
                        Enter your details to register
                    </p>
                </div>

                <fieldset className="flex flex-col gap-7 mt-5 relative z-10 w-full">
                    {/* Full Name Field */}
                    <div className="flex flex-col w-full gap-2">
                        <Label htmlFor="fullName">
                            Full Name
                        </Label>
                        <Input
                            id="fullName"
                            type="text"
                            startIcon={<User className="h-5 w-5 text-gray-400" />}
                            placeholder="Full Name"
                            {...register("fullName")}
                        />
                        {errors.fullName && (
                            <span className="text-red-500 text-sm">{errors.fullName.message}</span>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col w-full gap-2">
                        <Label htmlFor="email">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            startIcon={<Sms className="h-5 w-5 text-gray-400" />}
                            {...register("email")}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col w-full gap-2">
                        <Label htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            startIcon={<Key className="h-5 w-5 text-gray-400" />}
                            togglePassword={true}
                            {...register("password")}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        className='w-full'
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Image src={loadingImage} className="w-7 h-7 object-cover" alt="loading" />
                        ) : (
                            <span>Register</span>
                        )}
                    </Button>

                    <div className="flex flex-col w-full gap-5">
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-gray-900">
                                Already have an account?
                            </span>
                            <Link
                                href="/login"
                                className="text-red-700 hover:underline"
                            >
                                Login
                            </Link>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-s2 text-grey-900">
                                Or continue with
                            </p>
                            <LoginGoogle />
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};