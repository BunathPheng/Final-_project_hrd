"use server";

import authService from "@/service/auth/auth.service";
import { toast } from "sonner";
interface ForgotPasswordParams {
  email: string;
}

export const forgotPasswordAction = async ({ email }: ForgotPasswordParams) => {
  try {
    if (!email) {
      toast.error("Email and forgotPassword are required");
    }
   
    const result = await authService.forgotPasswordService({ email });
    return {
      success: true,
      message: "Result forgotpassword successful",
      data: result.data,
    };
    
  } catch (error) {
      toast.error(error instanceof Error ? error.message : "forgotpassword failed")
    }
};