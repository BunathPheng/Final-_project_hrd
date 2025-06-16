import localFont from "next/font/local"

// Define the Satoshi font (for English/Latin text)
export const satoshi = localFont({
    src: [
        {
            path: "../public/fonts/Satoshi-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/Satoshi-LightItalic.woff2",
            weight: "300",
            style: "italic",
        },
        {
            path: "../public/fonts/Satoshi-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/Satoshi-Italic.woff2",
            weight: "400",
            style: "italic",
        },
        {
            path: "../public/fonts/Satoshi-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/Satoshi-MediumItalic.woff2",
            weight: "500",
            style: "italic",
        },
        {
            path: "../public/fonts/Satoshi-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../public/fonts/Satoshi-BoldItalic.woff2",
            weight: "700",
            style: "italic",
        },
        {
            path: "../public/fonts/Satoshi-Black.woff2",
            weight: "900",
            style: "normal",
        },
        {
            path: "../public/fonts/Satoshi-BlackItalic.woff2",
            weight: "900",
            style: "italic",
        },
    ],
    variable: "--font-satoshi",
    display: "swap",
    fallback: [
        "ui-sans-serif", 
        "system-ui", 
        "-apple-system", 
        "BlinkMacSystemFont",
        "Segoe UI", 
        "Roboto", 
        "Helvetica Neue", 
        "Arial", 
        "sans-serif"
    ]
})

// Define the Kantumruy Pro font (for Khmer text)
export const kantumruyPro = localFont({
    src: [
        {
            path: "../public/fonts/KantumruyPro-Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/KantumruyPro-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/KantumruyPro-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/KantumruyPro-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/KantumruyPro-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-kantumruy-pro",
    display: "swap",
    fallback: [
        "Khmer UI", // Khmer system font
        "ui-sans-serif", 
        "system-ui", 
        "-apple-system", 
        "BlinkMacSystemFont",
        "Segoe UI", 
        "Roboto", 
        "Helvetica Neue", 
        "Arial", 
        "sans-serif"
    ]
})

// Helper function to get font class by locale
export function getFontByLocale(locale: string) {
    switch (locale) {
        case 'km':
        case 'kh':
            return kantumruyPro;
        case 'en':
        default:
            return satoshi;
    }
}