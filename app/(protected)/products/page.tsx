"use client";
import ProductList from "./components/ProductList";
import { useFetchData } from "@/hooks/product-Query";
import { DataTable } from "./components/Table";

type Props = {};

export default function Page({}: Props) {
  const { isError, isLoading, data } = useFetchData<Product[]>(
    "products",
    "/products"
  );
  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <main className="p-5">
      {data && (
        <>
          <ProductList data={data} />
          <DataTable data={data} />
        </>
      )}
    </main>
  );
}
