// Server Component - handles session and fetches profile data from API
import { auth } from "@/auth";
import { EditProfileClient } from "./edit-profile-client-props";
import { ApiResponse } from "@/types/response";
import { apiRequest } from "@/utils/api";
import { toast } from "sonner";

export const EditProfileForm = async () => {
    const session = await auth();
    console.log("Session data:", session);

    const userEmail = session?.user?.email || "";

    try {
        // Fetch user profile data from your API endpoint
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const profileResponse = await apiRequest<ApiResponse<any>>(
            `/profile/visitor`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            
        );
        console.log("Profile API response:", profileResponse);

        

        // Extract the actual user data from the API response
        // Adjust this based on your actual API response structure
        const profileData = profileResponse.payload || profileResponse;
        
        if (!profileData) {
            toast.error("No profile data returned from API");
        }

        // Determine if user is Google user based on session
        const isGoogleUser = !!(
            session?.user?.image && 
            session?.user.image.includes('googleusercontent.com')
        );

        // Structure the user data for the client component
        const userData = {
            fullName: profileData.fullName || session?.user?.name || "",
            email: profileData.email || userEmail,
            contactNumber: profileData.contactNumber || "",
            gender: profileData.gender || "",
            dob: profileData.dob || null, 
            profileImageLink: profileData.profileImageLink || session?.user?.image || ""
        };

        console.log("Structured userData:", userData);


        // Pass data to client component
        return (
            <EditProfileClient
                userData={userData}
                isGoogleUser={isGoogleUser}
                userEmail={userEmail}
            />
        );

    } catch (error) {
        console.error("Error fetching profile data:", error);
        
        // Fallback to session data when API fails
        const fallbackUserData = {
            fullName: session?.user?.name || "",
            contactNumber: "",
            gender: "",
            dob: null,
            profileImageLink: session?.user?.image || ""
        };

        const isGoogleUser = !!(
            session?.user?.image && 
            session?.user.image.includes('googleusercontent.com')
        );

        console.log("Using fallback data due to API error");

        return (
            <EditProfileClient
                userData={fallbackUserData}
                isGoogleUser={isGoogleUser}
                userEmail={userEmail}
            />
        );
    }
};