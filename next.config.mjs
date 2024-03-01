/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.(png|jpe?g|gif|mp4|webm|ogg|mp3|wav|flac|aac|woff|woff2|eot|ttf|otf|svg)$/i,
            type: 'asset/resource'
        });

        return config;
    }
};

export default nextConfig;