/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig, User } from "next-auth";
import authService, { LoginCredentials } from "./service/auth/auth.service";

// Helper function to refresh access token
async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auths/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const refreshedTokens = await response.json();
    
    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error("❌ Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const config: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const loginCredentials: LoginCredentials = {
          email: credentials.email as string,
          password: credentials.password as string,
        };
        
        try {
          const response = await authService.loginService(loginCredentials); 
           
          if (response?.data.status === "OK") {
            // Return user data with token information
            return {
              ...response.data,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
              accessTokenExpires: response.data.expiresIn ? Date.now() + response.data.expiresIn * 1000 : Date.now() + 60 * 60 * 1000, // Default 1 hour
            };
          } else {
            return response?.data || null; 
          }
        } catch (error) {
          console.error("❌ Error during credentials authorization:", error);
          return null;
        }
      },
    }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile'
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, user }) {
      
      if (account?.provider === "google" && account?.id_token) {
        try {
          // Use your auth service instead of direct fetch
          const googleCredentials = {
            idToken: account.id_token
          };
          
          const response = await authService.loginGoogleSevice(googleCredentials);
          
          if (response?.data.status === "OK") {
            console.log("✅ Google auth successful:", response.data);
            
            // Store the API response data in the user object for JWT callback
            (user as any).apiData = response.data;
            (user as any).accessToken = response.data.payload.token;
            // Add refresh token if your API provides it
            // (user as any).refreshToken = response.data.payload.refreshToken;
            // (user as any).accessTokenExpires = response.data.payload.expiresIn ? Date.now() + response.data.payload.expiresIn * 1000 : Date.now() + 60 * 60 * 1000;
            
            return true; // signIn callback should return boolean
          } else {
            console.error("❌ Google auth failed:", response.error || "Unknown error");
            return false;
          }
        } catch (error) {
          console.error("❌ Error during Google authentication:", error);
          return false;
        }
      }
      
      return true;
    },

    async jwt({ token, user, account }) {
      
      // Initial sign in
      if (account && user) {
        // For Google provider, use the API data we stored in signIn callback
        if (account.provider === "google" && (user as any).apiData) {
          const apiData = (user as any).apiData;
          return {
            ...token,
            accessToken: apiData.payload.token,
            accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
            // Structure exactly as you specified
            user: {
              success: apiData.status === "OK",
              message: apiData.message,
              payload: apiData.payload,
              status: apiData.status,
              timestamp: apiData.timestamp
            },
            provider: "google"
          };
        }
        
        // For credentials provider
        return {
          ...token,
          accessToken: (user as any).accessToken || account.access_token,
          refreshToken: (user as any).refreshToken || account.refresh_token,
          accessTokenExpires: (user as any).accessTokenExpires || (account.expires_at ? account.expires_at * 1000 : Date.now() + 60 * 60 * 1000),
          user: {
            ...(user as any).payload?.user || user,
            // Mark as credentials user
            isGoogleUser: false,
            provider: "credentials",
            // Add API response data
            payload: (user as any).payload,
            status: (user as any).status,
            message: (user as any).message,
            timestamp: (user as any).timestamp
          }
        };
      }

      // Return previous token if the access token has not expired yet
      if (token.accessTokenExpires && Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to update it
      if (token.refreshToken) {
        console.log("🔄 Access token expired, attempting to refresh...");
        return refreshAccessToken(token);
      }

      // For Google login without refresh token, don't set error immediately
      // Google tokens might have longer validity
      if (token.provider === "google") {
        console.log("⚠️ Google token expired, user may need to re-authenticate");
        return {
          ...token,
          // Don't set error for Google tokens, let them continue
        };
      }

      // If no refresh token, return token with error
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    },

    async session({ session, token }) {
      
      // Send properties to the client
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user as any,
        };
      }
      
      // For Google users, preserve the original Google image URL for detection
      if (token.provider === "google" && session.user) {
        // Keep both the API profile image and Google image for detection
        (session as any).user.image = session.user.image; // Preserve Google image URL
      }
      
      // Add access token to session
      (session as any).accessToken = token.accessToken;
      (session as any).error = token.error;
      
      // Add token expiration info
      (session as any).accessTokenExpires = token.accessTokenExpires;
      
      if (token.idToken) {
        (session as any).idToken = token.idToken;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/",
  },
  events: {
    async signOut(event) {
      // Optional: Call your API to invalidate the refresh token
      const token = (event as { token?: any }).token;
      if (token?.refreshToken) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auths/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              refreshToken: token.refreshToken,
            }),
          });
        } catch (error) {
          console.error("❌ Error during logout:", error);
        }
      }
    },
  },
};

export const { auth, signIn, signOut, handlers } = NextAuth(config);