import { auth, signOut } from "@/auth";
import React from "react";
import { Button } from "../ui/button";

type Props = { children: React.ReactNode };

export default async function LogOutButton({ children }: Props) {
  const session = await auth();
  return (
    <div>
      <form
        action={async () => {
          "use server";

          await signOut({
            redirectTo: "/",
          });
        }}
      >
        <button type="submit">{children}</button>
      </form>
    </div>
  );
}
