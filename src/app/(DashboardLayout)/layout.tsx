import Sidebar from "@/components/dashboard/Sidebar";
import UserDropdown from "@/components/dashboard/UserDropdown"; // ইমপোর্ট করুন
import { getSession } from "@/services/userService";
interface LayoutProps {
    user: React.ReactNode;
    admin: React.ReactNode;
}
export default async function DashboardLayout({ user, admin }: LayoutProps) {
    const session = await getSession();
    const role = session?.user?.role as "USER" | "ADMIN";
    const loggedUser = session?.user;

    if (!role) {
        return <div className="min-h-screen flex items-center justify-center text-zinc-500">Loading...</div>;
    }

    return (
        <div className="min-h-screen text-zinc-300 flex overflow-x-hidden">
            <Sidebar role={role} />

            <main className="flex-1 w-full lg:ml-64 transition-all duration-300">
                {/* প্রোফাইল আইকন সহ টপ নেভবার */}
                <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 lg:px-10 sticky top-0 backdrop-blur-md z-40">
                    <h2 className="text-xl font-black uppercase tracking-tighter text-emerald-500">
                        {role === "ADMIN" ? "Admin Panel" : "Dashboard"}
                    </h2>
                    <UserDropdown user={loggedUser} />
                </div>

                <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forward">
                        {role === "USER" ? (
                            <section id="user-dashboard-view">{user}</section>
                        ) : (
                            <section id="admin-dashboard-view">{admin}</section>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}