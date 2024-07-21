"use server";

import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { RegisterSchema } from "@/app/auth/schema";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: `Invalid credentials!`,
    };
  }

  const { name, email, password } = validatedFields.data;

  // check if email already exist in database
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: `Email is already in used!`,
    };
  }
  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.create({
    data: {
      ...validatedFields.data,
      password: hashedPassword,
    },
  });

  return {
    success: true,
  };
};
