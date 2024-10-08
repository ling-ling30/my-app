import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { WarehouseSchema } from "@/constant/schema";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type FormValues = z.input<typeof WarehouseSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export default function WarehouseForm({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(WarehouseSchema),
    defaultValues: defaultValues,
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
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={disabled} placeholder="Name" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desciption</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={disabled}
                  placeholder="Description e.g. address, phone number"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="isMain"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex max-w-xs justify-between">
                <FormLabel>Set as Main</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onChange={field.onChange} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Save Changes" : "Create Warehouse"}
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
            <p className="ml-2">Delete Warehouse</p>
          </Button>
        )}
      </form>
    </Form>
  );
}
