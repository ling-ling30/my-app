import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { z } from "zod";
import { usePostData } from "@/hooks/ClientFetcher";
import { inventory_transaction_url, vendor_url } from "@/constant/apiUrl";
import { CreateInventoryTransactionSchema } from "@/constant/schema";
import VendorForm from "./TransactionForm";
import { INVENTORY_TRANSACTION_QUERY_KEY } from "@/constant/reactQuery";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  input: {
    inventoryDetailId?: string;
    transactionType?: TransactionType;
    status?: InventoryStatus;
    quantity?: string;
    unitPrice?: string;
    transactionDate?: string;
    referenceId?: string;
    note?: string;
  };
  isOpen: boolean;
  onClose: () => void;
};

export const InventoryTransactionSheet = ({
  input,
  isOpen,
  onClose,
}: Props) => {
  const mutation = usePostData(
    INVENTORY_TRANSACTION_QUERY_KEY,
    inventory_transaction_url,
    onClose
  );

  const onSubmit = (
    values: z.infer<typeof CreateInventoryTransactionSchema>
  ) => {
    const result = mutation.mutate(values as any);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-center">
            <PlusIcon className="mr-2" />
            Create Transaction
          </SheetTitle>
          <SheetDescription className="text-center">
            Create a transaction
          </SheetDescription>
        </SheetHeader>
        <VendorForm
          defaultValues={input}
          onSubmit={onSubmit}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
