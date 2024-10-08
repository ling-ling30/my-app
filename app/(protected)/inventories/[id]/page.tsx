"use client";
import LabelData from "@/components/ui/LabelData";
import { Separator } from "@/components/ui/separator";
import { useFetchInventoryDetailById } from "@/hooks/getData";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { DataTable } from "./_components/TransactionTable";
import { InventoryTransactionSheet } from "@/components/sheets/transaction/transaction-sheet";
import { Button } from "@/components/ui/button";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const id = params.id;

  const [openSheet, setOpenSheet] = useState(false);

  const { data, isLoading, isError } = useFetchInventoryDetailById({
    id,
  });
  if (isLoading || !data) {
    return <Loader2 className="animate-spin" />;
  }
  return (
    <main>
      <section className="p-4 bg-white shadow-sm border m-4 rounded-lg space-y-2">
        <h1 className="text-2xl font-bold">Inventory Details</h1>
        <Separator />
        <LabelData label="Product">
          <p>{data.inventory.product.name}</p>
        </LabelData>
        <LabelData label="Warehouse">
          <p>{data.inventory.warehouse.name}</p>
        </LabelData>
        <LabelData label="Warehouse Description">
          <p>{data.inventory.warehouse.description}</p>
        </LabelData>
        <LabelData label="Location">
          <p>{data.location}</p>
        </LabelData>
      </section>
      <section className="p-4 bg-white shadow-sm border m-4 rounded-lg space-y-2">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Separator />
        <Button onClick={() => setOpenSheet(true)}>Create Transaction</Button>
        <InventoryTransactionSheet
          input={{
            inventoryDetailId: data.id,
          }}
          isOpen={openSheet}
          onClose={() => setOpenSheet(false)}
        />
        <DataTable data={data.transactions} />
      </section>
    </main>
  );
}
