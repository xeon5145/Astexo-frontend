import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminSidebar2() {
    return (
        <>
            {/* Header */}
            <div className="p-4">
                <h2 className="text-2xl font-bold text-sidebar-foreground">Astexo Admin</h2>
            </div>
            <Button variant="outline" className="">
                Dashboard
            </Button>

            {/* Footer Actions */}
                
        </>

    );
}