"use server";

import { FileProps } from "@/types/file";
import { ApiResponse, ErrorResponse } from "@/types/response";

type FileComponentProps = {
    file: File;
    type: "LOGO" | "IMAGE" | "ARTIFACT3D";
};

export const uploadFile = async ({ file, type }: FileComponentProps) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const headers: Record<string, string> = {
            Accept: "*/*",
        };

        // Use the correct endpoint from your API documentation
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/file/upload?bucketType=${type}`,
            {
                method: "POST",
                headers,
                body:
                    file instanceof File ? formData : JSON.stringify(formData),
            }
        );

        const data: ApiResponse<FileProps> = await response.json();
        return data;
    } catch (err) {
        // Handle errors consistently
        const errorMessage =
            err instanceof Error ? err.message : "An unexpected error occurred";

        // Return a typed error response
        const errorResponse: ErrorResponse = {
            status: 500,
            message: errorMessage,
        };
        return errorResponse as unknown as ApiResponse<FileProps>; // Cast to satisfy return type
    }
};
