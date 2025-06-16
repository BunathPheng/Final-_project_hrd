import Maincard from "@/components/feature/card/main-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { MuseumRequest } from "../_components/museum-request";
import { MuseumApprove } from "../_components/museum-approve";

export default async function MusuemDetailPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const currentStatus = (params.status as string) || "request";

    const breadcrumbs = ["Home", "Museum", "Detail"];

    return (
        <>
            <Breadcrumb main="User Management" items={breadcrumbs} />
            <Maincard>
                {currentStatus == "request" && <MuseumRequest />}
                {currentStatus == "approve" && <MuseumApprove />}
            </Maincard>
        </>
    );
}
