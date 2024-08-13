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
});
