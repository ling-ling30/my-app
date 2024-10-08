import {
  category_url,
  inventory_detail_url,
  product_tag_url,
  product_url,
  vendor_url,
  warehouse_url,
} from "@/constant/apiUrl";
import {
  CATEGORY_QUERY_KEY,
  INVENTORY_DETAIL_QUERY_KEY,
  PRODUCT_QUERY_KEY,
  PRODUCT_TAG_QUERY_KEY,
  VENDOR_QUERY_KEY,
  WAREHOUSE_QUERY_KEY,
} from "@/constant/reactQuery";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useFetchProductTags = () => {
  const productTags = useQuery<Tag[]>({
    queryKey: [PRODUCT_TAG_QUERY_KEY],
    queryFn: async () => {
      const res = await fetcher(product_tag_url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (data.success) {
        return data.data;
      }
      throw new Error("Network response was not ok");
    },
  });
  return productTags;
};

export const useFetchCategories = () => {
  const categories = useQuery<Category[]>({
    queryKey: [CATEGORY_QUERY_KEY],
    queryFn: async () => {
      const res = await fetcher(category_url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (data.success) {
        return data.data;
      }
      throw new Error("Network response was not ok");
    },
  });
  return categories;
};

export const useFetchVendors = () => {
  const vendors = useQuery<Vendor[]>({
    queryKey: [VENDOR_QUERY_KEY],
    queryFn: async () => {
      const res = await fetcher(vendor_url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (data.success) {
        return data.data;
      }
      throw new Error("Network response was not ok");
    },
  });
  return vendors;
};

export const useFetchWarehouses = () => {
  const warehouses = useQuery<Warehouse[]>({
    queryKey: [WAREHOUSE_QUERY_KEY],
    queryFn: async () => {
      const res = await fetcher(warehouse_url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (data.success) {
        return data.data;
      }
      throw new Error("Network response was not ok");
    },
  });
  return warehouses;
};

export const useFetchProducts = () => {
  const products = useQuery<Product[]>({
    queryKey: [PRODUCT_QUERY_KEY],
    queryFn: async () => {
      const res = await fetcher(product_url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (data.success) {
        return data.data;
      }
      throw new Error("Network response was not ok");
    },
  });
  return products;
};

export const useFetchInventoryDetails = (productId?: string) => {
  const inventoryDetails = useQuery<InventoryDetail[]>({
    queryKey: [INVENTORY_DETAIL_QUERY_KEY],
    queryFn: async () => {
      const link = productId
        ? `${inventory_detail_url}?productId=${productId}`
        : inventory_detail_url;
      const res = await fetcher(link);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (data.success) {
        return data.data;
      }
      throw new Error("Network response was not ok");
    },
  });
  return inventoryDetails;
};

export const useFetchInventoryDetailById = ({ id }: { id?: string }) => {
  const inventoryDetail = useQuery<InventoryDetail>({
    queryKey: [INVENTORY_DETAIL_QUERY_KEY + id],
    queryFn: async () => {
      const link = id ? `${inventory_detail_url}/${id}` : inventory_detail_url;
      const res = await fetcher(link);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (data.success) {
        return data.data;
      }
      throw new Error("Network response was not ok");
    },
  });
  return inventoryDetail;
};
