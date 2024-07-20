import React from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { signIn } from "@/auth";

type Props = {};

export default function SocialButton({}: Props) {
  return (
    <>
      <form
        className="w-full h-full"
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button
          type="submit"
          variant={"outline"}
          size={"lg"}
          className="w-full"
        >
          <Icons.GoogleIcon width="24" height="24" />
        </Button>
      </form>
    </>
  );
}
