"use server";
import { ApiResponse } from "@/types/response";
import { apiRequest } from "@/utils/api";
import { revalidatePath } from "next/cache";

export interface UpdateProfileProps {
    fullName: string;
    contactNumber: string;
    gender: string;
    dob: string | null;
    profileImageLink: string;
}

export const updateProfileAction = async (data: UpdateProfileProps) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await apiRequest<ApiResponse<any>>(
            `/profile/visitor`, // Fixed the typo from `/profile/visitor}`
            {
                method: "PUT",
                body: data,
            }
        );

        // Revalidate the profile page to show updated data
        revalidatePath("/profile");
        
        return {
            success: true,
            data: response,
            message: "Profile updated successfully"
        };
    } catch (error) {
        console.error("Profile update error:", error);
        
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
                message: "Failed to update profile"
            };
        }
        
        return {
            success: false,
            error: "Unknown error occurred",
            message: "Failed to update profile"
        };
    }
};

export interface UpdatePasswordProps {
    oldPassword: string;
    newPassword: string;
}

export const updatePasswordAction = async (data: UpdatePasswordProps) => {
    console.log("oldPassword" ,data.oldPassword)
        console.log("oldPassword" ,data.newPassword)


    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await apiRequest<ApiResponse<any>>(
            `/auths/change-password`, // Adjust this endpoint as needed
            {
                method: "PATCH", // or "POST" depending on your API
                body: data,
            }
        );

        // Revalidate the profile page
        revalidatePath("/profile");
        
        return {
            response
        };
    } catch (error) {
        console.error("Password update error:", error);
        
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
                message: "Failed to update password"
            };
        }
        
        return {
            success: false,
            error: "Unknown error occurred",
            message: "Failed to update password"
        };
    }
};