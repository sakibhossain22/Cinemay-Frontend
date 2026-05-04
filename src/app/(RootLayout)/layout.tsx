import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import "../globals.css";
import Navbar from "@/components/navbar1";
import { AppSidebar } from "@/components/home/app-sidebar";
import BottomNav from "@/components/home/BottomNav";
import { getSession } from "@/services/userService";
import { authClient } from "@/lib/authClient";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider"; // ১. থিম প্রোভাইডার ইমপোর্ট করো

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    // ২. এখান থেকে 'bg-black' এবং 'dark' ক্লাস দুটি সরিয়ে ফেলো। 
    // পরিবর্তে 'bg-white dark:bg-black' এবং 'text-zinc-900 dark:text-zinc-100' ব্যবহার করো।
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 antialiased min-h-screen flex flex-col transition-colors duration-300">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar userInfo={session} />

        <SidebarProvider>
          <div className="flex flex-1 w-full overflow-hidden">
            <AppSidebar />

            <main className="flex-1 w-full relative min-w-0 overflow-y-auto h-[calc(100vh-64px)]">
              <div className="p-2 sticky top-[72px] z-30 bg-white/40 dark:bg-black/40 backdrop-blur-md inline-block rounded-r-xl border border-zinc-200 dark:border-white/5 border-l-0">
                <SidebarTrigger className="hidden md:flex text-emerald-600 dark:text-emerald-500 hover:bg-emerald-500/10 transition-all" />
              </div>

              <div className="lg:px-6 px-2 pb-2 lg:pb-12 md:pb-6">
                {children}
              </div>
              <Footer />
            </main>
          </div>
        </SidebarProvider>
        <BottomNav />
        <Toaster richColors theme="dark" position="top-center" />
      </ThemeProvider>
    </div>
  );
}