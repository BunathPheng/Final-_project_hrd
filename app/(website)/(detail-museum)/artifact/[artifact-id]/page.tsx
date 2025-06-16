import ViewArtifact from "@/components/feature/lib/view-artifact";
import { DetailArtifactPopup } from "@/app/(website)/(detail-museum)/artifact/_components/detail-artifacts-popup";
import { ApiResponse, PageProps } from "@/types/response";
import { Home2 } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { BackButton } from "../_components/back-button";
import { apiRequest } from "@/utils/api";
import { ArtifactProps } from "@/types/artifact";

export default async function ViewArtifactPage({ params }: PageProps) {
    const param = await params;
    const artifactId = param?.["artifact-id"] ?? "";

    const response = await apiRequest<ApiResponse<ArtifactProps>>(`/artifacts/${artifactId}`);
    const artifact = response?.payload || null;

    return (
        <section className="relative w-full h-screen">
            <Image src="/banner/artifact-bg.jpg" className="w-full h-full object-cover" width={1440} height={1024} alt="Artifact Background" />
            <div className="absolute top-0 left-0 w-full h-full bg-grey-900/75 flex flex-col items-center justify-center gap-5">
                <div className="w-screen h-screen relative">
                    <ViewArtifact src={artifact?.thirdDModelLink || ""} isMove={true} minDistance={10} maxDistance={45} isZoom={true} showCircle={true} />
                    <DetailArtifactPopup title={artifact?.title || ""} description={artifact?.description || ""} />
                    <Link href={"/"} className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-all px-4 py-2.5 bg-white/10 hover:bg-white/50 rounded-full">
                        <Home2 size={24} className="[&>*]:stroke-white" />
                    </Link>
                </div>
            </div>
            <div className="absolute top-5 left-5">
                <BackButton />
            </div>
        </section>
    );
}
