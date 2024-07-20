import React from "react";
import { RegisterForm } from "./_components/Form";
import CardWrapper from "@/components/auth/card-wrapper";

type Props = {};

export default function Page({}: Props) {
  return (
    <div>
      <CardWrapper
        title="Register"
        footerHref="/auth/login"
        footerLabel="Back to login"
        showSocial
      >
        <RegisterForm />
      </CardWrapper>
    </div>
  );
}
