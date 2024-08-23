import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { Dice1, TrashIcon } from "lucide-react";
import { CreateInventoryTransactionSchema } from "@/constant/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useParams } from "next/navigation";

type FormValues = z.input<typeof CreateInventoryTransactionSchema>;

type Props = {
  id?: string;
  defaultValues?: {
    inventoryDetailId?: string;
    transactionType?: TransactionType;
    status?: InventoryStatus;
    quantity?: string;
    unitPrice?: string;
    transactionDate?: string;
    referenceId?: string;
    note?: string;
  };
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export default function TransactinForm({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) {
  const transactionTypes: TransactionType[] = [
    "ADJUSTMENT",
    "PURCHASE",
    "SALE",
    "TRANSFER",
    "INITIAL",
  ];

  const transactionStatus: InventoryStatus[] = [
    "AVAILABLE",
    "RESERVED",
    "IN_TRANSIT",
    "DAMAGED",
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(CreateInventoryTransactionSchema),
    defaultValues: {
      inventoryDetailId: defaultValues?.inventoryDetailId || undefined,
      transactionType: defaultValues?.transactionType || undefined,
      status: defaultValues?.status || undefined,
      quantity: defaultValues?.quantity || undefined,
      unitPrice: defaultValues?.unitPrice || undefined,
      transactionDate:
        defaultValues?.transactionDate || new Date().toISOString(),
      referenceId: defaultValues?.referenceId || undefined,
      note: defaultValues?.note || undefined,
    },
  });

  const handleSubmit = (data: FormValues) => {
    onSubmit(data);
  };

  const handledDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a transaction type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transactionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {(() => {
                        switch (type) {
                          case "ADJUSTMENT":
                            return "Adjustment";
                          case "PURCHASE":
                            return "Purchase";
                          case "SALE":
                            return "Sale";
                          case "TRANSFER":
                            return "Transfer";
                          case "INITIAL":
                            return "Initial";
                        }
                      })()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a transaction status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {transactionStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {(() => {
                        switch (status) {
                          case "AVAILABLE":
                            return "Available";
                          case "RESERVED":
                            return "Reserved";
                          case "IN_TRANSIT":
                            return "In Transit";
                          case "DAMAGED":
                            return "Damaged";
                        }
                      })()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <Input
                {...field}
                placeholder="Enter a quantity"
                className="w-full"
              />
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unitPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Price</FormLabel>
              <Input
                {...field}
                placeholder="Enter a unit price"
                className="w-full"
              />
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="referenceId"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Reference ID</FormLabel>
                <FormDescription>Optional</FormDescription>
              </div>
              <Input
                {...field}
                placeholder="Enter a total price"
                className="w-full"
              />
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Note</FormLabel>
                <FormDescription>Optional</FormDescription>
              </div>
              <Textarea
                {...field}
                placeholder="Enter a note"
                className="w-full"
              />
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          onClick={() => {
            console.log(form.getValues());
          }}
          className="w-full"
          disabled={disabled}
        >
          get value
        </Button>
        <Button className="w-full" disabled={disabled}>
          {id ? "Save Changes" : "Create"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handledDelete}
            className="w-full"
            variant={"outline"}
          >
            <TrashIcon className="size-4" />
            <p className="ml-2">Delete</p>
          </Button>
        )}
      </form>
    </Form>
  );
}
