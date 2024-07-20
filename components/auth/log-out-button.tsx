import { auth, signOut } from "@/auth";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

export default async function LogOutButton({}: Props) {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut({
            redirectTo: "/",
          });
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
