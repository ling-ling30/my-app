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
import { Tag, TrashIcon } from "lucide-react";
import { TagSchema } from "@/constant/schema";

type FormValues = z.input<typeof TagSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export default function ProductTagForm({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(TagSchema),
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
                <Input
                  {...field}
                  disabled={disabled}
                  placeholder="e.g. 2024, Engine, Body"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Save Changes" : "Create Product Tag"}
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
            <p className="ml-2">Delete Product Tag</p>
          </Button>
        )}
      </form>
    </Form>
  );
}
