import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import SocialButton from "./social-button";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footerLabel: string;
  footerHref: string;
  showSocial?: boolean;
};

export default function CardWrapper({
  title,
  description,
  children,
  footerLabel,
  footerHref,
  showSocial = false,
}: Props) {
  return (
    <Card className="min-w-[500px] p-6">
      <CardContent className="w-full space-y-2">
        <CardHeader className="flex w-full justify-center">
          <CardTitle className="text-center text-4xl tracking-wide font-bold text-[#2f2f2f]">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {children}
        <div className="w-full flex flex-col justify-center items-center space-y-4">
          {showSocial && <SocialButton />}
          <Button variant={"link"}>
            <Link href={footerHref}>{footerLabel}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
