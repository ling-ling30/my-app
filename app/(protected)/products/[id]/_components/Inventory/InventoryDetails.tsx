"use client";

import React from "react";
import { DataTable } from "./Table";
import { Loader2 } from "lucide-react";
import { useFetchInventoryDetails } from "@/hooks/getData";

type Props = {
  product_id: string;
};

export default function InventoryDetails({ product_id }: Props) {
  const { data, isLoading, isError } = useFetchInventoryDetails(product_id);
  return (
    <div className="w-full">
      {!data ? <Loader2 className="animate-spin" /> : <DataTable data={data} />}
    </div>
  );
}
