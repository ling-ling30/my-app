"use client";
import React from "react";
import { NewCategorySheet } from "../sheets/category/category-sheet";
import { NewVendorSheet } from "../sheets/vendor/vendor-sheet";
import { NewProductTagSheet } from "../sheets/productTags/product-tags-sheet";
import { NewWarehouseSheet } from "../sheets/warehouse/warehouse-sheet";

type Props = {};

export default function SheetProvider({}: Props) {
  return (
    <>
      <NewCategorySheet />
      <NewVendorSheet />
      <NewProductTagSheet />
      <NewWarehouseSheet />
    </>
  );
}
