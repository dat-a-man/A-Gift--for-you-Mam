/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "cdn.sanity.io",
      "github.com",
    ],
  },
};

module.exports = nextConfig;
