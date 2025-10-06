"use client";

import { Button } from "../ui/button";
import Link from 'next/link';

export default function NavbarHome() {
  return (
    <>
      <div className="sticky top-5 z-50 h-16 flex flex-row justify-between bg-fuchsia-900/20 backdrop-blur-xs p-4 rounded-md">

        <div className="basis-1/6 align-middle items-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Astexo
          </h1>
        </div>

        <div className="basis-4/6 flex justify-end items-center gap-4">
        <Button>
          <Link href="/auth">Login</Link>  
        </Button>
        </div>
      </div>
    </>
  );
}
