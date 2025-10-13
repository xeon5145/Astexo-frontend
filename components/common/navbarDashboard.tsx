"use client";

import ModeToggle from "@/components/common/themeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell,LogOut } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";

export default function NavbarDashboard() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="z-50 h-16 flex flex-row items-center bg-fuchsia-900/20 backdrop-blur-xs p-4 rounded-md">
        <div className="ml-auto flex flex-row gap-2">
          <Button variant="outline"><Bell /></Button>
          <ModeToggle />
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">User Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  {/* User Profile Section */}
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  {/* User Profile Section */}

                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}  variant="destructive">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}
