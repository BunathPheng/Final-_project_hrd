import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

// Regular user registration schema
export const registerSchema = z.object({
  fullName: z.string()
    .min(1, "Full name is required")
    .max(50, "Full name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password cannot be empty")
    .min(8, "Password must have at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

// Museum Owner Registration Schemas - Step by Step
export const museumRegistrationStep1Schema = z.object({
  museumName: z.string()
    .min(1, "Museum name is required")
    .min(2, "Museum name must be at least 2 characters")
    .max(100, "Museum name cannot exceed 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

export const museumRegistrationStep2Schema = z.object({
  museumImage: z
    .any()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true; // Optional field
      return files[0]?.size <= 5000000; // 5MB limit
    }, "File size should be less than 5MB")
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'].includes(files[0]?.type);
    }, "Only SVG, PNG, JPG or GIF files are allowed"),
  location: z.object({
    address: z.string().min(1, "Location is required"),
    coords: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  description: z.string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
});

// Complete museum registration schema (combining both steps)
export const completeMuseumRegistrationSchema = museumRegistrationStep1Schema.merge(
  museumRegistrationStep2Schema
);

// Password reset schemas
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
});

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Export types for TypeScript
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type MuseumRegistrationStep1Data = z.infer<typeof museumRegistrationStep1Schema>;
export type MuseumRegistrationStep2Data = z.infer<typeof museumRegistrationStep2Schema>;
export type CompleteMuseumRegistrationData = z.infer<typeof completeMuseumRegistrationSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

// Location type for the InputLocation component
export type LocationData = {
  address: string;
  coords: {
    lat: number;
    lng: number;
  };
};