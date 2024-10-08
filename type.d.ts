type Product = {
  id: string;
  SKU: string;
  name: string;
  description?: string;
  color?: string;
  sellingPrice: string;
  minBulkQuantity?: string;
  bulkPrice?: string;
  unitOfMeasurement: string;
  minStockLevel: string;
  isActive: boolean;
  isLowStock: boolean;
  categoryId: string;
  vendorId: string;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  vendor: Vendor;
  photos: Photo[];
  tags: ProductTagBridge[];
  inventory: Inventory[];
  purchaseOrderItems: PurchaseOrderItem[];
  salesOrderItems: SalesOrderItem[];
};

type TransactionType =
  | "PURCHASE"
  | "SALE"
  | "ADJUSTMENT"
  | "TRANSFER"
  | "INITIAL";
type InventoryStatus = "AVAILABLE" | "RESERVED" | "IN_TRANSIT" | "DAMAGED";
type OrderStatus = "PENDING" | "RECEIVED" | "CANCELLED";

type Photo = {
  id: string;
  url: string;
};

type ProductTagBridge = {
  productId: string;
  productTagId: string;
  productTag: ProductTag;
};

type ProductTag = {
  id: string;
  name: string;
};

type Inventory = {
  id: string;
  productId: string;
  warehouseId: string;
  total_quantity: number;
  averageCost: number;
  product: Product;
  warehouse: Warehouse;
  details: InventoryDetail[];
};

type InventoryDetail = {
  id: string;
  inventoryId: string;
  location: string;
  quantity: number;
  expiryDate: DateTime;
  inventory: Inventory;
  transactions: InventoryTransaction[];
};

type InventoryTransaction = {
  id: string;
  inventoryDetailId: string;
  status: InventoryStatus;
  transactionType: TransactionType;
  quantity: number;
  unitPrice: number;
  transactionDate: Date;
  referenceId: string;
  note: string;
  inventoryDetail: InventoryDetail;
};

type Warehouse = {
  id: string;
  name: string;
  description: string;
  inventories: inventory[];
};

type Vendor = {
  id: string;
  name: string;
  address: string;
  telephone: string;
  products: Product[];
  purchaseOrders: PurchaseOrder[];
};

type Tag = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  description: string;
  products: [Product];
  tags: [CategoryTag];
};
