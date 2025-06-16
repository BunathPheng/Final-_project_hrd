import HeadingTitle from "@/components/feature/label/heading-title";
import ViewArtifact from "@/components/feature/lib/view-artifact";
import { MuseumDetailProps } from "@/types/museum";
import TextToSpeech from "./text-to-speech";

export const MuseumFeature: React.FC<{ payload: MuseumDetailProps | null }> = ({ payload }) => {

    return (
        <section className="grid gap-16 pb-36">
            <HeadingTitle title="MUSEUM FEATURE" className="text-center" />
            <div className="w-full px-36 relative grid grid-cols-2">
                <div className="flex justify-end w-full">
                    <div className="h-[42rem] translate-x-10 rounded-4xl bg-primary-800 w-full max-w-xl flex items-center">
                        <ViewArtifact src={payload?.museumArtifact?.thirdDModelLink || ""} />
                    </div>
                </div>
                <div className="h-[42rem] p-8 -translate-x-10 translate-y-32 outline-8 outline-white rounded-4xl bg-primary-800 w-full max-w-xl flex flex-col gap-5">
                    <h4 className="text-h4 text-white">{payload?.museumArtifact?.title || ""}</h4>
                    <div className="relative p-10">
                        <div className="absolute top-0 left-0 w-10 h-10 rounded-tl-lg border-l-2 border-t-2 border-yellow"></div>
                        <div className="absolute top-0 right-0 w-10 h-10 rounded-tr-lg border-r-2 border-t-2 border-yellow"></div>
                        <div className="absolute bottom-0 left-0 w-10 h-10 rounded-bl-lg border-l-2 border-b-2 border-yellow"></div>
                        <div className="absolute bottom-0 right-0 w-10 h-10 rounded-br-lg border-r-2 border-b-2 border-yellow"></div>
                        <p className="text-p1 text-white">{payload?.museumArtifact?.description || ""}</p>
                    </div>
                    <div className="flex justify-center w-4/5 mx-auto">
                        <TextToSpeech
                            text={payload?.museumArtifact?.description || ""}
                            autoPlay={false}
                        />
                    </div>
                    <div className="relative py-3 px-8 w-fit self-center">
                        <div className="absolute top-0 left-0 w-8 h-4 rounded-tl-lg border-l-2 border-t-2 border-yellow"></div>
                        <div className="absolute top-0 right-0 w-8 h-4 rounded-tr-lg border-r-2 border-t-2 border-yellow"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-4 rounded-bl-lg border-l-2 border-b-2 border-yellow"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-4 rounded-br-lg border-r-2 border-b-2 border-yellow"></div>
                        <p className="text-p1 text-white">listening to document as audio</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
