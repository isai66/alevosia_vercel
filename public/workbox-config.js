module.exports = {
    globDirectory: 'build/',
    globPatterns: [
      '**/*.{js,css,html,png,jpg,jpeg,svg}'
    ],
    swDest: 'build/sw.js',
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
          },
        },
      },
      {
        urlPattern: /\.(?:js|css|html)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'assets-cache',
        },
      },
    ],
  };
  