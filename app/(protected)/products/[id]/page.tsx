import { product_url } from "@/constant/apiUrl";
import { fetcherServer } from "@/utils/fetcherServer";
import { useParams } from "next/navigation";
import React from "react";
import PhotoCarousel from "./_components/PhotoCarousel";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const id = params.id;
  const res = await fetcherServer(`${product_url}/${id}`);
  console.log(res);
  const data: Product = res.data;
  return (
    <main>
      <section>
        <div className="flex">
          <PhotoCarousel data={data.photos} />
        </div>
      </section>
    </main>
  );
}
