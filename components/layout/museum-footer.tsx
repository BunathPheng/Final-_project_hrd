import { Call, Location, Sms } from "iconsax-reactjs"
import Image from "next/image"
import { FC } from "react"

export const MuseumFooter: FC = () => {
    return (
        <footer className="bg-white pt-20 w-full">
            <section className="container pd-screen grid gap-10">
                <h4 className="text-h4 text-center text-grey-900">CONTACT MUSEUM</h4>
                <div className="flex flex-wrap w-full justify-center gap-x-20 gap-y-16">
                    {/* Email */}
                    <div className="basis-auto flex flex-col items-center gap-4">
                        <div className="w-22 h-22 rounded-full bg-primary-700 flex items-center justify-center">
                            <Sms size={40} color="white" />
                        </div>
                        <h5 className="text-s1 text-grey-900">EMAIL (DIRECT MESSAGE)</h5>
                        <div className="flex gap-2">
                            <Image src={"/auth/romdol.svg"} width={16} height={16} alt="Romdom" />
                            <p className="text-p1 text-grey-900">info@museum.com</p>
                        </div>
                    </div>
                    {/* Phone */}
                    <div className="basis-auto flex flex-col items-center gap-4">
                        <div className="w-22 h-22 rounded-full bg-primary-700 flex items-center justify-center">
                            <Call size={40} color="white" />
                        </div>
                        <h5 className="text-s1 text-grey-900">PHONE (LANDLINE)</h5>
                        <div className="flex gap-2">
                            <Image src={"/auth/romdol.svg"} width={16} height={16} alt="Romdom" />
                            <p className="text-p1 text-grey-900">+855 12 345 678</p>
                        </div>
                    </div>
                    {/* Location */}
                    <div className="basis-auto flex flex-col items-center gap-4">
                        <div className="w-22 h-22 rounded-full bg-primary-700 flex items-center justify-center">
                            <Location size={40} color="white" />
                        </div>
                        <h5 className="text-s1 text-grey-900">LOCATION (MUSEUM)</h5>
                        <div className="flex gap-2">
                            <Image src={"/auth/romdol.svg"} width={16} height={16} alt="Romdom" />
                            <p className="text-p1 text-grey-900">STREET 123, PHNOM PENH</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Image */}
            <div className="container mt-12 w-full max-w-full overflow-hidden flex justify-between">
                <Image
                    src="/footer/footer.svg"
                    className="mx-auto w-full object-cover"
                    width={1453}
                    height={81}
                    alt="Footer Image"
                />
            </div>

            {/* All Rights Reserved */}
            <div className="h-12 bg-primary-700 flex items-center justify-center">
                <p className="text-p1 text-white text-center px-2">© 2025 Korea Software HRD Center | All Rights Reserved</p>
            </div>
        </footer>
    )
}
