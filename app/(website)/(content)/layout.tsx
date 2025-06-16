import AOSProvider from "@/components/feature/animation/aos-provider";
import ScrollToTop from "@/components/feature/button/scroll-top";
import { VisitorFooter } from "@/components/layout/visitor-footer";
import { VisitorHeader } from "@/components/layout/visitor-header";

export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<>
        <VisitorHeader />
        <ScrollToTop />
        <main className="grid w-full">
            <AOSProvider>
                {children}
            </AOSProvider>
        </main>
        <VisitorFooter />
    </>)
}
