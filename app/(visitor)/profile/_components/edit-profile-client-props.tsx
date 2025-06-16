"use client"
import { FC, useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Call, Camera, Key, User, Trash } from "iconsax-reactjs";
import Image from "next/image";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { toast } from "sonner"; // or your preferred toast library
import { PasswordChangeFormData, passwordChangeSchema, ProfileFormData, profileSchema } from "../_lib/validations-profile";
import { uploadMuseumImageAction } from "@/action/auth/logo-museum-action";
import { updatePasswordAction, updateProfileAction } from "@/action/profile/update-profile-action";
import defaultprofile from "../../../../public/profile/default.jpg";


interface UserData {
    fullName: string;
    contactNumber: string;
    gender: string;
    dob: string | null;
    profileImageLink: string;
}
interface EditProfileClientProps {
    userData: UserData;
    isGoogleUser: boolean;
    userEmail: string;
}

export const EditProfileClient: FC<EditProfileClientProps> = ({
    userData,
    isGoogleUser,
}) => {
    const [profileImageLink, setProfileImageLink] = useState<string>(userData.profileImageLink);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isProfilePending, startProfileTransition] = useTransition();
    const [isPasswordPending, startPasswordTransition] = useTransition();
    const [isImageUploading, setIsImageUploading] = useState(false);

    const defaultImage = defaultprofile;

    // Profile form
    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: userData.fullName,
            contactNumber: userData.contactNumber,
            gender: userData.gender as "Male" | "Female",
            dob: userData.dob,
            profileImage: userData.profileImageLink,
        },
    });

    // Password form
    const passwordForm = useForm<PasswordChangeFormData>({
        resolver: zodResolver(passwordChangeSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return;
        }

        // Check file size (e.g., max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            toast.error('Image size must be less than 5MB');
            return;
        }

        setIsImageUploading(true);

        try {
            // Create a preview URL for immediate feedback
            const previewUrl = URL.createObjectURL(file);
            setProfileImageLink(previewUrl);

            // Create FormData for server action
            const formData = new FormData();
            formData.append('file', file);

            // Upload using server action
            const uploadResult = await uploadMuseumImageAction(formData);

            if (uploadResult.success && uploadResult.data?.fileUrl) {
                // Update with the actual uploaded URL
                const uploadedUrl = uploadResult.data.fileUrl;
                setProfileImageLink(uploadedUrl);
                profileForm.setValue('profileImage', uploadedUrl);

                // Clean up the preview URL
                URL.revokeObjectURL(previewUrl);

                toast.success('Image uploaded successfully');
            } else {
                // Revert to original image on upload failure
                setProfileImageLink(userData.profileImageLink);
                profileForm.setValue('profileImage', userData.profileImageLink);
                URL.revokeObjectURL(previewUrl);

                toast.error(uploadResult.error || 'Failed to upload image');
            }
        } catch (error) {
            // Revert to original image on error
            setProfileImageLink(userData.profileImageLink);
            profileForm.setValue('profileImage', userData.profileImageLink);

            console.error('Image upload error:', error);
            toast.error('Failed to upload image');
        } finally {
            setIsImageUploading(false);

            // Clear the file input
            const fileInput = event.target;
            if (fileInput) {
                fileInput.value = '';
            }
        }
    };

    const isCustomImage = () => {
        // Don't show delete button if not in editing mode
        if (!isEditingProfile) return false;

        // For Google users: show delete button if current image is different from original Google image
        if (isGoogleUser) {
            return profileImageLink !== userData.profileImageLink && profileImageLink !== "";
        }

        // For regular users: show delete button if there's any image (custom upload or default)
        return profileImageLink !== "" && profileImageLink !== null;
    };

    // Updated handleImageDelete function:
    const handleImageDelete = () => {
        if (isGoogleUser && userData.profileImageLink) {
            // For Google users: revert to original Google image
            setProfileImageLink(userData.profileImageLink);
            profileForm.setValue('profileImage', userData.profileImageLink);
        } else {
            // For regular users: set to empty (which will show default image in UI)
            setProfileImageLink("");
            profileForm.setValue('profileImage', "");
        }

        // Clear the file input
        const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleProfileSubmit = async (data: ProfileFormData) => {
        startProfileTransition(async () => {
            try {
                const result = await updateProfileAction({
                    ...data,
                    profileImageLink: profileImageLink, // Use the current profile image state
                });
                console.log(result)
                if (result?.data?.status === "OK") {
                    toast.success(result.message);
                    setIsEditingProfile(false);
                } else {
                    toast.error(result?.data?.errors?.message || result?.data?.errors?.message);
                }
            } catch (error) {
                toast.error('An unexpected error occurred');
                console.error('Profile update error:', error);
            }
        });
    };

    const handlePasswordSubmit = async (data: PasswordChangeFormData) => {
        // Don't allow password change for Google users
        if (isGoogleUser) {
            toast.error('Password changes are not available for Google accounts. Please manage your password through Google.');
            return;
        }

        startPasswordTransition(async () => {
            try {
                const result = await updatePasswordAction({
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                });
                console.log("result", result)
                if (result?.response?.status === "OK") {
                    toast.success(result?.response?.message);
                    setIsEditingPassword(false);
                    passwordForm.reset();
                } else {
                    toast.error(result?.response?.errors?.message);
                }
            } catch (error) {
                toast.error('An unexpected error occurred');
                console.error('Password update error:', error);
            }
        });
    };

    const handleProfileCancel = () => {
        setIsEditingProfile(false);
        profileForm.reset();
        setProfileImageLink(userData.profileImageLink);
    };

    const handlePasswordCancel = () => {
        setIsEditingPassword(false);
        passwordForm.reset();
    };

    return (
        <>
            {/* Profile Form */}
            <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)}>
                <h1 className="text-p2 text-primary-700 border-b-2 border-b-primary-700 w-fit mb-6">
                    Edit Profile
                    {isGoogleUser && (
                        <span className="text-sm text-blue-600 ml-2">(Google Account)</span>
                    )}
                </h1>

                <div className="flex justify-between items-start">
                    <div className="relative group">
                        <Image
                            src={profileImageLink || defaultImage}
                            width={200}
                            height={200}
                            alt="profile"
                            className="rounded-full w-36 h-36 object-cover"
                        />

                        {isCustomImage() && (
                            <div className="absolute inset-0 bg-grey-900 bg-opacity-1 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-200 flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={handleImageDelete}
                                    className="bg-red-600 text-white rounded-full p-2 cursor-pointer hover:bg-red-700 transition-colors"
                                    title={isGoogleUser ? "Reset to Google image" : "Remove image"}
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <div className="p-2 w-fit rounded-full absolute bottom-3 right-0">
                            <label
                                htmlFor="avatar-upload"
                                className={`absolute bottom-0 right-0 rounded-full p-2 transition-colors
                                  ${isImageUploading || !isEditingProfile
                                        ? 'bg-primary-700  cursor-not-allowed opacity-50 text-white'
                                        : 'bg-primary-700 text-primary-foreground hover:bg-primary-800 cursor-pointer'
                                    }`}
                            >
                                {isImageUploading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Camera className="w-4 h-4" />
                                )}
                            </label>
                        </div>

                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={!isEditingProfile || isImageUploading}
                        />

                    </div>

                    <div className="flex flex-col justify-center gap-5 w-[40%]">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Controller
                                name="fullName"
                                control={profileForm.control}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Input
                                            {...field}
                                            id="fullName"
                                            type="text"
                                            startIcon={<User className="h-4 w-4 text-grey-400" />}
                                            placeholder="Full Name"
                                            disabled={!isEditingProfile}
                                            className={error ? "border-red-500" : ""}
                                        />
                                        {error && (
                                            <span className="text-red-500 text-sm">{error.message}</span>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="contactNumber">Phone Number</Label>
                            <Controller
                                name="contactNumber"
                                control={profileForm.control}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Input
                                            {...field}
                                            id="contactNumber"
                                            validationMode="number"
                                            type="tel"
                                            startIcon={<Call className="h-4 w-4 text-grey-400" />}
                                            placeholder="Phone Number"
                                            disabled={!isEditingProfile}
                                            accept=""
                                            className={error ? "border-red-500" : ""}
                                        />
                                        {error && (
                                            <span className="text-red-500 text-sm">{error.message}</span>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>

                    <div className="justify-center flex-col gap-5 flex w-[40%]">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Controller
                                name="gender"
                                control={profileForm.control}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Select
                                            disabled={!isEditingProfile}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className={`w-full ${error ? "border-red-500" : ""}`}>
                                                <SelectValue placeholder="Select Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Male">Male</SelectItem>
                                                <SelectItem value="Female">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {error && (
                                            <span className="text-red-500 text-sm">{error.message}</span>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Controller
                                name="dob"
                                control={profileForm.control}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <DatePicker
                                            disabled={!isEditingProfile}
                                            value={field.value}
                                            onChange={(date: Date | null) => {
                                                if (date) {
                                                    // Create local date string without timezone conversion
                                                    const year: number = date.getFullYear();
                                                    const month: string = String(date.getMonth() + 1).padStart(2, '0');
                                                    const day: string = String(date.getDate()).padStart(2, '0');
                                                    const localDateString: string = `${year}-${month}-${day}`;
                                                    field.onChange(localDateString);
                                                } else {
                                                    field.onChange(null);
                                                }
                                            }}
                                            placeholder="Select Date of Birth"
                                            className={error ? "border-red-500" : ""}
                                        />
                                        {error && (
                                            <span className="text-red-500 text-sm">{error.message}</span>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    {!isEditingProfile ? (
                        <Button type="button" variant="outline" size="md" onClick={() => setIsEditingProfile(true)}>
                            Edit
                        </Button>
                    ) : (
                        <>
                            <Button type="button" variant="outline" size="md" onClick={handleProfileCancel}>
                                Cancel
                            </Button>
                            <Button type="submit" size="md" disabled={isProfilePending}>
                                {isProfilePending ? "Saving..." : "Save Changes"}
                            </Button>
                        </>
                    )}
                </div>
            </form>

            {/* Security Form */}
            <form className="bg-white rounded-[10px] mt-6" onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
                <h1 className="text-p2 text-primary-700 border-b-2 border-b-primary-700 w-fit mb-6">Security</h1>
                <h2 className="text-s1 text-grey-900 mb-4">Change Password</h2>

                {isGoogleUser && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                        <p className="text-blue-800 text-sm">
                            You are signed in with Google. Password changes should be managed through your Google account.
                        </p>
                    </div>
                )}

                <div className="flex flex-col gap-4 justify-between items-start">
                    <div className="flex flex-col justify-center gap-5 w-full">
                        <div className="flex flex-col w-full gap-2">
                            <Label htmlFor="oldPassword">Current Password</Label>
                            <Controller
                                name="oldPassword"
                                control={passwordForm.control}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Input
                                            {...field}
                                            id="oldPassword"
                                            type="password"
                                            placeholder="Current Password"
                                            startIcon={<Key className="h-4 w-4 text-grey-400" />}
                                            togglePassword={true}
                                            disabled={!isEditingPassword || isGoogleUser}
                                            className={error ? "border-red-500" : ""}
                                        />
                                        {error && (
                                            <span className="text-red-500 text-sm">{error.message}</span>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-6 w-full">
                        <div className="flex flex-col w-full gap-2">
                            <Label htmlFor="newpassword">New Password</Label>
                            <Controller
                                name="newPassword"
                                control={passwordForm.control}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Input
                                            {...field}
                                            id="newpassword"
                                            type="password"
                                            placeholder="New Password"
                                            startIcon={<Key className="h-4 w-4 text-grey-400" />}
                                            togglePassword={true}
                                            disabled={!isEditingPassword || isGoogleUser}
                                            className={error ? "border-red-500" : ""}
                                        />
                                        {error && (
                                            <span className="text-red-500 text-sm">{error.message}</span>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-6 w-full">
                        <div className="flex flex-col w-full gap-2">
                            <Label htmlFor="confirmpassword">Confirm New Password</Label>
                            <Controller
                                name="confirmPassword"
                                control={passwordForm.control}
                                render={({ field, fieldState: { error } }) => (
                                    <>
                                        <Input
                                            {...field}
                                            id="confirmpassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                            startIcon={<Key className="h-4 w-4 text-grey-400" />}
                                            togglePassword={true}
                                            disabled={!isEditingPassword || isGoogleUser}
                                            className={error ? "border-red-500" : ""}
                                        />
                                        {error && (
                                            <span className="text-red-500 text-sm">{error.message}</span>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6 gap-4">
                    {!isEditingPassword ? (
                        <Button
                            type="button"
                            variant="outline"
                            size="md"
                            onClick={() => setIsEditingPassword(true)}
                            disabled={isGoogleUser}
                        >
                            Edit
                        </Button>
                    ) : (
                        <>
                            <Button type="button" variant="outline" size="md" onClick={handlePasswordCancel}>
                                Cancel
                            </Button>
                            <Button type="submit" size="md" disabled={isGoogleUser || isPasswordPending}>
                                {isPasswordPending ? "Saving..." : "Save Changes"}
                            </Button>
                        </>
                    )}
                </div>
            </form>
        </>
    );
};
