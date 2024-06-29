/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/valgo/' : '',
    basePath: process.env.NODE_ENV === 'production' ? '/valgo' : '',
};

module.exports = nextConfig;
