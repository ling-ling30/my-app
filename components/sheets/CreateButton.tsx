"use client";
import React from "react";
import { Button } from "../ui/button";
import { useNewProductTag } from "./productTags/use-product-tag-store";
import { useNewVendor } from "./vendor/use-vendor-store";
import { useNewCategory } from "./category/use-category-store";
import { PlusIcon } from "lucide-react";
import { useNewWarehouse } from "./warehouse/use-warehouse-store";

type Props = {};

export function CreateCategoryButton({}: Props) {
  const { isOpen, onOpen } = useNewCategory();
  return (
    <Button size={"sm"} variant={"outline"} onClick={onOpen}>
      Create Category
    </Button>
  );
}

export function CreateVendorButton({}: Props) {
  const { isOpen, onOpen } = useNewVendor();
  return (
    <Button size={"sm"} variant={"outline"} onClick={onOpen}>
      Create Vendor
    </Button>
  );
}

export function CreateProductTagButton({}: Props) {
  const { isOpen, onOpen } = useNewProductTag();
  return (
    <Button size={"sm"} variant={"outline"} onClick={onOpen}>
      Create Product Tag
    </Button>
  );
}

export function CreateWarehouseButton({}: Props) {
  const { isOpen, onOpen } = useNewWarehouse();
  return (
    <Button size={"sm"} variant={"outline"} onClick={onOpen}>
      <PlusIcon className="mr-2" />
      Create Warehouse
    </Button>
  );
}
