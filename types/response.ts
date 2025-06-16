export type ApiResponse<T> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: any;
    success?: boolean;
    message?: string;
    payload?: T;
    status?: string | number;
    timestamp?: string;
};

// Pagination Type
export type PaginationProps = {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNextPage?: number;
    hasPreviousPage?: number;
    nextPage?: number | null;
    previousPage?: number | null;
    firstPage?: number | null;
    lastPage?: number | null;
};

export type PageProps = {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
    params?: Promise<{ [key: string]: string | undefined }>;
};

export type ErrorResponse = {
    status: number;
    message?: unknown;
};

export type PaginationMode = "default" | "ongoing" | "upcoming";
