"use server";

import { signIn } from "@/auth";
import authService from "@/service/auth/auth.service";
import { toast } from "sonner";
// Define the type for the login parameters
interface LoginParams {
  email: string;
  password: string;
}

export const loginAction = async ({ email, password }: LoginParams) => {
  try {
    if (!email || !password) {
      toast.error("Email and password are required");
    }

    const result = await authService.loginService({ email, password });
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      data: result.data,
    };

  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Login failed")
  }
};