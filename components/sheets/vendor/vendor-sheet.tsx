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
import { vendor_url } from "@/constant/apiUrl";
import { VendorSchema } from "@/constant/schema";
import { useNewVendor } from "./use-vendor-store";
import VendorForm from "./VendorForm";

export const NewVendorSheet = () => {
  const { isOpen, onClose } = useNewVendor();

  const mutation = usePostData("vendors", vendor_url, onClose);
  const onSubmit = (values: z.infer<typeof VendorSchema>) => {
    const result = mutation.mutate(values as any);
    console.log(result);
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-center">
            New Vendor
          </SheetTitle>
          <SheetDescription className="text-center">
            Create a new vendor
          </SheetDescription>
        </SheetHeader>
        <VendorForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
};
