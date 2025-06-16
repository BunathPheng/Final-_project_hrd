"use client"
import Image from "next/image"
import { EditArtifacts } from "./edit-artifact"
import { DeleteArtifact } from "./delete-artifact"
import { useState } from "react"

interface Artifact {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export default function ArtifactZone() {
    // Initialize with your original artifact data
    const [artifacts, setArtifacts] = useState<Artifact[]>([
        {
            id: "1",
            title: "Treasure of Cambodia",
            description: "Located in the southeast of the Indochina peninsula between longitudes 103º and 108º and between the 10th and 15th parallels, Cambodia is bounded on the north and west by Laos and Thailand, and to the south and east by Vietnam. It has a surface area of 181,035 square kilometres with a population of about eleven and one-half million people (statistics: 1998 census).",
            imageUrl: "https://i.pinimg.com/736x/0e/61/dd/0e61dd97624e5a91581ec4cde8bff6db.jpg"
        }
    ]);

    const handleDeleteArtifact = (artifactId: string) => {
        // Remove the artifact from the state
        setArtifacts(prev => prev.filter(artifact => artifact.id !== artifactId));
        console.log(`Artifact ${artifactId} deleted successfully`);
    };


    return (
        <>
            {artifacts.map((artifact) => (
                <section key={artifact.id} className="flex gap-5">
                    <div className="flex border-1 border-grey-400 gap-15 p-4 rounded-md">
                        <div className="">
                            <h1 className="text-s2 text-grey-900 mb-2">
                                {artifact.title}
                            </h1>
                            <p className="text-gray-700 text-p1 shrink-0 text-justify">
                                {artifact.description}
                            </p>
                        </div>
                        <div className="bg-[#F4F6F8] p-6 rounded-lg flex justify-center">
                            <Image
                                src={artifact.imageUrl}
                                alt={`${artifact.title} artifact`}
                                width={300}
                                height={300}
                                className="rounded-lg shadow-md w-2xl h-56 object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        {/* Delete Button with props */}
                        <DeleteArtifact 
                            artifactId={artifact.id}
                            onDelete={handleDeleteArtifact}
                        />
                        <EditArtifacts />
                    </div>
                </section>
            ))}
        </>
    )
}