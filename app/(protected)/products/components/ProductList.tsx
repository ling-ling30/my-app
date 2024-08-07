"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useFetchData } from "@/hooks/product-Query";
import { PlusCircleIcon, PlusIcon } from "lucide-react";

type Props = {};

function ProductList({}: Props) {
  const { isError, isLoading, data } = useFetchData<Product[]>(
    "products",
    "/products"
  );
  console.log(data);
  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  //   const products = [
  //     {
  //       id: 1,
  //       name: "Product 1",
  //       description: "This is a product description",
  //       price: 100,
  //     },
  //     {
  //       id: 2,
  //       name: "Product 2",
  //       description: "This is a product description",
  //       price: 200,
  //     },
  //     {
  //       id: 3,
  //       name: "Product 3",
  //       description: "This is a product description",
  //       price: 300,
  //     },
  //   ];
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card>
        <div className="flex items-center justify-center h-full">
          <Button size="lg" variant="outline">
            <Link href="/products/create" className="flex items-center">
              <PlusIcon className="mr-2 size-6" /> Add Product
            </Link>
          </Button>
        </div>
      </Card>
      {data?.map((product) => (
        <Card key={product.id}>
          <Image
            src={product.photos[0]?.url || ""}
            alt={product.name}
            width={300}
            height={300}
            className="rounded-t-lg object-cover w-full aspect-square"
          />
          <CardContent className="p-4">
            <h3 className="text-[2rem] font-semibold">{product.name}</h3>
            <p className="text-[1rem] text-muted-foreground">
              {product.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-[1.5rem] font-bold">
                ${Number(product.sellingPrice).toFixed(2)}
              </div>
              <Button size="sm">Add to Cart</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ProductList;
