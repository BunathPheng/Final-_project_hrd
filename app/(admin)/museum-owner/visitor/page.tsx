import Innercard from "@/components/feature/card/inner-card";
import Maincard from "@/components/feature/card/main-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { VisitorTabbar } from "./_components/visitor-tabbar";
import TotalVisitor from "./_components/total-visitor";
import VisitorEngagement from "./_components/visitor-engagement";

export default async function VisitorsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const currentStatus = (params.tab as string) || "total";

    const breadcrumbs = ["Home", "Visitor"];

    return (
        <>
            <Breadcrumb main="Musuem Management" items={breadcrumbs} />
            <Maincard>
                <Innercard>
                    <VisitorTabbar />
                    {currentStatus == "total" && <TotalVisitor />}
                    {currentStatus == "engagement" && <VisitorEngagement />}
                </Innercard>
            </Maincard>
        </>
    );
}
