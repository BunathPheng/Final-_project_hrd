"use client"

import { TextalignRight } from "iconsax-reactjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

type NavItem = {
    name: string;
    href: string;
    translationKey: string;
};

const navigationItems: NavItem[] = [
    { name: "Explore", href: "/", translationKey: "explore" },
    { name: "Museum", href: "/museum", translationKey: "museum" },
    { name: "Events", href: "/events", translationKey: "event" },
    { name: "About us", href: "/about-us", translationKey: "about us" },
    { name: "FAQ", href: "/faq", translationKey: "faq" },
];

export const NavbarItems: React.FC<{ mobile?: boolean }> = ({ mobile = false }) => {
    const pathname = usePathname();
    const t = useTranslations('navigation');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Hide and show navbar
    const toggleNabbar = () => {
        const content = contentRef.current;

        if (!content) return;
        let height = 0;

        const navText = content.children[0];
        // for (let i = 0; i < navText.length; i++) {
        //     height += navText[i].scrollHeight;
        // }

        height = isOpen ? 0 : navText.scrollHeight;

        content.style.height = `${height}px`;

        setIsOpen(!isOpen);
    }

    return (
        <>
            {!mobile &&
                <nav className="hidden lg:flex gap-7">
                    {navigationItems.map((item) => {
                        const isActive =
                            item.href === pathname ||
                            (pathname.startsWith(item.href) && item.href !== "/");

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`transition-colors hover:text-primary-700 ${isActive
                                    ? "text-s2 text-primary-700"
                                    : "text-p1 text-black"
                                    }`}
                            >
                                {t(item.translationKey)}
                            </Link>
                        );
                    })}
                </nav>
            }

            {mobile &&
                <div className="w-full grid lg:hidden">
                    <button
                        type="button"
                        className="cursor-pointer p-2 rounded-md hover:bg-grey-50"
                        onClick={toggleNabbar}>
                        <TextalignRight />
                    </button>

                    <nav ref={contentRef} className={`transition-all absolute z-50 h-0 border-t top-30 sm:top-34 left-0 w-full overflow-hidden bg-white shadow rounded-ee-xl rounded-es-xl`}>
                        <div className="flex flex-col gap-1 p-5">
                            {navigationItems.map((item) => {
                                const isActive =
                                    item.href === pathname ||
                                    (pathname.startsWith(item.href) && item.href !== "/");

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={toggleNabbar}
                                        className={`transition-colors rounded-md px-5 py-3 hover:text-primary-700 hover:bg-primary-50 ${isActive
                                            ? "text-s2 text-primary-700 bg-primary-50"
                                            : "text-p1 text-black"
                                            }`}
                                    >
                                        {t(item.translationKey)}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            }
        </>
    );
};