/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors: true,
  },


  
  reactStrictMode: true,

  images: {
    domains: [ 'ibb.co', 'lh3.googleusercontent.com', 'cdn.donmai.us' ],
  }
}

module.exports = nextConfig
