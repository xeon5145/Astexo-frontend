import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import MenuItem from "@/components/common/menuItem";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function AdminSidebar() {
    return (
        <>
            {/* Header */}
            <div className="p-4">
                <h2 className="text-2xl text-primary font-bold">Astexo</h2>
                <p className="text-xs text-primary"> Role Name </p>
            </div>

            {/* Navigation */}
            <nav className="mt-2">
                <ul className="space-y-2">
                    <MenuItem link={'/client'} text={'Dashboard'} icon={'LayoutDashboard'} />
                    <MenuItem type="menu"  text={'Inventory Management'} icon={'PackageOpen'}
                        menuItems={[
                            { link: 'client/inventory-management', text: 'Dashboard', icon: 'LayoutDashboard' },
                            { link: '/client/invoice-management/list', text: 'Invoice List', icon: 'List' },
                            { link: '/client/invoice-management/templates', text: 'Templates', icon: 'FileText' },
                            { link: '/client/invoice-management/reports', text: 'Reports', icon: 'BarChart' }
                        ]}
                    />

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