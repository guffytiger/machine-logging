import { Appbar } from "@/components/Appbar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <Appbar />
        <main className="p-6 md:p-10">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
