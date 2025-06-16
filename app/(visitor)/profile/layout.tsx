import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebarVisitor } from "@/components/ui/app-sidebar-visitor";
import { VisitorHeader } from "@/components/layout/visitor-header";


export default function DashboardVisitorLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header - Fixed at top */}
            <div className="flex-shrink-0 z-50 sticky top-0">
                <VisitorHeader />
            </div>
            {/* Sidebar and Main Content - Below header */}
            <div className="flex-1 flex">
                <SidebarProvider>
                    <AppSidebarVisitor />
                    <main className="flex-1 min-h-0">
                        {/* Main content area with responsive padding */}
                        <div className="container h-full p-3 sm:p-4 md:p-6 lg:p-5 bg-[#F6F7FA]">
                            <section className='bg-white p-6 rounded-[10px]'>
                                {children}
                            </section>
                        </div>
                    </main>
                </SidebarProvider>
            </div>
        </div>
    );
}