"use client";
import { inventory_detail_url } from "@/constant/apiUrl";
import { INVENTORY_DETAIL_QUERY_KEY } from "@/constant/reactQuery";
import { useFetchData } from "@/hooks/ClientFetcher";
import React from "react";
import { DataTable } from "./Table";
import { Loader2 } from "lucide-react";

type Props = {
  product_id: string;
};

export default function InventoryDetails({ product_id }: Props) {
  const { data, isLoading, isError } = useFetchData<InventoryDetail[]>(
    INVENTORY_DETAIL_QUERY_KEY,
    inventory_detail_url
  );
  console.log(data);
  return (
    <div className="w-full">
      {!data ? <Loader2 className="animate-spin" /> : <DataTable data={data} />}
    </div>
  );
}
