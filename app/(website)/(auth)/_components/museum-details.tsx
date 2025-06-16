"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/ui/upload-file";
import { FC, useCallback, useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputLocation } from "./input-location";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { z } from "zod";
import Image from "next/image";
import { uploadMuseumImageAction } from "@/action/auth/logo-museum-action";

// Updated type to match your registrationData
export type registrationData = {
  name: string;
  email: string;
  password: string;
  logoLink: string;
  address: string;
  lat: number;
  lng: number;
  description: string;
}

// Updated validation schema
const museumRegistrationSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  museumImage: z.array(z.instanceof(File)).optional(),
  location: z.object({
    address: z.string().min(1, "Address is required"),
    coords: z.object({
      lat: z.number(),
      lng: z.number()
    })
  })
});

type MuseumRegistrationFormData = z.infer<typeof museumRegistrationSchema>;

export const RegisterMuseumOwnerGoogleForm: FC = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const router = useRouter();
    const { data: session, status } = useSession();

    const form = useForm<MuseumRegistrationFormData>({
        resolver: zodResolver(museumRegistrationSchema),
        mode: "onChange",
        defaultValues: {
            location: {
                address: "",
                coords: { lat: 0, lng: 0 }
            },
            description: "",
            museumImage: undefined,
        }
    });

    // Redirect if not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // Handle file upload
    const handleFileUpload = useCallback(async (files: File[]) => {
        if (files.length === 0) return;
        const file = files[0];
        setIsUploading(true);
        
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Replace with your actual upload action
            const result = await uploadMuseumImageAction(formData);

            if (result.success && result.data) {
                setUploadedImageUrl(result.data.fileUrl);
                form.setValue('museumImage', [file], { shouldValidate: true });
                toast.success("Image uploaded successfully!");
            } else {
                throw new Error(result.error || 'Upload failed');
            }
        } catch (error) {
            console.error('File upload error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            toast.error(`File upload failed: ${errorMessage}`);
            setUploadedImageUrl("");
        } finally {
            setIsUploading(false);
        }
    }, [form]);

    // Handle form submission
    const onSubmit: SubmitHandler<MuseumRegistrationFormData> = useCallback(async (data) => {
        if (!session?.user) {
            toast.error("Session expired. Please sign in again.");
            router.push("/auth/signin");
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Prepare the complete registration data
            const registrationPayload: registrationData = {
                name: session.user.name || "",
                email: session.user.email || "",
                password: "", // Since using Google auth, password might be empty or generated
                logoLink: uploadedImageUrl || "", // Use uploaded image URL
                address: data.location.address,
                lat: data.location.coords.lat,
                lng: data.location.coords.lng,
                description: data.description,
            };

            console.log('Complete registration data:', registrationPayload);
            
            // TODO: Replace with your actual registration API call
            // const response = await registerMuseumOwner(registrationPayload);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            toast.success("Museum registration completed successfully!");
            
            // Navigate to success page or dashboard
            router.push('/dashboard'); // or wherever you want to redirect
            
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Registration failed';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }, [session, uploadedImageUrl, router]);

    // Handle location selection
    const handleLocationChange = useCallback((locationData: { address: string; coords: { lat: number; lng: number } }) => {
        form.setValue('location', locationData, { shouldValidate: true });
    }, [form]);

    // Show loading if session is loading
    if (status === "loading") {
        return (
            <div className="mx-auto w-[33.5rem] justify-content-center">
                <div className="flex flex-col items-center gap-4 py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700"></div>
                    <p className="text-grey-600">Loading your account information...</p>
                </div>
            </div>
        );
    }

    // Show error if not authenticated
    if (status === "unauthenticated" || !session?.user) {
        return (
            <div className="mx-auto w-[33.5rem] justify-content-center">
                <div className="flex flex-col items-center gap-4 py-8">
                    <p className="text-red-500">Please sign in to continue with registration.</p>
                    <Button onClick={() => router.push("/auth/signin")}>
                        Sign In
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-[33.5rem] justify-content-center">
            <div className="flex flex-col gap-2">
                <h1 className="text-h4 lg:text-h4 text-primary-700">
                    Complete Museum Registration
                </h1>
                <p className="text-p1 text-grey-900">
                    Welcome {session.user.name}! Please provide additional details to complete your museum registration.
                </p>
                
                {/* Display Google user info */}
                <div className="bg-grey-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-3">
                        {session.user.image && (
                            <Image 
                                src={session.user.image} 
                                alt="Profile" 
                                className="w-10 h-10 rounded-full"
                                width={500}
                                height={500}
                            />
                        )}
                        <div>
                            <p className="font-medium text-grey-900">{session.user.name}</p>
                            <p className="text-sm text-grey-600">{session.user.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset className="flex flex-col gap-8 mt-5 relative z-10 w-full">
                    {/* Museum Logo Upload */}
                    <div className="flex flex-col w-full gap-2">
                        <Controller
                            control={form.control}
                            name="museumImage"
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            render={({ field: { onChange }, fieldState: { error } }) => (
                                <FileUpload
                                    title="Museum Logo"
                                    acceptedFileTypes="PNG, JPG, JPEG, and WEBP (MAX. 5MB)"
                                    multiple={false}
                                    maxFiles={1}
                                    maxFileSizeBytes={5 * 1024 * 1024}
                                    required={false}
                                    onFileUpload={(files) => {
                                        onChange(files);
                                        handleFileUpload(files);
                                    }}
                                />
                            )}
                        />

                        {form.formState.errors.museumImage && (
                            <p className="text-red-500 text-sm">
                                {typeof form.formState.errors.museumImage?.message === "string"
                                    ? form.formState.errors.museumImage.message
                                    : "Please select a valid image file"}
                            </p>
                        )}
                    </div>

                    {/* Location Input */}
                    <div className="flex flex-col w-full gap-2">
                        <InputLocation
                            onLocationChange={handleLocationChange}
                            initialValue={form.getValues('location')}
                        />
                        {form.formState.errors.location && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.location.message ||
                                    form.formState.errors.location.address?.message ||
                                    "Please select a valid location"}
                            </p>
                        )}
                    </div>

                    {/* Museum Description */}
                    <div className="flex flex-col w-full gap-2">
                        <Label htmlFor="description">
                            Museum Description
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your museum, its collections, history, and what makes it special..."
                            className="border-1 border-grey-400 min-h-[120px]"
                            {...form.register("description")}
                        />
                        {form.formState.errors.description && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!form.formState.isValid || isUploading || isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Completing Registration...
                            </>
                        ) : (
                            "Complete Museum Registration"
                        )}
                    </Button>
                </fieldset>
            </form>
        </div>
    );
};
