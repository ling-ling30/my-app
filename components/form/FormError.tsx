import { TriangleAlert, TriangleAlertIcon } from "lucide-react";
import React from "react";

type Props = { message: string };

export default function FormError({ message }: Props) {
  return (
    <div className=" bg-destructive/15 rounded-md py-3 px-5 text-sm items-center flex gap-x-2 text-destructive">
      <TriangleAlert className="w-4" />
      <p>{message}</p>
    </div>
  );
}
