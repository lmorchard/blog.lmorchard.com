module.exports = {
  postsPath: "../blog.lmorchard.com/posts",
  buildPath: "./build",
  assetPaths: ["./public", "../blog.lmorchard.com/uploads"],
  commonmarkParserOptions: {},
  commonmarkRendererOptions: {},
  site: {
    title: "blog.lmorchard.com",
    subtitle:
      "It's all spinning wheels and self-doubt until the first pot of coffee.",
    language: "en",
    baseurl: process.env.BASE_URL || "",
    absolute_baseurl: process.env.ABSOLUTE_BASE_URL || "https://blog.lmorchard.com",
    domain: "blog.lmorchard.com",
    author: {
      full_name: "Les Orchard",
      short_name: "lmorchard",
      name: "l.m.orchard",
      email: "l.m.orchard@pobox.com",
    },
  },
  postCopyFilters: [
    '!node_modules',
    '!node_modules/**/*',
    '!package-lock.json',
    '!yarn.lock'    
  ],
  fulltextTagFeeds: [
    'mozilla'
  ]  
};