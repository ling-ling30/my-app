import { auth } from "@/auth";
import { generateJWT } from "@/lib/jwt";

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;
let tokenPromise: Promise<string> | null = null;

export const getToken = async (): Promise<string> => {
  const now = Date.now();
  if (tokenCache && now < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  if (tokenPromise) {
    return tokenPromise;
  }

  tokenPromise = (async () => {
    try {
      const session = await auth();
      const token = await generateJWT(session);

      tokenCache = {
        token,
        expiresAt: now + 5000, // 5 seconds in milliseconds
      };

      return token;
    } finally {
      tokenPromise = null;
    }
  })();

  return tokenPromise;
};

export const api_url = process.env.NEXT_PUBLIC_API_URL;

export const fetcherServer = async (url: string, cache?: boolean) => {
  const session = await auth();
  const token = await getToken();

  try {
    const request = () =>
      fetch(`${api_url}${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        cache: cache ? "force-cache" : "no-store",
        credentials: "include",
        next: { revalidate: 10 },
      });
    return (await request()).json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
