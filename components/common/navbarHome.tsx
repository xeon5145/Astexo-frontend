"use client";

import LoginBox from "../auth/loginBox";
import ModeToggle from "./themeToggle";
// import NavigationMenuRow from "@/components/common/navigationMenu";

export default function NavbarHome() {
  return (
    <>
      <div className="flex flex-row sticky top-5 mx-4 z-50 h-16 justify-between bg-purple-900/15 backdrop-blur-xs p-4 rounded-md">
        <div className="basis-1/6 align-middle items-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary">Astexo</h1>
        </div>

        <div className="basis-4/6 flex justify-end items-center gap-4">
          {/* <NavigationMenuRow /> */}
          <ModeToggle />
          <LoginBox />
        </div>
      </div>
    </>
  );
}
