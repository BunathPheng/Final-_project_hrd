"use server";
import fileService, { BucketType } from "@/service/file/file.service";
import authService from "@/service/auth/auth.service"; // Import your auth service

// Define the type for museum registration (matching your service exactly)
export type RegisterMuseumOwner = {
  name: string; 
  email: string;
  password: string;
  logoLink: string;
  address: string;
  lat: number;
  lng: number;
  description: string;
}

interface MuseumRegistrationParams {
  // Step 1 data
  museumName: string;
  email: string;
  password: string;
  
  // Step 2 data
  locationAddress: string;
  latitude: number;
  longitude: number;
  description: string;
}

// Server action for file upload
export const uploadMuseumImageAction = async (formData: FormData) => {
  try {
    const file = formData.get('file') as File;
    
    if (!file) {
      return {
        success: false,
        error: "No file provided"
      };
    }

    // Validate file on server side
    const validation = fileService.validateFile(file);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error
      };
    }

    // Upload file using your service
    const uploadResult = await fileService.uploadFile(file, BucketType.MUSEUM_IMAGES);
    
    if (uploadResult.success && uploadResult.payload) {      
      return {
        success: true,
        data: {
          fileName: uploadResult.payload.fileName,
          fileUrl: uploadResult.payload.fileUrl,
          fileType: uploadResult.payload.fileType,
          fileSize: uploadResult.payload.fileSize
        }
      };
    } else {
      console.error('❌ Server: Upload failed:', uploadResult.error);
      return {
        success: false,
        error: uploadResult.error || "Upload failed"
      };
    }
    
  } catch (error) {
    console.error("❌ Server: File upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed"
    };
  }
};

// Server action for complete museum registration
export const registerMuseumAction = async (data: MuseumRegistrationParams & { imageUrl?: string }) => {
  try {
    // Validate required fields
    if (!data.museumName || !data.email || !data.password) {
      return {
        success: false,
        error: "Museum name, email and password are required"
      };
    }

    if (!data.locationAddress || !data.description) {
      return {
        success: false,
        error: "Location and description are required"
      };
    }

    if (!data.latitude || !data.longitude) {
      return {
        success: false,
        error: "Valid coordinates are required"
      };
    }

    // Prepare registration data matching your service interface exactly
    const registrationData: RegisterMuseumOwner = {
      name: data.museumName, // Using 'namr' to match your existing service
      email: data.email,
      password: data.password,
      logoLink: data.imageUrl || "", // Use uploaded image URL or empty string
      address: data.locationAddress,
      lat: data.latitude,
      lng: data.longitude,
      description: data.description,
    };


    // Call your museum registration service
    const registrationResult = await authService.registerMuseumOwnerSevice(registrationData);
    
    if (registrationResult.success) {      
      return {
        success: true,
        data: registrationResult.data,
        message: "Museum registration completed successfully!"
      };
    } else {
      console.error('❌ Server: Registration failed:', registrationResult.error);
      return {
        success: false,
        error: registrationResult.error || "Registration failed"
      };
    }
    
  } catch (error) {
    console.error("❌ Server: Registration error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed"
    };
  }
};

// Combined action for file upload + registration (alternative approach)
export const registerMuseumWithImageAction = async (formData: FormData) => {
  try {
    // Extract form data
    const museumName = formData.get('museumName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const locationAddress = formData.get('locationAddress') as string;
    const latitude = parseFloat(formData.get('latitude') as string);
    const longitude = parseFloat(formData.get('longitude') as string);
    const description = formData.get('description') as string;
    const file = formData.get('museumImage') as File;

    // Validate required fields
    if (!museumName || !email || !password || !locationAddress || !description) {
      return {
        success: false,
        error: "All fields are required"
      };
    }

    if (isNaN(latitude) || isNaN(longitude)) {
      return {
        success: false,
        error: "Valid coordinates are required"
      };
    }

    let logoLink = "";

    // Upload image if provided
    if (file && file.size > 0) {      
      const validation = fileService.validateFile(file);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error
        };
      }

      const uploadResult = await fileService.uploadFile(file, BucketType.MUSEUM_IMAGES);
      
      if (!uploadResult.success || !uploadResult.payload) {
        return {
          success: false,
          error: uploadResult.error || "Image upload failed"
        };
      }
      logoLink = uploadResult.payload.fileUrl;
    }

    // Register museum with uploaded image
    const registrationResult = await registerMuseumAction({
      museumName,
      email,
      password,
      locationAddress,
      latitude,
      longitude,
      description,
      imageUrl: logoLink
    });

    return registrationResult;
    
  } catch (error) {
    console.error("❌ Server: Combined registration error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed"
    };
  }
};
