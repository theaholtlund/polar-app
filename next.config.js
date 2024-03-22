// Import types and functionality from types and functionality
/** @type {import('next').NextConfig} */

// Make  env variables available to application
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    POLAR_CLIENT_ID: process.env.POLAR_CLIENT_ID,
    POLAR_CLIENT_SECRET: process.env.POLAR_CLIENT_SECRET,
    BASEURL: process.env.BASEURL,
  },
};

module.exports = nextConfig;
