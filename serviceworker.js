importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.0/workbox-sw.js"
);

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
    "revision": "3ada8806bd389b42f3b96b780261fef4"
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
    "revision": "e1ce6dc7171b9628be38dba076bc93b9"
  },
  {
    "url": "data/UK.json",
    "revision": "a62d4a66d79acaafa4889b00d18d0985"
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
    "url": "images/1920px/cover-2.jpg",
    "revision": "3b22eeb7ff0219dae814eff427fb9e52"
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
    "revision": "18b1b2bba4a7be460933f6b4db01853a"
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
    "revision": "e0ec2d639cc0b275ae5b4e7694e71bac"
  },
  {
    "url": "js/markerclusterer.js",
    "revision": "7773b3a186881f7596d694e85fb7d552"
  },
  {
    "url": "js/materialize.min.js",
    "revision": "72604b4dd26e411dd6d7290b9f6c1d9c"
  },
  {
    "url": "js/servicing.js",
    "revision": "b3d313e406274ed3aca5f5c5516a86d1"
  },
  {
    "url": "js/vue.js",
    "revision": "cc32785305fbdc3e117e9ec90ef262fb"
  },
  {
    "url": "js/yotstop.js",
    "revision": "4ba034d6e569a7df41220117dded6eef"
  },
  {
    "url": "main.css",
    "revision": "357448b2530c2bfc912229f82d199b9b"
  },
  {
    "url": "manifest.json",
    "revision": "d3fd5388897d36b844465339a6431e00"
  },
  {
    "url": "fonts/roboto/Roboto-Bold.woff",
    "revision": "eed9aab5449cc9c8430d7d258108f602"
  },
  {
    "url": "fonts/roboto/Roboto-Bold.woff2",
    "revision": "c0f1e4a4fdfb8048c72e86aadb2a247d"
  },
  {
    "url": "fonts/roboto/Roboto-Light.woff",
    "revision": "ea36cd9a0e9eee97012a67b8a4570d7b"
  },
  {
    "url": "fonts/roboto/Roboto-Light.woff2",
    "revision": "3c37aa69cd77e6a53a067170fa8fe2e9"
  },
  {
    "url": "fonts/roboto/Roboto-Medium.woff",
    "revision": "cf4d60bc0b1d4b2314085919a00e1724"
  },
  {
    "url": "fonts/roboto/Roboto-Medium.woff2",
    "revision": "1561b424aaef2f704bbd89155b3ce514"
  },
  {
    "url": "fonts/roboto/Roboto-Regular.woff",
    "revision": "3cf6adf61054c328b1b0ddcd8f9ce24d"
  },
  {
    "url": "fonts/roboto/Roboto-Regular.woff2",
    "revision": "5136cbe62a63604402f2fedb97f246f8"
  },
  {
    "url": "fonts/roboto/Roboto-Thin.woff",
    "revision": "44b78f142603eb69f593ed4002ed7a4a"
  },
  {
    "url": "fonts/roboto/Roboto-Thin.woff2",
    "revision": "1f35e6a11d27d2e10d28946d42332dc5"
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