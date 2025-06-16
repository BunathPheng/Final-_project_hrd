import HeadingTitle from "@/components/feature/label/heading-title";
import { Artifacts } from "../_components/artifacts";
import { SearchData } from "../_components/search-data";
import { ApiResponse, PageProps } from "@/types/response";
import { apiRequest } from "@/utils/api";
import { ZoneProps } from "@/types/zone";

export const DetailZone: React.FC<PageProps & { zoneId: string }> = async ({ searchParams, zoneId }) => {
    const response = await apiRequest<ApiResponse<ZoneProps>>(`/zones/${zoneId}`);
    const zones = response?.payload || null;

    return (
        <div className="grid w-full mt-10 gap-12">
            {/* Search Seaction */}
            <header className="flex w-full justify-between gap-5">
                <HeadingTitle title={zones?.zoneName || ""} />
                <SearchData />
            </header>

            {/* Zone Info */}
            <article className="grid w-full gap-5">
                <div className="flex flex-wrap items-center gap-7">
                    <dl className="flex gap-2">
                        <dt className="text-p1 text-grey-900">Type:</dt>
                        <dd className="text-s2 text-primary-700">{zones?.zoneCategoryName || ""}</dd>
                    </dl>
                    <dl className="flex gap-2">
                        <dt className="text-p1 text-grey-900">Total Artifact:</dt>
                        <dd className="text-s2 text-primary-700">{zones?.countArtifact || 0}</dd>
                    </dl>
                </div>
                <p className="text-p1 text-grey-800 sm:w-2/3 whitespace-pre-line">{zones?.description || ""}</p>
            </article>

            {/* Artifact List */}
            <Artifacts searchParams={searchParams} zoneId={zoneId} />
        </div>
    );
}
