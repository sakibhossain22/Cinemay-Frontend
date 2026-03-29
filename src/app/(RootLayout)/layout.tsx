import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import "../globals.css";
import Navbar from "@/components/navbar1";
import { AppSidebar } from "@/components/home/app-sidebar";
import BottomNav from "@/components/home/BottomNav";
import { getSession } from "@/services/userService";
import { authClient } from "@/lib/authClient";
import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  const betterSession = await authClient.getSession();
  return (
    <div className="bg-black dark text-zinc-100 antialiased min-h-screen flex flex-col overflow-x-hidden">
      <Navbar userInfo={session} />

      <SidebarProvider>
        <div className="flex flex-1 w-full overflow-hidden">
          
          <AppSidebar />

          <main className="flex-1 w-full relative min-w-0 overflow-y-auto h-[calc(100vh-64px)]">
            
            <div className="p-2 sticky top-[72px] z-30 bg-black/40 backdrop-blur-md inline-block rounded-r-xl border border-white/5 border-l-0">
              <SidebarTrigger className="hidden md:flex text-emerald-500 hover:bg-emerald-500/10 transition-all" />
            </div>

            <div className="px-6 pb-24 md:pb-12">
              {children}
            </div>
            <Footer />
          </main>
        </div>
      </SidebarProvider>
      <BottomNav />
      <Toaster richColors theme="dark" position="top-center" />
    </div>
  );
}