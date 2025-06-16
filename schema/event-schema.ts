import { z } from "zod";

// Schema for creating an event
export const createEventSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(250, "Title must not exceed 250 characters")
        .trim(),
    subTitle: z
        .string()
        .min(1, "Subtitle is required")
        .min(3, "Subtitle must be at least 3 characters")
        .max(250, "Subtitle must not exceed 250 characters")
        .trim(),
    curator: z
        .string()
        .trim()
        .optional()
        .refine((value) => {
            if (!value || value.length === 0) return true;
            return value.length >= 3;
        }, "Curator must be at least 3 characters")
        .refine((value) => {
            if (!value || value.length === 0) return true;
            return value.length <= 100;
        }, "Curator must not exceed 100 characters"),
    startDate: z
        .string()
        .min(1, "Start date is required")
        .refine((dateString) => {
            const date = new Date(dateString);
            return !isNaN(date.getTime());
        }, "Please enter a valid date")
        .refine((dateString) => {
            const date = new Date(dateString);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date >= today;
        }, "Start date must be today or in the future"),
    endDate: z
        .string()
        .min(1, "End date is required")
        .refine((dateString) => {
            const date = new Date(dateString);
            return !isNaN(date.getTime());
        }, "Please enter a valid date")
        .refine((dateString) => {
            const date = new Date(dateString);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date >= today;
        }, "End date must be today or in the future"),
    content: z
        .string()
        .min(1, "Content is required")
        .min(100, "Content must be at least 100 characters")
        .max(5000, "Content must not exceed 5000 characters")
        .trim(),
    accessibilityNote: z
        .string()
        .trim()
        .optional()
        .refine((value) => {
            if (!value || value.length === 0) return true;
            return value.length >= 100;
        }, "Accessibility note must be at least 100 characters")
        .refine((value) => {
            if (!value || value.length === 0) return true;
            return value.length <= 5000;
        }, "Accessibility note must not exceed 5000 characters"),
    imageLinks: z
        .array(
            z
                .any()
                .refine((file) => file instanceof File, "Must be a valid file")
                .refine(
                    (file) => file.size <= 5000000,
                    "File size must be less than 5MB"
                )
                .refine(
                    (file) =>
                        [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                            "image/webp",
                        ].includes(file.type),
                    "Only JPEG, PNG, and WebP files are allowed"
                )
        )
        .min(1, "At least one image is required")
        .max(10, "Maximum 10 images allowed"),
});

export type CreateEvent = z.infer<typeof createEventSchema>;
