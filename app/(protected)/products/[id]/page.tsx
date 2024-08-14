import { product_url } from "@/constant/apiUrl";
import { fetcherServer } from "@/utils/fetcherServer";
import { useParams } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const id = params.id;
  const res = await fetcherServer(`${product_url}/${id}`);
  console.log(res);
  return (
    <main>
      <div>
        <h1>Product</h1>
        <p>ID: {id}</p>
      </div>
    </main>
  );
}
