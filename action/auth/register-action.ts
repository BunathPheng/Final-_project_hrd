"use server";

import authService from "@/service/auth/auth.service";
import { toast } from "sonner";
// Define the type for the login parameters
interface RegisterParams {
  fullName: string;
  email: string;
  password: string;
}

export const registerAction = async ({ fullName , email, password }: RegisterParams) => {


  try {
    if (!email || !password || !fullName) {
      toast.error("Email and password are required");
    }
    const result = await authService.registerSevice({ fullName , email, password });    
    return {
      success: true,
      data: result.data,
    };
    
  } catch (error) {
      toast.error(error instanceof Error ? error.message : "Register failed")
    }
};