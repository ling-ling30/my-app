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
import { warehouse_url } from "@/constant/apiUrl";
import { WarehouseSchema } from "@/constant/schema";
import { useNewWarehouse } from "./use-warehouse-store";
import WarehouseForm from "./WarehouseForm";
import { WAREHOUSE_QUERY_KEY } from "@/constant/reactQuery";

export const NewWarehouseSheet = () => {
  const { isOpen, onClose } = useNewWarehouse();

  const mutation = usePostData(WAREHOUSE_QUERY_KEY, warehouse_url, onClose);
  const onSubmit = (values: z.infer<typeof WarehouseSchema>) => {
    const result = mutation.mutate(values as any);
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-center">
            New Warehouse
          </SheetTitle>
          <SheetDescription className="text-center">
            Create a new Warehouse
          </SheetDescription>
        </SheetHeader>
        <WarehouseForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
};
