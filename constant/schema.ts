import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  color: z.string().optional(),
  sellingPrice: z.string(),
  minBulkQuantity: z.string().optional(),
  bulkPrice: z.string().optional(),
  unitOfMeasurement: z.string(),
  minStockLevel: z.string(),
  isActive: z.boolean(),
  isLowStock: z.boolean(),
  categoryId: z.string(),
  vendorId: z.string(),
  photos: z.array(z.string()).optional(),
  tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
});

export const CategorySchema = z.object({
  name: z.string(),
});

export const VendorSchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  telephone: z.string().optional(),
});
export const CategoryTagsSchema = z.object({
  name: z.string(),
});

export const TagSchema = z.object({
  name: z.string(),
});

export const WarehouseSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  isMain: z.boolean(),
});

export const CreateInventorySchema = z.object({
  productId: z.string(),
  warehouseId: z.string(),
  quantity: z.string(),
  location: z.string().optional(),
  expiryDate: z.string().optional(),
  note: z.string().optional(),
});

export const CreateInventoryTransactionSchema = z.object({
  inventoryDetailId: z.string(),
  status: z.enum(["AVAILABLE", "RESERVED", "IN_TRANSIT", "DAMAGED"]),
  transactionType: z.enum([
    "PURCHASE",
    "SALE",
    "ADJUSTMENT",
    "TRANSFER",
    "INITIAL",
  ]),
  quantity: z.string(),
  unitPrice: z.string(),
  transactionDate: z.string(),
  referenceId: z.string().optional(),
  note: z.string().optional(),
});
