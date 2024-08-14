import { auth } from "@/auth";
import { generateJWT } from "@/lib/jwt";
import { getSession } from "next-auth/react";

export const api_url = process.env.NEXT_PUBLIC_API_URL;

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
      const session = await getSession();
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

export const fetcher = async (url: string, cache?: boolean) => {
  try {
    const token = await getToken();
    const request = () =>
      fetch(`${api_url}${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
        },
        cache: cache ? "force-cache" : "no-store",
        credentials: "include",
        next: { revalidate: 10 },
      });

    return await request();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const poster = async <T>(
  url: string,
  payload?: unknown,
  credentials = true
) => {
  try {
    const token = await getToken();
    const request = () =>
      fetch(`${api_url}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
        },
        cache: "no-store",
        body: JSON.stringify(payload),
        credentials: credentials ? "include" : "omit",
      });

    return await request();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploader = async <T>(url: string, payload?: any) => {
  try {
    const token = await getToken();

    const formData = new FormData();
    formData.append("file", payload);
    const request = () =>
      fetch(`${api_url}${url}`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
        },
        body: formData,
        credentials: "include",
      });
    return await request();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const putter = async (url: string, payload?: unknown) => {
  try {
    const token = await getToken();

    const request = () =>
      fetch(`${api_url}${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
        },
        cache: "no-store",
        body: JSON.stringify(payload),
        credentials: "include",
      });
    return await request();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patcher = async (url: string, payload?: unknown) => {
  try {
    const token = await getToken();

    const request = () =>
      fetch(`${api_url}${url}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
        },
        cache: "no-store",
        body: JSON.stringify(payload),
        credentials: "include",
      });
    return await request();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleter = async (url: string, payload?: unknown) => {
  try {
    const token = await getToken();
    const request = () =>
      fetch(`${api_url}${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Include the token in the Authorization header
        },
        cache: "no-store",
        body: JSON.stringify(payload),
        credentials: "include",
      });
    return await request();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const authChecker = async () => {
  try {
    const request = () =>
      fetch(api_url!, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      });
    return await request();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
