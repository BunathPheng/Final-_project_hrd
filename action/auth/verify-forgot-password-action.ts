"use server"

import authService from "@/service/auth/auth.service";

interface verifyForgotPasswordParams {
  email: string;
  otp: string;
}

export const verifyForgotPasswordAction = async ({email, otp}: verifyForgotPasswordParams) => {
  try {
    
    const result = await authService.verifyForgotPasswordService(email, otp);
    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      return {
        success: false,
      };
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong. Please try again."
    };
  }
};