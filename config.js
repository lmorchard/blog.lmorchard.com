export default {
  postsPath: "./content/posts",
  buildPath: "./build",
  assetPaths: ["./content/public", "./content/uploads"],
  commonmarkParserOptions: {},
  commonmarkRendererOptions: {},
  site: {
    avatar: "https://www.gravatar.com/avatar/b45c48fc9e05922e2f368a9d7d7d8de1.jpg?s=128",
    title: "blog.lmorchard.com",
    subtitle:
      "It's all spinning wheels & self-doubt until the first pot of coffee.",
    subtitles: [
      "passing the turing test since 1975",
      "is this thing on? no, really?",
      "befuddlement through meandering",
      "i've got a miniature secret camera",
      "a blog of dubious merit",
      "where did i put that thing?",
      "lucifer helps me prepare the chex mix",
      "i've got a bad feeling about this",
      "spinning wheels and self-doubt",
      "brewing all the espresso",
      "i'm not a real doctor",
      "petting cats and bunnies",
      "crunching & decrunching",
      "reticulating splines",
      "scanning, taping, filing, instantly checking",
      "stopping all the downloading",
      "blowing on the cartridge",
      "have you seen my stapler?",
      "you can't park that there",
      "this is not my beautiful blog",
    ],
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
