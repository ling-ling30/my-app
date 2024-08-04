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
  tags: z.array(z.string()).optional(),
  inventory: z.array(z.string()).optional(),
});
