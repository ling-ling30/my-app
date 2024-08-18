import { product_url } from "@/constant/apiUrl";
import { fetcherServer } from "@/utils/fetcherServer";
import { useParams } from "next/navigation";
import React from "react";
import PhotoCarousel from "./_components/PhotoCarousel";
import LabelData from "@/components/ui/LabelData";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import InventoryDetails from "./_components/Inventory/InventoryDetails";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const id = params.id;
  const res = await fetcherServer(`${product_url}/${id}`);
  const data: Product = res.data;
  return (
    <main className="p-2">
      <section className="flex border flex-wrap p-4">
        <PhotoCarousel className="flex-1" data={data.photos} />
        <div className="p-4 w-full border max-w-[800px] bg-white shadow-sm rounded-lg">
          <LabelData label="Name">{data.name}</LabelData>
          <LabelData label="SKU">{data.SKU}</LabelData>
          <LabelData label="Description">{data.description}</LabelData>
          <LabelData label="Price">{data.sellingPrice}</LabelData>
          <LabelData label="Tags">
            <div className="flex space-x-2">
              {data.tags.map((tag) => (
                <p
                  className="px-2  rounded-sm bg-slate-300"
                  key={tag.productTag.id}
                >
                  {tag.productTag.name}
                </p>
              ))}
            </div>
          </LabelData>
          <LabelData label="Category">{data.category.name}</LabelData>
          <LabelData label="Vendor">{data.vendor.name}</LabelData>
          <LabelData label="UoM">{data.unitOfMeasurement}</LabelData>
          <LabelData label="MOQ">{data.minBulkQuantity}</LabelData>
          <LabelData label="MOQ Price">{data.bulkPrice}</LabelData>
        </div>
      </section>
      <section className="border p-4 m-4 bg-white shadow-sm rounded-lg">
        <header className="flex space-x-2">
          <Link href={`/products/${id}/add`}>
            <Button>
              <PlusIcon />
              Add Inventory
            </Button>
          </Link>
        </header>
        <section className="flex border flex-wrap p-4">
          <InventoryDetails product_id={id} />
        </section>
      </section>
    </main>
  );
}
