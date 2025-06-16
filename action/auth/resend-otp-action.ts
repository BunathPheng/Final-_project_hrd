"use server"

import authService from "@/service/auth/auth.service";

interface ResendOtpParams {
  email: string;
}

export const resendOtpAction = async ({email}: ResendOtpParams) => {
  try {
    const result = await authService.resendOtpService(email)
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