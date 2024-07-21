"use client";

import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import React, { useRef } from "react";
import { useHover } from "usehooks-ts";
import SidebarMenu from "./SidebarMenu";

import { BirdIcon, HomeIcon, LogOut, Package } from "lucide-react";

type Props = {};

export default function Sidebar({}: Props) {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const logout = async () => {
    await signOut();
  };
  return (
    <aside
      ref={hoverRef}
      className={cn(
        "bg-slate-50 hidden sm:flex fixed h-full border z-10 w-14 border-r-2  flex-col justify-between py-4 transition-all duration-150 ease-in-out",
        isHover && "w-40"
      )}
    >
      <header className="w-full flex justify-center gap-y-2 flex-col px-2">
        <SidebarMenu showChildren={isHover} Icon={BirdIcon} href="#">
          My-app
        </SidebarMenu>
        <p
          className={`pt-4 text-xs font-semibold text-gray-500 ${
            isHover ? "block" : "opacity-0"
          }`}
        >
          Main
        </p>
        <SidebarMenu showChildren={isHover} Icon={HomeIcon} href="/dashboard">
          Dashboard
        </SidebarMenu>
        <SidebarMenu showChildren={isHover} Icon={Package} href="/dashboard">
          Product
        </SidebarMenu>
      </header>

      <footer className="w-full flex justify-center gap-y-3 flex-col px-2 ">
        <SidebarMenu showChildren={isHover} Icon={LogOut}>
          <span onClick={logout}>Log out</span>
        </SidebarMenu>
      </footer>
    </aside>
  );
}
