module.exports = {
  globDirectory: ".",
  globPatterns: [
    "**/*.{css,json,html,js,jpg}"
  ],
  swSrc: "serviceworker-base.js",
  swDest: "serviceworker.js",
  globIgnores: [
    "index.html",
    "map.html", //stop add to home screen as it breaks auth
    "serviceworker.js",
    "serviceworker-base.js",
    "workbox-cli-config.js",
    "firebase.json",
    "firestore.indexes.json",
    "fire*.*",
    "VR360/**",
    "build/**",
    "data/backups/**",
    "images/1200px/**",
    "images/300px/**",
    "images/1920px/3d*"
  ]
};
