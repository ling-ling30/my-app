"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { LoginSchema } from "../../schema";
import FormSuccess from "@/components/form/FormSuccess";
import FormError from "@/components/form/FormError";
import { useState, useTransition } from "react";
import { login } from "@/actions/auth/login";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      login(data).then((data) => {
        if (!data) {
          return;
        }
        if (data?.error) {
          setError(data?.error);
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
          <div className="relative">
            <Separator className="absolute" />
            <p className="bg-white inline-block relative left-1/3 px-2 bottom-3  text-slate-400">
              or continue with
            </p>
          </div>
        </form>
      </Form>
    </>
  );
}
