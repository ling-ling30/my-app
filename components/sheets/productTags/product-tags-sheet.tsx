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
import { product_tag_url } from "@/constant/apiUrl";
import { TagSchema } from "@/constant/schema";
import VendorForm from "./ProductTagsForm";
import { useNewProductTag } from "./use-product-tag-store";
import ProductTagForm from "./ProductTagsForm";

export const NewProductTagSheet = () => {
  const { isOpen, onClose } = useNewProductTag();

  const mutation = usePostData("product-tags", product_tag_url, onClose);
  const onSubmit = (values: z.infer<typeof TagSchema>) => {
    const result = mutation.mutate(values as any);
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-center">
            New Tag
          </SheetTitle>
          <SheetDescription className="text-center">
            Create a new tag
          </SheetDescription>
        </SheetHeader>
        <ProductTagForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
};
