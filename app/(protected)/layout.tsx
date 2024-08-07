"use cli";
import React from "react";
import { Navbar } from "./_components/navbar/Navbar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import QueryClientProviderWrapper from "@/components/providers/QueryClientProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import SheetProvider from "@/components/providers/sheet-provider";
import { Toast } from "@radix-ui/react-toast";
import { Toaster } from "sonner";

type Props = { children: React.ReactNode };

async function ProtectedLayout({ children }: Props) {
  const session = await auth();
  return (
    <main className=" bg-slate-50 text-[#2f2f2f] min-h-screen text-">
      <SessionProvider session={session}>
        <EdgeStoreProvider>
          <QueryClientProviderWrapper>
            <Toaster />
            <SheetProvider />

            <Navbar />
            <main className="sm:pl-14">{children}</main>
          </QueryClientProviderWrapper>
        </EdgeStoreProvider>
      </SessionProvider>
    </main>
  );
}
export default ProtectedLayout;
