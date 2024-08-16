"use client";
import React, { startTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePostData } from "@/hooks/ClientFetcher";
import {
  INVENTORY_DETAIL_QUERY_KEY,
  WAREHOUSE_QUERY_KEY,
} from "@/constant/reactQuery";
import { inventory_detail_url } from "@/constant/apiUrl";
import { CreateInventorySchema } from "@/constant/schema";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { warehouse_url } from "@/constant/apiUrl";
import { fetcher } from "@/utils/fetcher";
import { CreateWarehouseButton } from "@/components/sheets/CreateButton";
import { InputNumberDecimal } from "@/components/ui/InputNumberDecimal";
import { Textarea } from "@/components/ui/textarea";

type Props = {};

type FormValues = z.input<typeof CreateInventorySchema>;

export default function InventoryForm({}: Props) {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { mutate, isPending } = usePostData(
    INVENTORY_DETAIL_QUERY_KEY,
    inventory_detail_url,
    () => router.push(`/products/${productId}`)
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(CreateInventorySchema),
    defaultValues: {
      productId: productId,
    },
  });

  const onSubmit = (values: z.infer<typeof CreateInventorySchema>) => {
    startTransition(async () => {
      const result = mutate(values as any);
    });
  };

  const warehouse = useQuery<Warehouse[]>({
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
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        {!warehouse.isLoading ? (
          <FormField
            name="warehouseId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Warehouse</FormLabel>
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
                          ? warehouse.data!.find(
                              (warehouse) => warehouse.id === field.value
                            )?.name
                          : "Select warehouse"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search warehouse..." />
                      <CommandList>
                        <CommandEmpty>No warehouse found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem value={""} key={""} onSelect={() => {}}>
                            <CreateWarehouseButton />
                          </CommandItem>
                        </CommandGroup>
                        <CommandGroup>
                          {warehouse.data!.map((item) => (
                            <CommandItem
                              value={item.id}
                              key={item.id}
                              onSelect={() => {
                                form.setValue("warehouseId", item.id);
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
        ) : (
          <Loader2 className="animate-spin" />
        )}

        <FormField
          name="quantity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <InputNumberDecimal {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="expiryDate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Expiry Date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="note"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea placeholder="Note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isPending}>
          Add Inventory
        </Button>
      </form>
    </Form>
  );
}
