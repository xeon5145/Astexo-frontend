import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import MenuItem from "@/components/common/menuItem";

export default function AdminSidebar2() {
    return (
        <>
            {/* Header */}
            <div className="p-4">
                <h2 className="text-2xl text-primary font-bold">Astexo</h2>
                <p className="text-xs text-primary">Admin</p>
            </div>

            {/* Navigation */}
            <nav className="mt-2">
                <ul className="space-y-2">               
                    <MenuItem link={'/admin'}text={'Dashboard'} icon={'LayoutDashboard'} />
                    <MenuItem link={'/admin/users'} text={'Users'} icon={'Users'} />
                    <MenuItem link={'/admin/roles'} text={'Roles'} icon={'Shield'} />
                    <MenuItem link={'/admin/permissions'} text={'Permissions'} icon={'ShieldCheck'} />
                    <MenuItem link={'/admin/audit-logs'} text={'Audit Logs'} icon={'FileText'} />
                    <MenuItem link={'/admin/notifications'} text={'Notifications'} icon={'Bell'} />
                    <MenuItem link={'/admin/settings'} text={'Settings'} icon={'Settings'} />
                </ul>
            </nav>


            {/* Footer */}
            {/* <div className="mt-auto p-4">
                <p className="text-sm text-sidebar-foreground/70">
                    &copy;   {new Date().getFullYear()} Astexo. All rights reserved.
                </p>
            </div> */}

        </>

    );
}