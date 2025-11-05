import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import MenuItem from "@/components/common/menuItem";

export default function AdminSidebar() {
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
                    <MenuItem link={'/admin/clients'} text={'clients'} icon={'Users'} />
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