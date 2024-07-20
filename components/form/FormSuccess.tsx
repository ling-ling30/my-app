import { TriangleAlert, TriangleAlertIcon } from "lucide-react";
import React from "react";

type Props = { message: string };

export default function FormSuccess({ message }: Props) {
  return (
    <div className=" bg-emerald-500/15 rounded-md py-3 px-5 text-sm items-center flex gap-x-2 text-emarald-500">
      <TriangleAlert className="w-4" />
      <p>{message}</p>
    </div>
  );
}
