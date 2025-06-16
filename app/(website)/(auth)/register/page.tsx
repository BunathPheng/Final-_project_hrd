import React, { JSX } from 'react'
import Image from 'next/image'
import { RoleComponent } from '../_components/role'
import { AuthHeader } from '@/components/layout/auth-header'

export default function RolePage(): JSX.Element {
    return (
        <>
            <section className="w-full min-h-screen p-6 flex items-center justify-between">
                <AuthHeader />
                <RoleComponent />
                <div className="absolute bottom-0 left-0">
                    <Image
                        src="/auth/apsara.svg"
                        className="object-cover w-[20rem] hidden md:block"
                        width={680}
                        height={680}
                        alt="Apsara"
                    />
                </div>
                <div className="absolute bottom-0 right-0 w-fit h-fit">
                    <Image
                        src="/auth/angkor.svg"
                        className="object-cover ml-auto w-4/6   h-auto"
                        width={813}
                        height={462}
                        alt="Angkor"
                    />
                </div>
            </section>
        </>


    )
}
