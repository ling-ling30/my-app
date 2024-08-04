"use client";
import { CreateProductSchema } from "@/constant/schema";
import { useFetchData, usePostData } from "@/hooks/product-Query";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as sonner from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputNumberDecimal } from "@/components/ui/InputNumberDecimal";
import { Switch } from "@/components/ui/switch";
import {
  FileState,
  MultiImageDropzone,
} from "@/components/form/MultiImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { inventory_url, tag_url, vendor_url } from "@/constant/apiUrl";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";

type Props = {};

export default function AddProductForm({}: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      unitOfMeasurement: "Pcs",
      isActive: true,
      isLowStock: false,
    },
  });
  const createProduct = usePostData<Product>("products", "/products", {});

  //upload file
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  const productTags = useQuery<Tag[]>({
    queryKey: ["productYags"],
    queryFn: async () => {
      const res = await fetcher(tag_url);
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

  const vendors = useQuery<Vendor[]>({
    queryKey: ["vendors"],
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

  console.log(productTags, vendors);
  function onSubmit(values: z.infer<typeof CreateProductSchema>) {
    startTransition(async () => {
      let photos: { url: string }[] = [];
      if (fileStates.length > 0) {
        await Promise.all(
          fileStates.map(async (item) => {
            try {
              const res = await edgestore.publicFiles.upload({
                file: item.file as File,
              });
              photos.push({ url: res.url });
              sonner.toast.success("Foto terupload!");
            } catch (err) {
              console.error(err);
            }
          })
        );
      }
      const input = {
        ...values,
        photos: photos,
      };
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <MultiImageDropzone
            value={fileStates}
            onChange={(files) => {
              setFileStates(files);
              console.log(fileStates);
            }}
            dropzoneOptions={{
              maxFiles: 6,
            }}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Description</FormLabel>
                  <FormDescription className="text-xs ">
                    *Optional
                  </FormDescription>
                </div>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Category Id</FormLabel>
                </div>
                <FormControl>
                  <Input placeholder="Category Id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vendorId"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Vendor Id</FormLabel>
                </div>
                <FormControl>
                  <Input placeholder="Vendor Id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Tags</FormLabel>
                </div>
                <FormControl>
                  <Input placeholder="Tags" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Color</FormLabel>
                  <FormDescription className="text-xs ">
                    *Optional
                  </FormDescription>
                </div>
                <FormControl>
                  <Input placeholder="Product Color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sellingPrice"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Selling Price</FormLabel>
                </div>
                <FormControl>
                  <InputNumberDecimal placeholder="Selling Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minBulkQuantity"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Min Bulk Quantity</FormLabel>
                  <FormDescription className="text-xs ">
                    *Optional
                  </FormDescription>
                </div>
                <FormControl>
                  <InputNumberDecimal
                    placeholder="Min Bulk Quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bulkPrice"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Bulk Price</FormLabel>
                  <FormDescription className="text-xs ">
                    *Optional
                  </FormDescription>
                </div>
                <FormControl>
                  <InputNumberDecimal placeholder="Bulk Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unitOfMeasurement"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Unit Of Measurement</FormLabel>
                </div>
                <FormControl>
                  <Input placeholder="Unit Of Measurement" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minStockLevel"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Min Stock Level</FormLabel>
                  <FormDescription className="text-xs ">
                    *Optional
                  </FormDescription>
                </div>
                <FormControl>
                  <InputNumberDecimal
                    placeholder="Min Stock Level"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Is Active</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isLowStock"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Is Low Stock</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inventory"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>Inventory</FormLabel>
                </div>
                <FormControl>
                  <Input placeholder="Inventory" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isPending}
            size={"lg"}
            className="w-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
