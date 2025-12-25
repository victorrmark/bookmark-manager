import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Header />
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
