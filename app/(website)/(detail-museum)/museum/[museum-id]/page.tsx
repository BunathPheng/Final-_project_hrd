import { OverviewTab } from "../tabs/overview";
import { ZoneTab } from "../tabs/zone";
import { EventsTab } from "../tabs/events";
import { ReviewTab } from "../tabs/review";
import { DetailZone } from "../tabs/detail-zone";
import { ApiResponse, PageProps } from "@/types/response";
import { apiRequest } from "@/utils/api";
import { MuseumDetailProps } from "@/types/museum";
import { MuseumHeader } from "@/components/layout/museum-header";
import { MuseumTabbar } from "../_components/museum-tabbar";
import { MuseumFooter } from "@/components/layout/museum-footer";
import { getVisitorId } from "@/utils/session";

// This tells Next.js that this is a Server Component
export default async function MusuemDetailPage({ searchParams, params }: PageProps) {
    const resolveSearchParams = await searchParams;

    const param = await params;
    const museumId = param?.["museum-id"] ?? "";

    const currentTab = (resolveSearchParams?.tab as string) || "overview";
    const zoneId = (resolveSearchParams?.["zone-id"] as string) || "";

    const visitorId = await getVisitorId();

    const search = (resolveSearchParams?.search as string) || "";

    const response = await apiRequest<ApiResponse<MuseumDetailProps>>(`/museums/${museumId}`);
    const museums = response?.payload || null;

    return (
        <>
            <MuseumHeader visitorId={visitorId} payload={museums} />
            <main className="grid w-full pd-screen container">
                <MuseumTabbar />
                {currentTab === "overview" && <OverviewTab payload={museums} />}
                {currentTab === "zones" && !zoneId && <ZoneTab search={search} museumId={museumId} />}
                {currentTab === "zones" && zoneId && <DetailZone searchParams={searchParams} zoneId={zoneId} />}
                {currentTab === "events" && <EventsTab searchParams={searchParams} museumId={museumId} />}
                {currentTab === "reviews" && <ReviewTab searchParams={searchParams} museumId={museumId} />}
            </main>
            <MuseumFooter />
        </>
    );
}
