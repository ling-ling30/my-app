import React from "react";
import { DataTable } from "./_components/Table";

type Props = {};

export default async function Page({}: Props) {
  return (
    <main>
      <section className="p-4 bg-white shadow-sm border m-4 rounded-lg">
        <h1 className="text-2xl font-bold">Inventories</h1>
        <DataTable />
      </section>
    </main>
  );
}
