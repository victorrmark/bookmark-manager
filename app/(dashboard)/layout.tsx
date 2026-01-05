import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import BodyHeader from "@/components/layout/body-header";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full overflow-hidden h-dvh  flex flex-col">
          <Header />
          <div className="px-8 pt-8 flex flex-col gap-5 flex-1 overflow-hidden">
            <BodyHeader />
      
            <div className="p-1 pb-6 h-full outline outline-green-500 overflow-scroll no-scrollbar w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {children}
            </div>

          </div>
        </main>
      </SidebarProvider>
    </>
  );
}
