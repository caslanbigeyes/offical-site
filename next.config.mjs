/** @type {import('next').NextConfig} */
import withAntdLess from 'next-plugin-antd-less';
import createNextIntlPlugin from 'next-intl/plugin';
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
    value: "public, max-age=86400",
  },
];

const nextConfig = {
  images: {
    domains: ['https://xiaoluo-dev.xiaoluoapp.com', 'http://192.168.0.28'],

  },
  compiler: {
    removeConsole: true,
  },
  env: {
    "JWT_SECRET": "bincial",
    "BASE_API_URL": "/api"
  },
  async headers() {
    // 跨域配置
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        source: "/_next/images/:path*", // 为访问 /api/** 的请求添加 CORS HTTP Headers
        headers: CORS_HEADERS
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin()(nextConfig);

export default withAntdLess(withNextIntl);