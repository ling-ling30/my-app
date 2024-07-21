import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  href?: string;
  Icon?: any;
  showChildren: boolean;
};

export default function SidebarMenu({
  children,
  href,
  Icon,
  showChildren,
}: Props) {
  return (
    <>
      <Link href={href || ""}>
        <div className="flex p-2 hover:bg-slate-50 hover:text-gray-700 text-gray-500">
          <div>{Icon && <Icon className={cn("size-5")} />}</div>

          <p
            className={cn(
              "ml-2 text-sm opacity-0 transition-opacity hover:text-gray-700 font-semibold duration-150 whitespace-nowrap ",
              showChildren && "opacity-100 "
            )}
          >
            {children}
          </p>
        </div>
      </Link>
    </>
  );
}
