import { auth } from "@/auth";
import { ErrorResponse } from "@/types/response";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

interface ApiRequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: Record<string, any> | null;
    headers?: Record<string, string>;
    fetchOptions?: RequestInit;
}

type SessionProps = {
    user: {
        payload: {
            token: string;
        };
    };
};

export async function apiRequest<T>(
    endpoint: string,
    {
        method = "GET",
        body = null,
        headers = {},
        fetchOptions = {},
    }: ApiRequestOptions = {}
): Promise<T> {
    const session = await auth();
    const sessionData = session as SessionProps | null;

    const defaultHeaders: Record<string, string> = {
        Accept: "*/*",
        "Content-Type": "application/json",
        ...headers,
    };

    // Add authorization header if token exists
    if (sessionData?.user?.payload?.token) {
        defaultHeaders[
            "Authorization"
        ] = `Bearer ${sessionData.user.payload.token}`;
    }

    const options: RequestInit = {
        method,
        headers: defaultHeaders,
        ...fetchOptions,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data: T = await response.json();
        return data;
    } catch (err) {
        // Handle errors consistently
        const errorMessage =
            err instanceof Error ? err.message : "An unexpected error occurred";

        // Return a typed error response
        const errorResponse: ErrorResponse = {
            status: 500,
            message: errorMessage,
        };
        return errorResponse as unknown as T; // Cast to satisfy return type
    }
}
