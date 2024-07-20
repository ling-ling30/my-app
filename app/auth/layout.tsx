import React from "react";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-300 flex justify-center items-center">
      {children}
    </div>
  );
}
