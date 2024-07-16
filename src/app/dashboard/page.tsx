import { auth, } from "@/auth";
import { WidgetItem } from "@/components/WidgetItem";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/api/auth/signin')
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 sm:grid-cols-2">
            <WidgetItem title="Usuario conectado S-Side" >
                {JSON.stringify(session)}
            </WidgetItem>
        </div>
    )
}
