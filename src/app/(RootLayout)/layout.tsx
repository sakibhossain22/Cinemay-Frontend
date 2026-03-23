import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

import "../globals.css";
import Navbar from "@/components/navbar1";
import { AppSidebar } from "@/components/home/app-sidebar";
import BottomNav from "@/components/home/BottomNav";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (


        <div className="bg-black dark text-zinc-100 antialiased min-h-screen flex flex-col">
          <Navbar />

          <SidebarProvider>
            <div className="flex flex-1 w-full">

              <AppSidebar />

              <main className="flex-1 w-full relative">

                <div className="p-2 sticky top-[72px] z-30 bg-black/40 backdrop-blur-md inline-block rounded-r-xl border border-white/5 border-l-0">
                  <SidebarTrigger className=" hidden md:flex text-emerald-500 hover:bg-emerald-500/10 transition-all" />
                </div>


                <div className={"px-6 pb-12"}>
                  {children}
                </div>
              </main>
            </div>
          </SidebarProvider>
          <BottomNav />
          <Toaster richColors theme="dark" position="top-center" />
        </div>
      
  );
}