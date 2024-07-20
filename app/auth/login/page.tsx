import React from "react";
import { LoginForm } from "./_components/Form";
import CardWrapper from "@/components/auth/card-wrapper";

type Props = {};

export default function Page({}: Props) {
  return (
    <div>
      <CardWrapper
        title="Login"
        footerHref="/auth/register"
        footerLabel="Don't have an account?"
        showSocial
      >
        <LoginForm />
      </CardWrapper>
    </div>
  );
}
