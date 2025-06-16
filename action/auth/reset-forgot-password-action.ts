"use server"

import authService from "@/service/auth/auth.service";

interface ResetForgotPasswordParams { 
  token : string;
  newPassword: string;
}

export const resetForgotPasswordActions = async ({token , newPassword}: ResetForgotPasswordParams) => {
  try {
    const result = await authService.resetPasswordSevice({token , newPassword});
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