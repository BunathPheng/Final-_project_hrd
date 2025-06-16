"use client";
import { ArrowDown2 } from "iconsax-reactjs";
import Image from "next/image";
import React, { useState, useTransition } from "react";
// import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

type SupportedLanguage = "en" | "kh";
type DisplayLanguage = "Khmer(KH)" | "English(UK)";
type SwitchLanguageProps = {
    color?: string | null;
};

export const SwitchLanguage: React.FC<SwitchLanguageProps> = ({ color }) => {
    // const router = useRouter();
    // const pathname = usePathname();
    const currentLocale = useLocale();
    const [isPending, startTransition] = useTransition();
    
    // Set initial language based on current locale
    const getDisplayLanguage = (locale: string): DisplayLanguage => {
        return locale === "kh" ? "Khmer(KH)" : "English(UK)";
    };
    
    const [language, setLanguage] = useState<DisplayLanguage>(
        getDisplayLanguage(currentLocale)
    );

    const switchLang = (lang: SupportedLanguage): void => {
        if (lang === currentLocale || isPending) return; // Don't switch if same language or pending
        
        const newDisplayLanguage = getDisplayLanguage(lang);
        setLanguage(newDisplayLanguage);
        
        startTransition(() => {
            // Set cookie for the new locale with 1 year expiry
            const expires = new Date();
            expires.setFullYear(expires.getFullYear() + 1);
            
            document.cookie = `locale=${lang}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
            
            // Force a page refresh to apply the new locale
            // This ensures all server components get the new locale
            window.location.reload();
        });
    };

    return (
        <form className="">
            <div className="flex relative w-27 group cursor-pointer z-50">
                <div className="flex w-full justify-between items-center gap-2">
                    <p className={color ? color : "text-grey-400"}>
                        {language}
                    </p>
                    <ArrowDown2
                        size={21}
                        className={`${color ? color : "text-grey-400"} ${
                            isPending ? "animate-spin" : "group-hover:rotate-180"
                        } transition-transform duration-200`}
                    />
                </div>
                <div className="bg-white shadow-2xl rounded h-0 overflow-hidden translate-y-3 group-hover:translate-y-0 transition-all duration-300 group-hover:h-fit absolute top-full left-0 flex flex-col w-full min-w-[120px]">
                    <button
                        onClick={() => switchLang("kh")}
                        type="button"
                        disabled={isPending || currentLocale === "kh"}
                        className={`cursor-pointer flex items-center gap-2 p-3 h-full w-full hover:bg-gray-200 transition-colors ${
                            currentLocale === "kh" ? "bg-gray-100 opacity-75" : ""
                        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <Image
                            src="/flag/khmer.svg"
                            width={18}
                            height={12}
                            alt="Khmer"
                        />
                        <span className="text-gray-700">Khmer</span>
                        {currentLocale === "kh" && (
                            <span className="ml-auto text-xs text-green-600">✓</span>
                        )}
                    </button>
                    <button
                        onClick={() => switchLang("en")}
                        type="button"
                        disabled={isPending || currentLocale === "en"}
                        className={`cursor-pointer flex items-center gap-2 p-3 h-full w-full hover:bg-gray-200 transition-colors ${
                            currentLocale === "en" ? "bg-gray-100 opacity-75" : ""
                        } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <Image
                            src="/flag/english.svg"
                            width={18}
                            height={12}
                            alt="English"
                        />
                        <span className="text-gray-700">English</span>
                        {currentLocale === "en" && (
                            <span className="ml-auto text-xs text-green-600">✓</span>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};