/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
        port: "",
      },
      {
        hostname: "utfs.io",
        port: "",
      },
      {
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        hostname: "i.pinimg.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
