// importScripts(
//   "https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.0/workbox-sw.js"
// );

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([
  {
    "url": "css/animate.css",
    "revision": "346964e149ad49ccf4f3da77b66fa086"
  },
  {
    "url": "css/bootstrap.min.css",
    "revision": "450fc463b8b1a349df717056fbb3e078"
  },
  {
    "url": "css/map.css",
    "revision": "fd90fbe32d67d5124d58497e340f9640"
  },
  {
    "url": "css/materialize.min.css",
    "revision": "df8ee5622d9d736da06a6b0e7afdef55"
  },
  {
    "url": "css/style.css",
    "revision": "ce8f4cb1d55ba2913034afcec6b421a5"
  },
  {
    "url": "data/map.json",
    "revision": "6c4b9621e8ea01a9ee8c301d358a27bd"
  },
  {
    "url": "data/UK.json",
    "revision": "cc957444be1811b6f50e5e1a4493b656"
  },
  {
    "url": "index.html",
    "revision": "ce034b8fc0b7a585db578f07a40489b7"
  },
  {
    "url": "js/admin.js",
    "revision": "93bc9357f24e10fd640bd4b87953ab2f"
  },
  {
    "url": "js/bootstrap.min.js",
    "revision": "14d449eb8876fa55e1ef3c2cc52b0c17"
  },
  {
    "url": "js/jquery-3.3.1.min.js",
    "revision": "a09e13ee94d51c524b7e2a728c7d4039"
  },
  {
    "url": "js/map.js",
    "revision": "06d8c97e9f5077e56219a1092dabef78"
  },
  {
    "url": "js/markerclusterer.js",
    "revision": "1964cf0abf02d86398f3153fd305657e"
  },
  {
    "url": "js/materialize.min.js",
    "revision": "72604b4dd26e411dd6d7290b9f6c1d9c"
  },
  {
    "url": "js/servicing.js",
    "revision": "865be1b6a8493eab1d391684c743520c"
  },
  {
    "url": "js/vue.js",
    "revision": "d0442fb88cab3b758d8c5effa3bccca8"
  },
  {
    "url": "js/yotstop.js",
    "revision": "a01fcb73ca7470096ca08a583c988e3d"
  },
  {
    "url": "main.css",
    "revision": "c9d2e7110e653a6f09c12d69ab784252"
  },
  {
    "url": "manifest.json",
    "revision": "d3fd5388897d36b844465339a6431e00"
  }
]);

 workbox.routing.registerRoute(
  new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
  workbox.strategies.cacheFirst({
    cacheName: "fonts-google",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60 
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp("https://res.cloudinary.com/(.*)"),
  workbox.strategies.cacheFirst({
    cacheName: "cloud-images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
        // maxAgeSeconds: 30 * 24 * 60 * 60
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

self.addEventListener('message', (event) => {
  if (!event.data){
    return;
  }

  switch (event.data) {
    case 'skipWaiting':
      self.skipWaiting();
      break;
    default:
      // NOOP
      break;
  }
});