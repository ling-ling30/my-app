"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "@/components/ui/use-toast";
import { RegisterSchema } from "../../schema";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import FormError from "@/components/form/FormError";
import FormSuccess from "@/components/form/FormSuccess";
import { useRouter } from "next/navigation";
export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      register(data).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          sonner.toast.success("User created!");
          router.push("/auth/login");
        }
      });
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@provider.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {success && <FormSuccess message={success} />}
          {error && <FormError message={error} />}
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
