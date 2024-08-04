"use client";
import { Button } from "@/components/ui/button";
import UserAvatarDropdown from "@/components/user/user-avatar-dropdown";
import { cn } from "@/lib/utils";
import {
  BirdIcon,
  BoxIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Circle,
  GitBranchPlus,
  HandHelpingIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LogOut,
  MenuIcon,
  Package,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Session } from "next-auth";
import React, { useRef, useState } from "react";
import { useHover } from "usehooks-ts";
import SidebarMenu from "./SidebarMenu";
import LogOutButton from "@/components/auth/log-out-button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type Props = {};

export const Navbar = ({}: Props) => {
  const [isExpanding, setIsExpanding] = useState<boolean>(false);
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const logout = async () => {
    await signOut();
  };
  return (
    <>
      <Topbar />
      <Sidebar />
    </>
  );
};
