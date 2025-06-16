/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiResponse } from "@/types/response";

// Define types for file upload
interface FileUploadCredentials {
  file: File;
  bucketType?: string;
}

interface FileUploadPayload {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

interface MultiFileUploadPayload {
  files: FileUploadPayload[];
}

// Bucket types enum (adjust based on your API)
export enum BucketType {
  MUSEUM_IMAGES = 'LOGO',
  PROFILE_PICTURES = 'IMAGE',
  ARTIFACT3D  = 'ARTIFACT',
}

export const fileService = {
  // Upload single file
  async uploadFile(
    file: File, 
    bucketType: BucketType = BucketType.MUSEUM_IMAGES
  ): Promise<ApiResponse<FileUploadPayload>> {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      
      // Make API request
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/file/upload?bucketType=${bucketType}`, {
        method: 'POST',
        body: formData,
      
        // Don't set Content-Type header - let browser set it with boundary for FormData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const data: ApiResponse<FileUploadPayload> = await response.json();
      return data;
      
    } catch (error) {
      console.error('File upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'File upload failed',
      };
    }
  },

  // Upload multiple files
  async uploadMultipleFiles(
    files: File[], 
    bucketType: BucketType = BucketType.MUSEUM_IMAGES
  ): Promise<ApiResponse<MultiFileUploadPayload>> {
    try {
      const uploadPromises = files.map(file => 
        this.uploadFile(file, bucketType)
      );
      
      const results = await Promise.all(uploadPromises);
      
      // Check if any uploads failed
      const failedUploads = results.filter(result => !result.success);
      if (failedUploads.length > 0) {
        const errorMessages = failedUploads
          .map(result => result.error)
          .filter(Boolean)
          .join(', ');
        
        throw new Error(`Some uploads failed: ${errorMessages}`);
      }
      
      // Extract successful payloads
      const successfulPayloads = results
        .map(result => result.payload)
        .filter(Boolean) as FileUploadPayload[];
      
      return {
        success: true,
        error: null,
        message: `Successfully uploaded ${successfulPayloads.length} files`,
        payload: {
          files: successfulPayloads
        },
        status: 'CREATED',
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Multiple file upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Multiple file upload failed',
      };
    }
  },

  
  // Validate file before upload
  validateFile(
    file: File, 
    maxSizeBytes: number = 5 * 1024 * 1024, // 5MB default
    allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  ): { isValid: boolean; error?: string } {
    // Check file size
    if (file.size > maxSizeBytes) {
      return {
        isValid: false,
        error: `File size exceeds ${Math.round(maxSizeBytes / (1024 * 1024))}MB limit`
      };
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `File type ${file.type} is not allowed`
      };
    }

    return { isValid: true };
  }
};

export default fileService;