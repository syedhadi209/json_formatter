import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/jwtdecoder",
        destination: "/jwt-decoder",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
