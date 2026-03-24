import Sidebar from "@/components/dashboard/Sidebar";

import { userService } from "@/services/userService";



interface LayoutProps {

    user: React.ReactNode;

    admin: React.ReactNode;

}



export default async function DashboardLayout({ user, admin }: LayoutProps) {
    const { user: currentUser } = await userService.getSession();

    const role = currentUser?.role as "USER" | "ADMIN";

    return (

        <div className="min-h-screen bg-[#050505] text-zinc-300 flex">

            {/* Sidebar */}

            <Sidebar role={role} />



            {/* Main Content Area */}

            <main className="flex-1 lg:ml-64 p-6 lg:p-10">

                <div className="max-w-6xl mx-auto">

                    {/* Role Based Content Render */}

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

                        {role === "USER" && user}

                        {role === "ADMIN" && admin}

                    </div>

                </div>

            </main>

        </div>

    );

}