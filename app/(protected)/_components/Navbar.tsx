"use client";
import { Button } from "@/components/ui/button";
import UserAvatarDropdown from "@/components/user/user-avatar-dropdown";
import { cn } from "@/lib/utils";
import {
  BirdIcon,
  BoxIcon,
  ChevronLeft,
  ChevronRight,
  Circle,
  GitBranchPlus,
  HomeIcon,
  LogOut,
  Package,
} from "lucide-react";
import { Session } from "next-auth";
import React, { useRef, useState } from "react";
import { useHover } from "usehooks-ts";
import SidebarMenu from "./SidebarMenu";
import LogOutButton from "@/components/auth/log-out-button";
import { signOut } from "next-auth/react";

type Props = {
  session: Session | null;
};

export const Navbar = ({ session }: Props) => {
  const [isExpanding, setIsExpanding] = useState<boolean>(false);
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const logout = async () => {
    await signOut();
  };
  return (
    <>
      <nav className="sticky w-full bg-red-100 sm:hidden">nav</nav>
      <aside
        ref={hoverRef}
        className={cn(
          "bg-slate-50 fixed h-full border z-10 w-14 border-r-2 flex flex-col justify-between py-4 transition-all duration-150 ease-in-out",
          isHover && "w-40"
        )}
      >
        <header className="w-full flex justify-center gap-y-2 flex-col px-2">
          <SidebarMenu showChildren={isHover} Icon={BirdIcon} href="#">
            My-app
          </SidebarMenu>
          <p
            className={`text-xs font-semibold text-gray-500 ${
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
    </>
  );
};
