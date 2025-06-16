import ScrollToTop from "@/components/feature/button/scroll-top";

export default function MuseumLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<>
        <ScrollToTop />
        {children}
    </>)
}
