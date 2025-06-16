/* eslint-disable @typescript-eslint/no-explicit-any */
// services/authService.ts
import { apiRequest } from "@/utils/api";

// Types for authentication data
export type User = {
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt: string;
}

export type LoginCredentials = {
  email: string;
  password: string;
}


export type ForgetpasswordCredentials = {
  email: string;
}


interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}


interface RegisterDataGoogle{
   idToken: string

}


export type ResetPasswordData = {
  token : string;
  newPassword: string;
}
 

export type OtpVerify = {
  email: string;
  otp: string;
}

export type AuthResponse = {
  user: User;
  token: string;
  refreshToken?: string;
}


export type registrationData = {
  name : string;
  email: string;
  password: string;
  logoLink: string;
  address:string;
  lat:number;
  lng:number;
  description: string;
}


export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Authentication API functions
export const authService = { 
  // Login user
  async loginService(credentials: LoginCredentials): Promise<ApiResponse<any>> {  
    
    try {
      const response = await apiRequest('/auths/login', {
        method: 'POST',
        body: credentials,
      });
      return {
        success: true,  
        data: response,
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }; 
    }
  },
  // Register user
  async registerSevice(credentials: RegisterData): Promise<ApiResponse<any>> {  
    try {
      const response = await apiRequest('/auths/register/visitor', {
        method: 'POST',
        body: credentials,
      });
      return {
        success: true,  
        data: response,
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Register failed',
      }; 
    }
  },

  // login user goole
  async loginGoogleSevice(credentials: RegisterDataGoogle): Promise<ApiResponse<any>> {  
    try {
      const response = await apiRequest('/auths/google/sign-in/visitor', {
        method: 'POST',
        body: credentials,
      });
      return {
        success: true,  
        data: response,
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Register failed',
      }; 
    }
  },

  // Get Verify visitor
  async verifyService(email: string, otp: string): Promise<ApiResponse<any>> {
  try {
    const response = await apiRequest(`/auths/verify?email=${encodeURIComponent(email)}&otp=${otp}`, {
      method: 'POST',
    });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to verify OTP',
    };
  }
  },
  //Get auths otp-expiration 
  async verifyOtpExpirationService(email: string): Promise<ApiResponse<any>> {
  try {
    const response = await apiRequest(`/auths/otp-expiration?email=${encodeURIComponent(email)}`, {
      method: 'GET',
    });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'auths otp-expiration',
    };
  }
  },
  //Get auths otp-expiration 
  async resendOtpService(email: string): Promise<ApiResponse<any>> {
  try {
    const response = await apiRequest(`/auths/resend-otp?email=${encodeURIComponent(email)}`, {
      method: 'POST',
    });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'auths otp-expiration',
    };
  }
  },
  
  // Forgotpassword user
  async forgotPasswordService(credentials: ForgetpasswordCredentials): Promise<ApiResponse<any>> {  
    
    try {
      const response = await apiRequest('/auths/forgot-password', {
        method: 'POST',
        body: credentials,
      });
      return {
        success: true,  
        data: response,
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Forgot Password failed',
      }; 
    }
  },

   // Get Verify forgotpassword
  async verifyForgotPasswordService(email: string, otp: string): Promise<ApiResponse<any>> {
  try {
    const response = await apiRequest(`/auths/forgot-password/verify-otp?email=${encodeURIComponent(email)}&otp=${otp}`, {
      method: 'POST',
    });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to verifyForgotPAssword OTP',
    };
  }
  },

  // Reset forgotpassword
  async resetPasswordSevice(credentials: ResetPasswordData): Promise<ApiResponse<any>> {  
    try {
      const response = await apiRequest('/auths/forgot-password/reset-password', {
        method: 'POST',
        body: credentials,
      });
      return {
        success: true,  
        data: response,
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Reset forgotpassword failed',
      }; 
    }
  },

   // Registration museum owner
  async registerMuseumOwnerSevice(credentials: registrationData): Promise<ApiResponse<any>> {  
    try {
      const response = await apiRequest('/auths/register/museum-owner', {
        method: 'POST',
        body: credentials,
      });
      return {
        success: true,  
        data: response,
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Reset forgotpassword failed',
      }; 
    }
  },



  


};

export default authService;