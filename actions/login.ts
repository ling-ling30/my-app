"use server";
import { z } from "zod";
import { LoginSchema } from "../app/auth/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid credentials!",
    };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return null;
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      return { error: "Something went wrong!" };
    }
    throw error;
  }
};
