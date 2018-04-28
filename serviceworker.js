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
    "url": "css/widget.css",
    "revision": "5ff4950f6d9fd5167254ab663ba28cea"
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
    "url": "images/1920px/boy-on-bow.jpg",
    "revision": "3b22eeb7ff0219dae814eff427fb9e52"
  },
  {
    "url": "images/1920px/cover-1.jpg",
    "revision": "617bc2e80f711a38c42cf4cdb96a31ae"
  },
  {
    "url": "images/1920px/fort-darnet.jpg",
    "revision": "f6e8731bd10d3429e932b5588cb03301"
  },
  {
    "url": "images/1920px/old-lady.jpg",
    "revision": "86bf46b95a8c050bbe282bfed05c7768"
  },
  {
    "url": "images/1920px/pyefleet-creek-1.jpg",
    "revision": "c80aa2fd413d7d65b306c502763d5d0f"
  },
  {
    "url": "images/1920px/red-sands-fort.jpg",
    "revision": "013692a67cf185d3a08ca71924dc9da5"
  },
  {
    "url": "images/1920px/sealand.jpg",
    "revision": "51711b3b11409ce261c31e6e1416bd00"
  },
  {
    "url": "images/1920px/sharfleet-creek.jpg",
    "revision": "1546148f4e989dcf68d20406a7790ee7"
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
    "revision": "d13a785e694facebf5fb6ed2dee02feb"
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