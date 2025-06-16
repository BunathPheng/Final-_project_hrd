import { EmptyData } from "@/components/feature/fallback/empty-data";
import { SmartImage } from "@/components/feature/fallback/smart-image";
import { ApiResponse } from "@/types/response";
import { ZoneProps } from "@/types/zone";
import { apiRequest } from "@/utils/api";
import { LocationTick } from "iconsax-reactjs";
import Link from "next/link";

export const ZoneList: React.FC<{ search: string, museumId: string }> = async ({ search, museumId }) => {
    const response = await apiRequest<ApiResponse<{ items: ZoneProps[] }>>(`/zones/filter?museumId=${museumId}&search=${search}&page=1&size=50`);
    const zone = response?.payload?.items || [];

    return (
        <>
            {zone && zone.length > 0 && (
                <div className="columns-1 sm:columns-2 md:columns-3 2xl:columns-4 gap-10">
                    {zone.map(item => (
                        <Link key={item?.zoneId} href={`/museum/${museumId}?tab=zones&zone-id=${item?.zoneId}`} className="break-before-page mb-10 relative overflow-hidden flex rounded-lg">
                            <SmartImage src={item?.pictureLink || ""} className="w-full h-auto rounded-lg aspect-auto object-cover" width={400} height={500} alt={item?.zoneName || ""} />
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/60 to-black/80"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-1/2 p-5 w-full grid justify-center gap-3">
                                <h4 className="text-h4 text-center text-white drop-shadow-500">{item?.zoneName || ""}</h4>
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow to-transparent"></div>
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <dl className="flex gap-2 text-white">
                                        <dt className="text-p1 drop-shadow-500">Type:</dt>
                                        <dd className="text-s2 drop-shadow-500">{item?.zoneCategoryName || ""}</dd>
                                    </dl>
                                    <dl className="flex gap-2 text-white">
                                        <dt className="text-p1 drop-shadow-500">Artifact:</dt>
                                        <dd className="text-s2 drop-shadow-500">{item?.countArtifact || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {!zone || zone.length == 0 && (
                <EmptyData
                    title="No zones found"
                    description="This area might not have registered zones yet."
                    icon={<LocationTick size={40} className="[&>*]:stroke-grey-800" />}
                />
            )}
        </>
    );
}
