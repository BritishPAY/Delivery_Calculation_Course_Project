/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
        has: [
          {
            type: "header",
            key: "x-nextjs-rewrite",
            value: "1",
          },
        ],
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "x-nextjs-rewrite", value: "1" },
        ],
      },
    ];
  },
};

export default nextConfig;