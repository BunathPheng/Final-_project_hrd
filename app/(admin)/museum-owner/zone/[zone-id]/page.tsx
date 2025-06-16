import Innercard from "@/components/feature/card/inner-card";
import Maincard from "@/components/feature/card/main-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { JSX } from "react";
import { EditZoneInformation } from "../_components/edit-zone-information";
import { AddZoneArtifact } from "../_components/add-zone-artifact";
import ArtifactZone from "../_components/artifact-zone";
import { ApiResponse, PageProps } from "@/types/response";
import { apiRequest } from "@/utils/api";
import { ZoneCategoryProps, ZoneProps } from "@/types/zone";
import { SmartImage } from "@/components/feature/fallback/smart-image";



export default async function DeatailsZonePage({ params }: PageProps): Promise<JSX.Element> {
    const breadcrumbs = ["Home", "Zone", "Details"];

    const param = await params;
    const zoneId = param?.["zone-id"] ?? "";

    const response = await apiRequest<ApiResponse<ZoneProps>>(`/zones/${zoneId}`);
    const zone = response?.payload || null;

    const responseCategory = await apiRequest<ApiResponse<ZoneCategoryProps[]>>("/zones/zone-category");
    const category = responseCategory?.payload || [];

    return (
        <>
            <Breadcrumb main="Musuem Management" items={breadcrumbs} />
            <Maincard>
                <Innercard>
                    <div className="">
                        <h2 className="text-s1 font-bold text-primary-700 border-b-1 border-grey-100 pb-3 mb-7">
                            Detail Zone
                        </h2>
                        <div className="flex justify-between W-full items-center">
                            <h2 className="text-s1 text-grey-900 shrink-0 ">
                                Zone Information
                            </h2>
                            <div className="flex w-full justify-end">
                                <EditZoneInformation zoneId={zoneId} payload={zone} items={category} />
                            </div>

                        </div>
                        <div className="grid grid-cols-2 gap-5 mt-7">
                            <div className="flex flex-col gap2 col-span-1">
                                <label className="text-s2 text-grey-500">Name</label>
                                <p className="text-grey-900">{zone?.zoneName || ""}</p>
                            </div>
                            <div className="flex flex-col gap2 col-span-1">
                                <label className="text-s2 text-grey-500">Category</label>
                                <p className="text-grey-900">{zone?.zoneCategoryName || "N/A"}</p>
                            </div>
                            <div className="col-span-2 flex flex-col gap-2">
                                <label className="text-s2 text-grey-500">Description</label>
                                <p>{zone?.description || ""}</p>
                            </div>
                            <div className="col-span-2 w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2 w-full h-full">
                                    <label className="text-s2 text-grey-500">Video Link</label>
                                    <iframe className="w-full h-90 rounded-md border" src={zone?.videoLink || ""} title="Video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                </div>
                                <div className="flex flex-col gap-2 w-full h-full">
                                    <label className="text-s2 text-grey-500">Zone Image</label>
                                    <SmartImage src={zone?.pictureLink || ""} className="border !bg-grey-50 w-full h-90 object-cover rounded-md" alt="zone-image" width={300} height={100} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Innercard>
                <Innercard>
                    <div className="grid grid-cols-1 gap-5 ">
                        <div className="flex justify-between items-center gap-2">
                            <h1 className="text-s1 shrink-0">Artifact Information</h1>
                            <AddZoneArtifact />
                        </div>
                        <ArtifactZone />
                        <ArtifactZone />
                    </div>
                </Innercard>
            </Maincard >
        </>
    )
}
