/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optimize bundle splitting
    experimental: {
        optimizePackageImports: ['@radix-ui/react-slot', 'class-variance-authority'],
        optimizeServerReact: true,
    },

    // Enable compression
    compress: true,

    // Optimize images and fonts
    images: {
        formats: ['image/webp', 'image/avif'],
    },

    // Tree shaking optimizations
    webpack: (config, { dev, isServer }) => {
        // Enable tree shaking
        config.optimization = {
            ...config.optimization,
            usedExports: true,
            sideEffects: false,
        };

        return config;
    },




};

module.exports = nextConfig;