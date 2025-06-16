import { z } from "zod";

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
  
  contactNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
  
  gender: z
    .enum(["Male", "Female"], {
      required_error: "Please select a gender",
    }),
  
  dob: z
    .string()
    .nullable()
    // .refine((date) => {
    //   if (!date) return true; // Allow null/empty dates
    //   const birthDate = new Date(date);
    //   const today = new Date();
    //   const age = today.getFullYear() - birthDate.getFullYear();
    //   return age >= 13 && age <= 120; // Reasonable age range
    // }, "Please enter a valid date of birth"),,
    ,
  
  profileImage: z
    .string()
    .optional()
});

export const passwordChangeSchema = z.object({
  oldPassword: z
    .string()
    .min(1, "Current password is required"),
  
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  
  confirmPassword: z
    .string()
    .min(1, "Please confirm your password")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;