import moment from "moment";

import { extractTitleFromHTML } from "./postBody.js";

/**
 * Render the markdown published alongside each post as index.md.
 *
 * The stored body is the raw source with its frontmatter already stripped by
 * parsePost, so on its own it starts mid-sentence: no title, no date, and no
 * hint of where it came from. This prepends frontmatter plus a title heading so
 * that anything reading the markdown on its own — an agent, a scraper, someone
 * with curl — has the context the HTML page would have given it.
 *
 * Note that relative image and link paths in the body are left alone; the `url`
 * in the frontmatter is what resolves them.
 *
 * @param {object} site - Site config
 * @param {object} post - Post object
 * @returns {string} Markdown document
 */
export function renderPostMarkdown(site, post) {
  const parts = [frontmatter(site, post)];

  // The title may have been lifted from the body's own first heading, in which
  // case printing it here would just say the same thing twice
  if (post.title && extractTitleFromHTML(post.html) !== post.title.trim()) {
    parts.push(`# ${post.title.trim()}`);
  }

  parts.push(post.body.replace(/^\n+/, ""));

  return `${parts.join("\n\n").trimEnd()}\n`;
}

function frontmatter(site, post) {
  const fields = [];

  if (post.title) fields.push(`title: ${yamlQuoted(post.title)}`);
  if (post.date) fields.push(`date: ${moment.parseZone(post.date).format()}`);
  fields.push(`url: ${site.absolute_baseurl}/${post.path}/`);
  if (site.author?.full_name)
    fields.push(`author: ${yamlScalar(site.author.full_name)}`);
  if (post.tags?.length)
    fields.push(`tags: [${post.tags.map(yamlScalar).join(", ")}]`);

  return ["---", ...fields, "---"].join("\n");
}

/**
 * A double-quoted YAML scalar. Newlines become \n escapes rather than being
 * collapsed, so nothing is silently lost.
 */
const yamlQuoted = (value) =>
  `"${String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, "\\n")}"`;

/**
 * Values that look like plain words stay bare for readability; anything that
 * could be mistaken for a number, a boolean, or YAML syntax gets quoted.
 */
const YAML_BARE = /^[A-Za-z][A-Za-z0-9 ._/-]*[A-Za-z0-9._/-]$|^[A-Za-z]$/;
const YAML_RESERVED = new Set([
  "true", "false", "yes", "no", "on", "off", "null", "y", "n",
]);

const yamlScalar = (value) => {
  const str = String(value);
  return YAML_BARE.test(str) && !YAML_RESERVED.has(str.toLowerCase())
    ? str
    : yamlQuoted(str);
};
