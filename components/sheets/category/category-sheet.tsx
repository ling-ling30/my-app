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
import { category_url } from "@/constant/apiUrl";
import { CategorySchema } from "@/constant/schema";
import { useNewCategory } from "./use-category-store";
import CategoryForm from "./CategoryForm";

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();

  const mutation = usePostData("categories", category_url, onClose);
  const onSubmit = (values: z.infer<typeof CategorySchema>) => {
    const result = mutation.mutate(values as any);
    console.log(result);
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-center">
            New Category
          </SheetTitle>
          <SheetDescription className="text-center">
            Create a category
          </SheetDescription>
        </SheetHeader>
        <CategoryForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
};
