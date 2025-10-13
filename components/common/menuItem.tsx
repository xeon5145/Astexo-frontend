import Link from "next/link";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";


export default function MenuItem({ link, variant = "ghost", text , icon }: { link: string; variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined; text: string; icon: keyof typeof Icons }) {
    const IconComponent = Icons[icon] as React.ComponentType<{ className?: string }>;
    
    return (
        <li>
            <Link href={link}>
                    <Button variant={variant} className="w-full justify-start hover:bg-fuchsia-900/20">
                    <IconComponent className="mr-2 h-4 w-4" />
                        {text}
                    </Button>
                </Link>
            </li>
    );
}