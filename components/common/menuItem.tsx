import Link from "next/link";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";



export default function MenuItem({ type = "item", link, variant = "ghost", text, icon , menuItems = [] }: { type?: "item" | "menu"; link: string; variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined; text: string; icon: keyof typeof Icons; menuItems?: Array<{ link: string; text: string; icon: keyof typeof Icons }> }) {
    const IconComponent = Icons[icon] as React.ComponentType<{ className?: string }>;

    return (
        <li>
            {type == "menu" ?
                <>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="p-2 w-full hover:bg-purple-900/15 text-primary hover:text-primary hover:no-underline">
                                <div className="flex flex-row justify-start items-center">
                                    <IconComponent className="ml-1 mr-2 h-4 w-4" />
                                    <div className="ml-2">
                                        {text}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="mt-2 ml-2">
                                {Array.isArray(menuItems) && menuItems.map((item, index) => {
                                    const SubIconComponent = Icons[item.icon] as React.ComponentType<{ className?: string }>;
                                    return (
                                        <Link key={index} href={item.link}>
                                            <Button variant={variant} className="w-full justify-start hover:bg-purple-900/15 text-primary hover:text-primary">
                                                <SubIconComponent className="mr-2 h-4 w-4" />
                                                {item.text}
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    {/* </Link> */}
                </>
                :
                <>
                    <Link href={link}>
                        <Button variant={variant} className="w-full justify-start hover:bg-purple-900/15 text-primary hover:text-primary">
                            <IconComponent className="mr-2 h-4 w-4" />
                            {text}
                        </Button>
                    </Link>
                </>
            }
        </li>
    );
}