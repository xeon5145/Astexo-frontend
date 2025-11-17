"use client";

import LoginBox from "./loginBox";
import ModeToggle from "../../components/common/themeToggle";
import NavigationMenuRow from "@/components/common/navigationMenu";
import Link from "next/link";

export default function NavbarHome() {
  return (
    <>
      <div className="flex flex-row sticky top-5 mx-4 z-50 h-16 justify-between bg-purple-900/15 backdrop-blur-xs p-4 rounded-md">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary">Astexo</h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* <NavigationMenuRow /> */}
          <ModeToggle />
          <LoginBox />
        </div>
      </div>
    </>
  );
}
