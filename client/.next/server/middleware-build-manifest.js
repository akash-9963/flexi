self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/index.js"
    ],
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/buyer/orders": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/buyer/orders.js"
    ],
    "/logout": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/logout.js"
    ],
    "/search": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/search.js"
    ],
    "/seller": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/seller.js"
    ],
    "/seller/gigs": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/seller/gigs.js"
    ],
    "/seller/gigs/create": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/seller/gigs/create.js"
    ],
    "/seller/orders": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/seller/orders.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];