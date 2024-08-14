"use client";
import { CreateProductSchema } from "@/constant/schema";
import { useFetchData, usePostData } from "@/hooks/product-Query";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import {
  category_url,
  product_tag_url,
  product_url,
  vendor_url,
} from "@/constant/apiUrl";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  CreateCategoryButton,
  CreateProductTagButton,
  CreateVendorButton,
} from "@/components/sheets/CreateButton";
import {
  CATEGORY_QUERY_KEY,
  PRODUCT_QUERY_KEY,
  PRODUCT_TAG_QUERY_KEY,
  VENDOR_QUERY_KEY,
} from "@/constant/reactQuery";

type Props = {};

export default function AddProductForm({}: Props) {
  const [isPending, startTransition] = useTransition();
  const [openCategory, setOpenCategory] = React.useState(false);
  const [appendedItemIds, setAppendedItemIds] = useState<any>([]);

  const form = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      unitOfMeasurement: "Pcs",
      isActive: true,
      isLowStock: false,
    },
  });
  const { mutate: createProduct } = usePostData<Product>(
    PRODUCT_QUERY_KEY,
    product_url
  );

  //upload file
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

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

  const { fields, append, prepend, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

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
      createProduct(input);
    });
  }

  function onTagSelect(item: any) {
    if (appendedItemIds.includes(item.id)) {
      // If the item's ID is already appended, remove it
      const foundIndex = fields.findIndex((field) => field.id === item.id);

      remove(foundIndex);
      setAppendedItemIds(appendedItemIds.filter((id: any) => id !== item.id));
    } else {
      // If the item's ID is not appended, append it
      append({
        id: item.id,
        name: item.name,
      });
      setAppendedItemIds([...appendedItemIds, item.id]); // Update the appended item IDs
    }
  }
  if (productTags.isLoading || vendors.isLoading || categories.isLoading)
    return <div>Loading...</div>;

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
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.data!.find(
                              (category) => category.id === field.value
                            )?.name
                          : "Select category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem value={""} key={""} onSelect={() => {}}>
                            <CreateCategoryButton />
                          </CommandItem>
                        </CommandGroup>
                        <CommandGroup>
                          {categories.data!.map((item) => (
                            <CommandItem
                              value={item.id}
                              key={item.id}
                              onSelect={() => {
                                form.setValue("categoryId", item.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  item.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {item.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                  <FormLabel>Vendor</FormLabel>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? vendors.data!.find(
                              (category) => category.id === field.value
                            )?.name
                          : "Select vendor"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search vendor..." />
                      <CommandList>
                        <CommandEmpty>No vendor found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem value={""} key={""} onSelect={() => {}}>
                            <CreateVendorButton />
                          </CommandItem>
                        </CommandGroup>
                        <CommandGroup>
                          {vendors.data!.map((item) => (
                            <CommandItem
                              value={item.id}
                              key={item.id}
                              onSelect={() => {
                                form.setValue("vendorId", item.id);
                              }}
                            >
                              {item.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        Select Tags
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem value={""} key={""} onSelect={() => {}}>
                            <CreateProductTagButton />
                          </CommandItem>
                        </CommandGroup>
                        <CommandGroup>
                          {productTags.data!.map((item) => (
                            <CommandItem
                              value={item.id}
                              key={item.id}
                              onSelect={() => onTagSelect(item)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  appendedItemIds.includes(item.id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {item.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <section className="flex space-x-2">
            {fields.map((field, index) => (
              <div
                className="bg-accent px-4 py-2 rounded-md flex items-center justify-between"
                key={field.id}
              >
                <p className="mr-2 ">{field.name}</p>
                <span className="text-xs ">X</span>
              </div>
            ))}
          </section>

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
