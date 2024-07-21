import Link from "next/link";
import React from "react";

type Props = { children: React.ReactNode; href?: string; Icon?: any };

export default function TopbarMenu({ children, href, Icon }: Props) {
  return (
    <Link
      href={href || "#"}
      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      prefetch={false}
    >
      <Icon className="h-5 w-5" />
      {children}
    </Link>
  );
}
