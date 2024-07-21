import React from "react";
import { Navbar } from "./_components/Navbar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

type Props = { children: React.ReactNode };

async function ProtectedLayout({ children }: Props) {
  const session = await auth();
  return (
    <main className=" bg-slate-50 text-[#2f2f2f] min-h-screen text-">
      <SessionProvider session={session}>
        <Navbar session={session} />
        <main className="pl-14">{children}</main>
      </SessionProvider>
    </main>
  );
}
export default ProtectedLayout;
