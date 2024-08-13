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
import { usePostData } from "@/hooks/product-Query";
import { warehouse_url } from "@/constant/apiUrl";
import { WarehouseSchema } from "@/constant/schema";
import { useNewWarehouse } from "./use-warehouse-store";
import WarehouseForm from "./WarehouseForm";

export const NewWarehouseSheet = () => {
  const { isOpen, onClose } = useNewWarehouse();

  const mutation = usePostData("Warehouses", warehouse_url, onClose);
  const onSubmit = (values: z.infer<typeof WarehouseSchema>) => {
    const result = mutation.mutate(values as any);
    console.log(result);
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
