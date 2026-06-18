import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'team9-grimgate-bucket.s3.amazonaws.com'  },
        { protocol: 'https', hostname: 'team9-grimgate-bucket.s3.ap-northeast-2.amazonaws.com' },
    ],
  },
};

export default nextConfig;
