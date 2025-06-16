import { Facebook, SmsTracking } from "iconsax-reactjs"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

export const VisitorFooter: FC = () => {
    return (
        <footer className="bg-white pt-20 w-full">
            <section className="container pd-screen grid sm:grid-cols-2 lg:grid-cols-9 2xl:lg:grid-cols-8 gap-12 lg:gap-5">
                {/* Logo */}
                <div className="lg:col-span-2 flex flex-col gap-2">
                    <Image src="/logo.svg" width={79} height={92} alt="Logo" />
                    <p className="text-p1 text-grey-900">Solid Stone, Eternal Memory</p>
                    <div className="flex items-center gap-3 mt-1">
                        <Facebook className="text-grey-900" size={24} />
                        <SmsTracking className="text-grey-900" size={24} />
                    </div>
                </div>

                {/* Explore */}
                <div className="lg:col-span-2 flex flex-col gap-3">
                    <h3 className="text-h5 text-grey-900">Explore</h3>
                    <nav className="flex flex-col gap-2 [&>*]:text-grey-900">
                        <Link className="text-p1 w-fit hover:text-primary-700" href="/explore">Home</Link>
                        <Link className="text-p1 w-fit hover:text-primary-700" href="/events">Events</Link>
                        <Link className="text-p1 w-fit hover:text-primary-700" href="/museum">Museum</Link>
                        <Link className="text-p1 w-fit hover:text-primary-700" href="/about-us">About Us</Link>
                        <Link className="text-p1 w-fit hover:text-primary-700" href="/faq">FAQ</Link>
                    </nav>
                </div>

                {/* Address */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-h5 text-grey-900">Address</h3>
                        <p className="text-p1 text-grey-900">#12, St 323, Sangkat Boeung Kak II, Khan Toul Kork, Phnom Penh, Cambodia.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-h5 text-grey-900">Contact</h3>
                        <p className="text-p1 text-grey-900 inline-flex items-center gap-2">
                            <SmsTracking className="text-grey-900" size={22} />
                            selamonty@gmail.com
                        </p>
                    </div>
                </div>

                {/* Sponsor */}
                <div className="lg:col-span-3 2xl:col-span-2 flex flex-col gap-6">
                    <h3 className="text-h5 text-grey-900">Sponsor</h3>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-5">
                            <Image src="/footer/kb.svg" height={35} width={108} alt="KB" />
                            <Image src="/footer/webcash.svg" height={37} width={190} alt="Webcash" />
                        </div>
                        <Image src="/footer/ptc.svg" height={42} width={50} alt="PTC" />
                    </div>
                </div>
            </section>

            {/* Footer Image */}
            <div className="container mt-10 md:mt-20 w-full max-w-full overflow-hidden flex justify-between">
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
