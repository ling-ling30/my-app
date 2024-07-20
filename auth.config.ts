import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getUserByEmail } from "./data/user";
import { LoginSchema } from "./app/auth/schema";
import bcrypt from "bcryptjs";
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          throw new CredentialsSignin("Invalid credentials");
        }
        const { email, password } = validatedFields.data;

        const existingUser = await getUserByEmail(email);

        if (!existingUser || !existingUser.password) {
          throw new CredentialsSignin("Invalid credentials!");
        }
        console.log(existingUser);

        const passwordMatch = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!passwordMatch) {
          throw new CredentialsSignin("Invalid credentials!");
        }
        return existingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
