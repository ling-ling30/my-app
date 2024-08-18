"use client";
import ProductList from "./_components/ProductList";
import { useFetchData } from "@/hooks/ClientFetcher";
import { DataTable } from "./_components/Table";
import { product_url } from "@/constant/apiUrl";
import { PRODUCT_QUERY_KEY } from "@/constant/reactQuery";

type Props = {};

export default function Page({}: Props) {
  const { isError, isLoading, data } = useFetchData<Product[]>(
    PRODUCT_QUERY_KEY,
    product_url
  );
  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <main className="">
      {data && (
        <section className="p-4 bg-white shadow-sm border m-4 rounded-lg space-y-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <DataTable data={data} />
        </section>
      )}
    </main>
  );
}
