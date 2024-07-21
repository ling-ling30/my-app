import { auth, signOut } from "@/auth";
import LogOutButton from "@/components/auth/log-out-button";
import { Button } from "@/components/ui/button";

import React from "react";
import Overview from "./_components/Overview";

type Props = {};

export default async function Page({}: Props) {
  const session = await auth();
  return (
    <div className="w-full min-h-screen p-5 justify-center items-center">
      <Overview />
    </div>
  );
}
