"use client";

import Link from "next/link";

export default function SideBar() {
  return (
    <>
      <nav className="sidebar bg-sidebar p-4">
        <h2 className="text-sidebar-accent-foreground">
          <div className="basis-1/6 align-middle items-center">
            <h1 className="text-4xl font-extrabold tracking-tight">Astexo</h1>
          </div>
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              className="block px-4 py-2 text-sidebar-foreground hover:text-sidebar-primary-foreground rounded-md"
              href="#"
            >
              Link 1
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 text-sidebar-foreground hover:text-sidebar-primary-foreground rounded-md"
              href="#"
            >
              Link 2
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 text-sidebar-foreground hover:text-sidebar-primary-foreground rounded-md"
              href="#"
            >
              Link 3
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
