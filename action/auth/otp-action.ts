"use server"

import authService from "@/service/auth/auth.service";

interface OtpParams {
  email: string;
  otp: string;
}

export const verifyAction = async ({email, otp}: OtpParams) => {
  try {
    
    const result = await authService.verifyService(email, otp);
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