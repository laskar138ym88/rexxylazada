importScripts('https://g.alicdn.com/lzd/assets/1.1.20/workbox/6.0.2/workbox-sw.js');
workbox.setConfig({
  debug: true,
  modulePathPrefix: 'https://g.alicdn.com/lzd/assets/1.1.20/workbox/6.0.2/',
});

self.__WB_MANIFEST = [{"url":"../lzdfe/pdp-modules/1.0.93/pc-mod.css","revision":"1.0.93"},{"url":"https://laz-g-cdn.alicdn.com/lzdfe/pdp-modules/1.0.93/pc-mod.js","revision":"1.0.93"},{"url":"https://laz-g-cdn.alicdn.com/lzdfe/pdp-platform/0.1.16/pc.js","revision":"0.1.16"},{"url":"../lzdfe/pdp-platform/0.1.16/pc.css","revision":"0.1.16"}];

const { core, routing, strategies, cacheableResponse, expiration, precaching } = workbox;
const { setCacheNameDetails, skipWaiting, clientsClaim } = core;
const { registerRoute } = routing;
const { CacheFirst, StaleWhileRevalidate, Strategy } = strategies;
const { CacheableResponsePlugin } = cacheableResponse;
const { ExpirationPlugin } = expiration;
const { precacheAndRoute, matchPrecache } = precaching;

// skipWaiting();
clientsClaim();

core.setCacheNameDetails({
  prefix: 'node-pdp',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime',
  googleAnalytics: 'google'
});

precacheAndRoute(self.__WB_MANIFEST);

const matchImgFunction = ({url}) => {
  return /laz-img-.+.alicdn.com/.test(url.host) || url.host.includes('slatic.net');
};

registerRoute(
  matchImgFunction,
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 100,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      })
    ]
  })
);

const matchAssetsFunction = ({url}) => {
  return url.host === 'laz-g-cdn.alicdn.com'
    || url.host === 'g.alicdn.com'
    || url.host === 'assets.alicdn.com';
};

registerRoute(
  matchAssetsFunction,
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 100,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      })
    ]
  })
);