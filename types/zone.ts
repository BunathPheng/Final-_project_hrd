export type ZoneProps = {
    zoneId?: string;
    museumId?: string;
    zoneCategoryId?: string;
    zoneCategoryName?: string;
    zoneName?: string;
    description?: string;
    pictureLink?: string;
    videoLink?: string;
    countArtifact?: number;
    createdAt?: string;
    updatedAt?: string;
};

export type ZoneCategoryProps = {
    zoneCategoryId: string;
    name: string;
};

export type UpdateZoneProps = {
    name?: string;
    categoryId?: string;
    pictureLink?: string | undefined;
    videoLink?: string | undefined;
    description?: string | undefined;
    file?: File | undefined;
};
