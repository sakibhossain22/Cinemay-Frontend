import { userService } from "@/services/userService";


interface LayoutProps {
    user: React.ReactNode;
    admin: React.ReactNode;
}
export default async function DashboardLayout({ user, admin }: LayoutProps) {
    const { user: currentUser } = await userService.getSession()

    const role = currentUser?.role
    return (
        <>
            <div>
                {role === "USER" && user}
                {role === "ADMIN" && admin}
            </div>
        </>

    )
}