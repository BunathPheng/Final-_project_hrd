export default function MuseumDetailLoading() {
    return (
        <div className="grid w-full animate-pulse">
            <div className="bg-grey-100 h-96 w-full relative">
                <div className="absolute top-5 left-5 rounded-full w-40 h-10 bg-grey-200"></div>
                <div className="container pd-screen grid gap-12 absolute left-1/2 -translate-x-1/2 -bottom-13">
                    <div className="h-10 rounded-md bg-grey-200 w-44"></div>
                    <div className="bg-white border-t-4 border-grey-200 px-10 shadow-600 h-26 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="h-16 w-16 bg-grey-200 rounded-md"></div>
                            <div className="flex gap-1.5">
                                <div className="w-6 h-6 bg-grey-200 rounded-md"></div>
                                <div className="w-6 h-6 bg-grey-200 rounded-md"></div>
                                <div className="w-6 h-6 bg-grey-200 rounded-md"></div>
                                <div className="w-6 h-6 bg-grey-200 rounded-md"></div>
                                <div className="w-6 h-6 bg-grey-200 rounded-md"></div>
                            </div>
                            <div className="h-8 w-36 bg-grey-200 rounded-md"></div>
                        </div>
                        <div className="flex gap-5">
                            <div className="rounded-md w-36 h-12 bg-grey-200"></div>
                            <div className="rounded-md w-36 h-12 bg-grey-200"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-5 w-full mt-28 container pd-screen">
                <div className="h-12 w-36 bg-grey-200 rounded-md"></div>
                <div className="h-12 w-36 bg-grey-200 rounded-md"></div>
                <div className="h-12 w-36 bg-grey-200 rounded-md"></div>
                <div className="h-12 w-36 bg-grey-200 rounded-md"></div>
            </div>
            <div className="mt-10 container pd-screen">
                <div className="bg-grey-200 w-full h-96 rounded-md"></div>
            </div>
        </div>
    );
}
