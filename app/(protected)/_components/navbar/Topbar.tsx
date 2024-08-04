import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  BriefcaseIcon,
  CalendarIcon,
  HomeIcon,
  LayoutDashboardIcon,
  MenuIcon,
  Package,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import TopbarMenu from "./TopbarMenu";
import UserAvatarDropdown from "@/components/user/user-avatar-dropdown";

type Props = {};

export default function Topbar({}: Props) {
  return (
    <nav className="sticky w-full bg-slate-50 border-b-2 sm:hidden flex  justify-between p-3">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <SheetTitle></SheetTitle>
          <nav className="grid gap-6 text-lg font-medium">
            <TopbarMenu href="/dashboard" Icon={LayoutDashboardIcon}>
              Dashboard
            </TopbarMenu>
            <TopbarMenu href="/products" Icon={Package}>
              Product
            </TopbarMenu>
            <TopbarMenu href="#" Icon={UsersIcon}>
              User
            </TopbarMenu>
            <TopbarMenu href="#" Icon={SettingsIcon}>
              Setting
            </TopbarMenu>
          </nav>
        </SheetContent>
      </Sheet>
      <UserAvatarDropdown />
    </nav>
  );
}
