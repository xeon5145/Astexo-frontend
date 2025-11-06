"use client"

import * as React from "react"
import Link from "next/link"
import { Building2, Users, FileText, Star, DollarSign, Zap, Shield, BarChart3 } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const features: { title: string; href: string; description: string; icon: React.ReactNode }[] = [
  {
    title: "Dashboard Analytics",
    href: "#features",
    description: "Real-time insights and analytics for your business operations.",
    icon: <BarChart3 className="h-4 w-4" />
  },
  {
    title: "Team Management",
    href: "#features",
    description: "Efficiently manage your team members and their roles.",
    icon: <Users className="h-4 w-4" />
  },
  {
    title: "Invoice Management",
    href: "#features",
    description: "Create, track, and manage invoices with ease.",
    icon: <FileText className="h-4 w-4" />
  },
  {
    title: "Inventory Control",
    href: "#features",
    description: "Keep track of your inventory and stock levels.",
    icon: <Building2 className="h-4 w-4" />
  },
]

export default function NavigationMenuRow() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="#features"
                  >
                    <Zap className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Astexo Platform
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Transform your business operations with powerful tools and analytics.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {features.map((feature) => (
                <ListItem
                  key={feature.title}
                  title={feature.title}
                  href={feature.href}
                  icon={feature.icon}
                >
                  {feature.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                title="For Small Business"
                href="#pricing"
                icon={<Building2 className="h-4 w-4" />}
              >
                Perfect for startups and small businesses looking to streamline operations.
              </ListItem>
              <ListItem
                title="For Enterprise"
                href="#pricing"
                icon={<Shield className="h-4 w-4" />}
              >
                Advanced features and security for large organizations.
              </ListItem>
              <ListItem
                title="Admin Dashboard"
                href="/admin"
                icon={<BarChart3 className="h-4 w-4" />}
              >
                Comprehensive admin panel for managing your entire platform.
              </ListItem>
              <ListItem
                title="Client Portal"
                href="/client"
                icon={<Users className="h-4 w-4" />}
              >
                User-friendly interface for clients to manage their accounts.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="#pricing">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4">
              <ListItem
                title="About Us"
                href="#about"
                icon={<Building2 className="h-4 w-4" />}
              >
                Learn more about our mission and values.
              </ListItem>
              <ListItem
                title="Testimonials"
                href="#testimonials"
                icon={<Star className="h-4 w-4" />}
              >
                See what our customers are saying about us.
              </ListItem>
              <ListItem
                title="Contact"
                href="#contact"
                icon={<Users className="h-4 w-4" />}
              >
                Get in touch with our support team.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
