import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function LabelData({ children, label }: Props) {
  return (
    <>
      <div className="flex justify-between border-b-2 font-medium space-x-2  py-1 items-center">
        <h3 className="uppercase min-w-[150px] max-w-xl pl-2 text-left text-gray-700 font-semibold">
          {label}
        </h3>
        <div className=" w-full max-w-[300px]">{children}</div>
      </div>
    </>
  );
}
