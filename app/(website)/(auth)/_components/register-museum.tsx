"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/ui/upload-file";
import { Key, Sms, Building, ArrowLeft2 } from "iconsax-reactjs";
import Link from "next/link";
import { FC, useState, useEffect, useCallback, useTransition } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputLocation } from "./input-location";
import { toast } from "sonner";

import {
    museumRegistrationStep1Schema,
    museumRegistrationStep2Schema,
    type MuseumRegistrationStep1Data,
    type MuseumRegistrationStep2Data,
    type CompleteMuseumRegistrationData,
    type LocationData
} from "../_lib/validators";
import { registerMuseumAction, registerMuseumWithImageAction, uploadMuseumImageAction } from "@/action/auth/logo-museum-action";
import { useRouter } from "next/navigation";
import LoginGoogleMuseumOwner from "./login-google-museum-owner";
import LoadingForm from "@/components/feature/loading/loading-form";

interface RoleProps {
    role: "visitor" | "museum-owner" | "";
}

export const RegisterMuseumOwnerForm: FC<RoleProps> = ({ role }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    // Form hooks with Zod validation
    const step1Form = useForm<MuseumRegistrationStep1Data>({
        resolver: zodResolver(museumRegistrationStep1Schema),
        mode: "onChange",
        defaultValues: {
            museumName: "",
            email: "",
            password: "",
        }
    });

    const step2Form = useForm<MuseumRegistrationStep2Data>({
        resolver: zodResolver(museumRegistrationStep2Schema),
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

    // Store form data to persist between steps
    const [formData, setFormData] = useState<Partial<CompleteMuseumRegistrationData>>({});

    // Handle file upload using Server Action
    const handleFileUpload = useCallback(async (files: File[]) => {
        if (files.length === 0) return;
        const file = files[0]; // Take only the first file for single upload
        setIsUploading(true);
        try {

            // Create FormData for server action
            const formData = new FormData();
            formData.append('file', file);

            // Call server action
            const result = await uploadMuseumImageAction(formData);

            if (result.success && result.data) {
                setUploadedImageUrl(result.data.fileUrl);
                // Update form value
                step2Form.setValue('museumImage', [file], { shouldValidate: true });
                toast.success("Image uploaded successfully!");
            } else {
                throw new Error(result.error || 'Upload failed');
            }

        } catch (error) {
            console.error('❌ Client: File upload error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            toast.error(`File upload failed: ${errorMessage}`);
            setUploadedImageUrl("");
        } finally {
            setIsUploading(false);
        }
    }, [step2Form]);

    // Handle step 1 submission (going to next step)
    const onStep1Submit: SubmitHandler<MuseumRegistrationStep1Data> = useCallback((data) => {
        setFormData(prev => ({ ...prev, ...data }));
        setCurrentStep(2);
    }, []);

    // Handle step 2 submission using your museum registration service
    const onStep2Submit: SubmitHandler<MuseumRegistrationStep2Data> = useCallback(async (data) => {
        const completeData: CompleteMuseumRegistrationData = {
            ...formData as MuseumRegistrationStep1Data,
            ...data,
        };

        // Use transition for server action
        startTransition(async () => {
            try {
                // Prepare data for your museum registration service
                const registrationData = {
                    museumName: completeData.museumName,
                    email: completeData.email,
                    password: completeData.password,
                    locationAddress: completeData.location.address,
                    latitude: completeData.location.coords.lat,
                    longitude: completeData.location.coords.lng,
                    description: completeData.description,
                    imageUrl: uploadedImageUrl, // Logo link from uploaded image
                };

                // Call server action that uses your registration service
                const result = await registerMuseumAction(registrationData);
                console.log("result" , result)
                if (result?.data?.status === "CREATED") {
                    toast.success('message' in result && result.message ? result.message : "Museum registration completed successfully!");

                    // Reset forms and state
                    step1Form.reset();
                    step2Form.reset();
                    setFormData({});
                    setUploadedImageUrl("");
                    setCurrentStep(1);
                    router.push("")

                    // Navigate to OTP page with query parameters
                    const queryParams = new URLSearchParams({
                        email: result.data?.payload?.email,
                        // Add other relevant data you want to pass
                        ...(result?.data?.userId && { userId: result.data.userId.toString() }),
                        ...(result?.data?.token && { token: result.data.token })
                    });

                    router.push(`/register/otp?${queryParams.toString()}`);
                    // Optional: Redirect to success page or dashboard
                    // You can add redirect logic here

                } else {
                    toast.error(result?.data?.errors?.email)
                }

            } catch (error) {
                console.error("❌ Client: Registration error:", error);
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                toast.error(`Registration failed: ${errorMessage}`);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, step1Form, step2Form, uploadedImageUrl]);

    // Alternative: Handle form submission with combined action (FormData approach)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleCombinedFormSubmission = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formElement = event.currentTarget;
        const formData = new FormData(formElement);

        // Add step 1 data to FormData
        const step1Data = step1Form.getValues();
        formData.append('museumName', step1Data.museumName);
        formData.append('email', step1Data.email);
        formData.append('password', step1Data.password);

        // Add location data
        const locationData = step2Form.getValues('location');
        formData.append('locationAddress', locationData.address);
        formData.append('latitude', locationData.coords.lat.toString());
        formData.append('longitude', locationData.coords.lng.toString());

        startTransition(async () => {
            try {
                const result = await registerMuseumWithImageAction(formData);

                if (result.success) {
                    toast.success('message' in result && result.message ? result.message : "Museum registration completed successfully!");

                    // Reset forms and state
                    step1Form.reset();
                    step2Form.reset();
                    setFormData({});
                    setUploadedImageUrl("");
                    setCurrentStep(1);
                } else {
                    toast.error(result.error || "Registration failed");
                }
            } catch (error) {
                console.error("❌ Client: Combined registration error:", error);
                toast.error("Registration failed");
            }
        });
    }, [step1Form, step2Form]);

    // Handle back button click
    const handleBackClick = useCallback((e: { preventDefault: () => void; stopPropagation: () => void; }) => {
        e.preventDefault();
        e.stopPropagation();

        const currentStep2Data = step2Form.getValues();
        setFormData(prev => ({ ...prev, ...currentStep2Data }));

        setCurrentStep(1);
    }, [step2Form]);

    // Handle location selection from InputLocation component
    const handleLocationChange = useCallback((locationData: LocationData) => {
        step2Form.setValue('location', locationData, { shouldValidate: true });
    }, [step2Form]);

    // Load saved data when switching steps
    useEffect(() => {
        if (currentStep === 1 && formData.museumName) {
            step1Form.reset({
                museumName: formData.museumName || "",
                email: formData.email || "",
                password: formData.password || "",
            });
        }

        if (currentStep === 2) {
            step2Form.reset({
                location: formData.location || { address: "", coords: { lat: 0, lng: 0 } },
                description: formData.description || "",
                museumImage: formData.museumImage,
            });
        }
    }, [currentStep, formData, step1Form, step2Form]);

    // Step 1 - Personal Details Form
    const renderStep1 = () => (
        <form className="mx-auto w-[33.5rem] justify-content-center" onSubmit={step1Form.handleSubmit(onStep1Submit)}>
            <div className="flex flex-col gap-1">
                <h1 className="text-h4 lg:text-h4 text-primary-700">
                    Museum Details
                </h1>
                <p className="text-p1 text-grey-900">
                    Enter your personal details to register
                </p>
            </div>

            <fieldset className="flex flex-col gap-8 mt-5 relative z-10 w-full">
                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="museumName">
                        Museum Name
                    </Label>
                    <Input
                        id="museumName"
                        type="text"
                        startIcon={<Building className="h-5 w-5 text-grey-400" />}
                        placeholder="Museum Name"
                        {...step1Form.register("museumName")}
                    />
                    {step1Form.formState.errors.museumName && (
                        <p className="text-red-500 text-sm">
                            {step1Form.formState.errors.museumName.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="email">
                        Email Address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        startIcon={<Sms className="h-5 w-5 text-gray-400" />}
                        {...step1Form.register("email")}
                    />
                    {step1Form.formState.errors.email && (
                        <p className="text-red-500 text-sm">
                            {step1Form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        startIcon={<Key className="h-5 w-5 text-gray-400" />}
                        togglePassword={true}
                        {...step1Form.register("password")}
                    />
                    {step1Form.formState.errors.password && (
                        <p className="text-red-500 text-sm">
                            {step1Form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                <Button type="submit" disabled={!step1Form.formState.isValid || isPending}>
                    <span>Next</span>
                </Button>

                <div className="flex flex-col w-full gap-5">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-900">
                            Already have an account?
                        </span>
                        <Link
                            href="/login"
                            className="text-red-700 hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-s2 text-grey-900">
                            Or continue with
                        </p>
                        <LoginGoogleMuseumOwner role={role} />
                    </div>
                </div>
            </fieldset>
        </form>
    );

    // Step 2 - Museum Details Form with Your Registration Service
    const renderStep2 = () => (
        <div className="mx-auto w-[33.5rem] justify-content-center">
            <div className="flex flex-col gap-2">
                <button
                    type="button"
                    onClick={handleBackClick}
                    className="flex items-center gap-2 text-grey-700 hover:text-grey-900 transition-colors cursor-pointer self-start mb-2 relative z-50 pointer-events-auto bg-transparent border-none p-2 -ml-2"
                    style={{ zIndex: 9999 }}
                >
                    <ArrowLeft2 size={16} />
                    <span>Back</span>
                </button>
                <h1 className="text-h4 lg:text-h4 text-primary-700">
                    Extra Museum Details
                </h1>
                <p className="text-p1 text-grey-900">
                    Enter your details to register
                </p>
            </div>

            {/* Using React Hook Form with your registration service */}
            <form onSubmit={step2Form.handleSubmit(onStep2Submit)}>
                <fieldset className="flex flex-col gap-8 mt-5 relative z-10 w-full">
                    {/* Single Image Upload Component */}
                    <div className="flex flex-col w-full gap-2">
                        <Controller
                            control={step2Form.control}
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

                        {step2Form.formState.errors.museumImage && (
                            <p className="text-red-500 text-sm">
                                {typeof step2Form.formState.errors.museumImage?.message === "string"
                                    ? step2Form.formState.errors.museumImage.message
                                    : "Please select a valid image file"}
                            </p>
                        )}
                    </div>

                    {/* Location Input */}
                    <div className="flex flex-col w-full gap-2">
                        <InputLocation
                            onLocationChange={handleLocationChange}
                            initialValue={step2Form.getValues('location')}
                        />
                        {step2Form.formState.errors.location && (
                            <p className="text-red-500 text-sm">
                                {step2Form.formState.errors.location.message ||
                                    step2Form.formState.errors.location.address?.message ||
                                    "Please select a valid location"}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col w-full gap-2">
                        <Label htmlFor="description">
                            Museum Description
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Description..."
                            className="border-1 border-grey-400"
                            {...step2Form.register("description")}
                        />
                        {step2Form.formState.errors.description && (
                            <p className="text-red-500 text-sm">
                                {step2Form.formState.errors.description.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!step2Form.formState.isValid || isUploading || isPending}
                    >
                        <span>{isPending ? <LoadingForm title="Registering..." /> : "Register Museum"}</span>
                    </Button>
                </fieldset>
            </form>
        </div>
    );

    return (
        <div>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
        </div>
    );
};
