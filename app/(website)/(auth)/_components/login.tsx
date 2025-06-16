"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Sms } from "iconsax-reactjs";
import Link from "next/link";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/action/auth/login-action";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "../_lib/validators";
import LoginGoogle from "./login-google";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import LoadingForm from "@/components/feature/loading/loading-form";


export const LoginForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle credentials login (your existing method)
  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Use your existing server action
      const result = await loginAction(data);
      console.log("result" ,result)
      console.log(result)
      if (result?.data?.payload?.user?.appUserRegister.role === "ROLE_MUSEUM_OWNER" && result?.data?.payload?.user?.isApproved === false) {
        toast.message("Waiting for admin approval...");
        await signOut({
              redirect: false, // Prevent automatic redirect
            });
        router.push("/");

      } else if (result?.data?.payload?.user?.appUserRegister.role === "ROLE_MUSEUM_OWNER" && result?.data?.payload?.user?.isApproved === true) {
      router.push("/museum-owner/overview");
       toast.success(result?.data?.message);

      }  else if (result?.data?.payload?.user?.appUserRegister.role === "ROLE_VISITOR") {
        toast.success(result?.data?.message);
        router.push("/");
      } 
      else if (result?.data?.payload?.user?.appUserRegister.role === "ROLE_ADMIN") {
        toast.success(result?.data?.message);
        router.push("/admin/overview");
      } else {
        toast.error(
          result?.data?.errors?.password ||
          result?.data?.errors?.message
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="mx-auto w-[33.5rem] mt-20 lg:mt-0 flex flex-col justify-start"
    >
      <div className="flex flex-col">
        <h2 className="text-h4 md:text-4xl text-primary-700">
          Welcome to SelaMonty!
        </h2>
        <h1 className="text-h4 pt-2 text-grey-900">Login</h1>
      </div>

      <fieldset className="flex flex-col gap-8 mt-5 relative z-10">
        {/* Email Field */}
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="email">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email..."
            startIcon={<Sms className="h-5 w-5 text-grey-400" />}
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

        {/* Password Field */}
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            startIcon={<Key className="h-5 w-5 text-gre y-400" />}
            togglePassword={true}
            {...register("password")}
            className={errors.password ? "border-primary-500" : ""}
            disabled={isLoading}
          />
          {errors.password && (
            <span className="text-primary-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}

          <Link
            href="/forgot-password"
            className="self-end text-primary-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full text-white"
          disabled={isLoading}
        >
          {isLoading ? <LoadingForm title="Logining..."/> : "Login"}
        </Button>

        {/* Registration and Google Sign-in */}
        <div className="flex flex-col w-full gap-5">
          <div className="flex items-center justify-center gap-2">
            <span className="text-grey-900">
              Don&apos;t have an account?
            </span>
            <Link
              href="/register"
              className="text-primary-700 hover:underline"
            >
              Register
            </Link>
          </div>

          {/* Updated Google Sign-in Button */}
          <div className="flex flex-col gap-2">
            <p className="text-s2 text-grey-900">
              Or continue with
            </p>
            <LoginGoogle />
          </div>
        </div>
      </fieldset>
    </form>
  );
};