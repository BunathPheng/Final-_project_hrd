import { z } from "zod";

// Schema for editing/updating a zone
export const editZoneSchema = z.object({
    name: z
        .string()
        .min(1, "Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title must not exceed 50 characters")
        .trim(),
    categoryId: z.string().min(1, "Category is required"),
    videoLink: z
        .string()
        .url("Invalid URL format")
        .optional()
        .or(z.literal("")),
    description: z.string().optional(),
    pictureLink: z.string().url("Invalid image URL").optional(),
    file: z
        .instanceof(File)
        .optional()
        .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
            message: "File size must be less than 5MB",
        })
        .refine(
            (file) =>
                !file ||
                ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
                    file.type
                ),
            {
                message: "File type must be JPG, JPEG, PNG, or WEBP",
            }
        ),
});

export type EditZone = z.infer<typeof editZoneSchema>;
