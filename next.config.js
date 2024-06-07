/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
    'MYSQL_HOST': '127.0.0.1',
    'MYSQL_PORT': '1433',
    'MYSQL_DATABASE': "test1",
    'MYSQL_USER': "sa",
    'MYSQL_PASSWORD': "123",
    }
}

module.exports = nextConfig
