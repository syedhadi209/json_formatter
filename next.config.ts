import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/jwtdecoder",
        destination: "/jwt-decoder",
        permanent: true,
      },
      {
        source: "/base64studio",
        destination: "/base64-studio",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
