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
import { Bell, LogOut } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavbarDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="z-50 h-16 flex flex-row items-center bg-purple-900/15 backdrop-blur-xs p-4 rounded-md">
        <div className="ml-auto flex flex-row gap-2 items-center">
          <Button className="text-primary hover:text-primary" variant="outline"><Bell /></Button>
          <ModeToggle />
          {/* User Menu */}
          <div className="ml-2 cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="bg-purple-900/20 rounded-sm p-2">
                {/* User Avatar */}
                <div className="flex flex-row items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-xs text-left text-primary">
                    <p className="ml-2">{user?.name}</p>
                    <p className="ml-2">{user?.email}</p>
                  </div>
                </div>
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
                <DropdownMenuItem onClick={handleLogout} variant="destructive">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* User Menu */}

        </div>
      </div>
    </>
  );
}
