"use server"

import authService from "@/service/auth/auth.service";

interface OtpParams {
  email: string;
}

export const verifyExpirationAction = async ({email}: OtpParams) => {
  try {
    
    const result = await authService.verifyOtpExpirationService(email)
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