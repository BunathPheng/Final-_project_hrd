export type ArtifactProps = {
    artifactId?: string; // UUID format
    zoneId?: string; // UUID format
    title?: string;
    description?: string;
    thirdDModelLink?: string; // URL
    createdAt?: string; // ISO 8601 date-time string
    updatedAt?: string; // ISO 8601 date-time string
    deleted?: boolean;
};
