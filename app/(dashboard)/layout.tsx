import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import BodyHeader from "@/components/layout/body-header";
import { BookmarkProvider } from "./BookmarkContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <>
      <BookmarkProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full overflow-hidden h-dvh  flex flex-col">
            <Header />
            <div className="px-8 pt-8 flex flex-col gap-5 flex-1 overflow-hidden">
              <BodyHeader />

              <div
                className="p-1 pb-6  overflow-scroll no-scrollbar w-full 
              grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8"
              >
                {children}
              </div>

            </div>
          </main>
        </SidebarProvider>
      </BookmarkProvider>
    </>
  );
}
