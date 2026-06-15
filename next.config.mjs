/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // cache optimized images for 1 year
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 128, 256],
  },
  compress: true,
  async headers() {
    return [
      {
        // Long-lived caching for static media in /public (unhashed filenames):
        // strong repeat-visit perf, while stale-while-revalidate lets an updated
        // asset propagate in the background instead of being cached forever.
        source: '/:path*.(mp4|webm|webp|png|jpg|jpeg|svg|pdf|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
