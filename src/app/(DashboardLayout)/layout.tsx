

interface LayoutProps {
    customer: React.ReactNode;
    admin: React.ReactNode;
    provider: React.ReactNode;
}
export default function DashboardLayout({ customer, admin, provider }: LayoutProps) {
    return (
        <>
            <div>
                {customer}
            </div>
        </>

    )
}