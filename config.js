export default {
  postsPath: "./content/posts",
  pagesPath: "./content/pages",
  buildPath: "./build",
  assetPaths: ["./content/public", "./content/uploads"],
  commonmarkParserOptions: {},
  commonmarkRendererOptions: {},
  site: {
    avatar: "https://www.gravatar.com/avatar/b45c48fc9e05922e2f368a9d7d7d8de1.jpg?s=128",
    title: "blog.lmorchard.com",
    subtitle:
      "It's all spinning wheels & self-doubt until the first pot of coffee.",
    language: "en",
    baseurl: process.env.BASE_URL || "",
    absolute_baseurl: process.env.ABSOLUTE_BASE_URL || "https://blog.lmorchard.com",
    domain: "blog.lmorchard.com",
    author: {
      full_name: "Les Orchard",
      short_name: "lmorchard",
      name: "l.m.orchard",
      email: "me@lmorchard.com",
      url: "https://lmorchard.com",
      job_title: "Software developer",
      description: "he / him; old adhd cat dad; tinkerer; serial enthusiast",
      sameAs: [
        "https://lmorchard.com",
        "https://masto.hackers.town/@lmorchard",
        "https://bsky.app/profile/lmorchard.com",
        "https://github.com/lmorchard",
        "https://twitch.tv/lmorchard",
        "https://www.youtube.com/@LesOrchard",
      ],
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
