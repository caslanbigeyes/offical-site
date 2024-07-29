/** @type {import('next').NextConfig} */
import withAntdLess from 'next-plugin-antd-less';
import createNextIntlPlugin from 'next-intl/plugin';
import withPlugins from 'next-compose-plugins';
import optimizedImages from 'next-optimized-images';
const CORS_HEADERS = [
  {
    key: "Access-Control-Allow-Credentials",
    value: "true"
  },
  {
    key: "Access-Control-Allow-Origin",
    value: "*"
  },
  {
    key: "Access-Control-Allow-Methods",
    value: "GET,DELETE,PATCH,POST,PUT"
  },
  {
    key: "Access-Control-Allow-Headers",
    value: "Content-Type, Authorization",
  },
  {
    key: "Cache-Control",
    value: "public, max-age=31536000",
  }
];

const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    domains: ['https://www.bincial.com', 'https://xiaoluo-dev.xiaoluoapp.com', 'https://cbu01.alicdn.com', 'https://xiaoluo.xiaoluoapp.com/', 'http://192.168.0.28', 'cbu01.alicdn.com', 'website-1316858268.cos.ap-shanghai.myqcloud.com', 'image.made-in-china.com', 'img.alicdn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '//website-1316858268.cos.ap-shanghai.myqcloud.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '//cbu01.alicdn.com',
        port: '',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: '//www.bincial.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "//img.alicdn.com",
        port: '',
        pathname: '/**'
      }
    ],
  },
  compiler: {
    // removeConsole: true,
    // styledComponents: true,
  },
  env: {
    "JWT_SECRET": "bincial",
    "BASE_API_URL": "/api"
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // 设置为 true 表示使用永久重定向 (HTTP 301)，否则使用临时重定向 (HTTP 302)
      },
    ]
  },
  async headers() {
    // 跨域配置
    return [
      {
        source: "/_next/images/:path*", // 为访问 /api/** 的请求添加 CORS HTTP Headers
        headers: CORS_HEADERS
      },
      {
        // 适用于所有响应
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 例如，设置为一年
          },
        ],
      },
    ];
  },
};





const withNextIntl = createNextIntlPlugin()(nextConfig);

export default withAntdLess(withNextIntl);
