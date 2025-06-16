"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "iconsax-reactjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JSX } from "react";

export default function NotFoundPage(): JSX.Element {
    const router = useRouter();

    return (
        <div className="min-h-screen w-full container relative">
            <div className="absolute top-1/2 left-1/2 -translate-1/2 flex gap-10 items-center pd-screen">
                <div className="flex flex-col w-full gap-2">
                    <h1 className="text-5xl font-black text-primary-700 whitespace-nowrap">Ooops...</h1>
                    <h2 className="text-5xl font-medium whitespace-nowrap">Page not found</h2>
                    <p className="text-lg font-medium mt-5">
                        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
                    </p>
                    <div className="mt-7">
                        <Button onClick={router.back}>
                            <ArrowLeft className="[&>*]:stroke-2" />
                            Go Back
                        </Button>
                    </div>
                </div>
                <Image src={"/images/404.jpg"} className="w-140 shrink-0" width={768} height={512} alt="404" />
            </div>
            {/* Footer Image */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-between">
                <Image
                    src="/footer/footer.svg"
                    className="mx-auto w-full object-cover"
                    width={1453}
                    height={81}
                    alt="Footer Image"
                />
            </div>
        </div>
    );
}
