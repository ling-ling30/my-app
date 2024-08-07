/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET, // pulls from .env file
    AUTH_SECRET: process.env.AUTH_SECRET, // pulls from .env file
    AUTH_URL: process.env.NEXTAUTH_URL, // pulls from .env file
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST, // pulls from .env file
    DATABASE_URL: process.env.DATABASE_URL, // pulls from .env file
  },
  images: {
    domains: ["files.edgestore.dev"],
  },
};

export default nextConfig;
