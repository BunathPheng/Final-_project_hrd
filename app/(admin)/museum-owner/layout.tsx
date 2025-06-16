import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppSidebarOwer } from "@/components/ui/app-sidebar-owner";
import { RightDrawer } from "@/components/layout/right-drawer";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebarOwer />
            <main className="w-full">
                <div className="w-full flex justify-between py-5 items-center px-7">
                    <SidebarTrigger />
                    <div className="flex gap-8">
                        <RightDrawer isAdmin={false} />
                        <div className="inline-flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h6 className="text-btn-sm">Museum Owner</h6>
                        </div>
                    </div>
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}
