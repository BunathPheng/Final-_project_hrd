import { ReviewStatsProps } from "./review";

export type MuseumCategoryProps = {
    museumCategoryId?: string; // UUID format
    name?: string;
};

export type MuseumArtifactProps = {
    artifactId?: string;
    zoneId?: string;
    title?: string;
    description?: string;
    thirdDModelLink?: string;
    createdAt?: string;
    updatedAt?: string;
    deleted?: boolean;
};

export type MuseumDetailProps = {
    museumId?: string; // UUID format
    museumCategory?: MuseumCategoryProps;
    review?: ReviewStatsProps;
    name?: string;
    address?: string;
    contactNumber?: string | null;
    lat?: number;
    lng?: number;
    logoLink?: string | null;
    bannerLink?: string | null;
    landscapeLink?: {
        images: [];
    };
    description?: string;
    museumArtifact?: MuseumArtifactProps;
    isApproved?: boolean;
    isFavorite?: boolean;
    schedule?: []; // Assuming it's an array, content type not specified
    createdAt?: string; // ISO date-time string
    updatedAt?: string | null;
};

export type FavoriteMuseumProps = {
    museumId: string;
    museumEmail: string;
    museumName: string;
    logoLink: string;
    museumAddress: string | null;
    isFavorite: boolean;
    favoriteMuseumSchedule: [];
};
