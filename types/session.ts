export type SessionResponse = {
    success?: boolean;
    message?: string;
    payload?: {
        token?: string;
        user?: {
            visitorId?: string;
            museumId?: string;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            appUserRegister?: Record<string, any>;
            fullName?: string;
            contactNumber?: string | null;
            gender?: string | null;
            dob?: string | null;
            profileImageLink?: string;
            createdAt?: string;
            updatedAt?: string | null;
            role:string 
        };
    };
    status?: string;
    timestamp?: string;
    id?: string;
};
