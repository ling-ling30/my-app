import LogOutButton from "@/components/auth/log-out-button";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <Link href={"/auth/login"}>
        <Button>Login</Button>
      </Link>
    </div>
  );
}
