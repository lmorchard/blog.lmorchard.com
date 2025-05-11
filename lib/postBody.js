import { marked } from "marked";
import cheerio from "cheerio";
import url from "url";
import config from "../config.js";

export async function renderPostBody(bodyIn) {
  let body = bodyIn;
  let attributes = {};

  // Pre-markdown pipeline
  body = await fixupArchivedComments(body);
  body = await fixupBadLineEndingQuirks(body);
  ({ body, attributes } = await handleObsidianAttachments({ body, attributes }));

  // Markdown to HTML
  body = await renderMarkdown(body);
  let $ = cheerio.load(body);

  // Post-markdown HTML pipeline
  $ = await fixupImages($);

  return {
    html: $("html body").html(),
    attributes
  };
}

async function fixupImages($) {
  // HACK: strip explicit width & height attributes for now, since that clashes with 2024 styles
  $("img").each((idx, el) => {
    el.attribs.width = "";
    el.attribs.height = "";
  });
  return $;
}

async function fixupBadLineEndingQuirks(bodyIn) {
  let body = bodyIn;
  body = body.replace(/<br \/><br \/>/g, "\n\n");
  body = body.replace(/<br \/>/g, "\n\n");
  body = body.replace(/<\/ul>/g, "</ul>\n\n");
  body = body.replace(/<\/small>/g, "</small>\n\n");
  body = body.replace(/<\/blockquote>/g, "</blockquote>\n\n");
  body = body.replace(/<\/div>/g, "</div>\n\n");
  body = body.replace(/<!--more-->/g, "\n\n<!--more-->\n\n");
  body = body.replace(/	+/g, "");
  return body;
}

async function handleObsidianAttachments({ body: bodyIn, attributes }) {
  let body = bodyIn;
  const attachments = [];
  const regex = /!\[\[(.*?)\]\]/g;
  let match;
  
  while ((match = regex.exec(body)) !== null) {
    attachments.push(match[1]);
    // Replace the Obsidian image syntax with HTML
    body = body.replace(match[0], `<img src="${match[1]}" />`);
  }
  
  // Add attachments to attributes
  attributes.attachments = attachments;
  return { body, attributes: { ...attributes } };
}

async function renderMarkdown(body) {
  return marked.parse(body);
}

// This function fixes the blocks of archived comments from Disqus that I
// once upon a time exported into entries. They otherwise turn into
// preformatted blocks. I should permanently fix them in the source someday.
async function fixupArchivedComments(contents) {
  var marker = '<div id="comments" class="comments archived-comments">';
  if (contents.indexOf(marker !== -1)) {
    var parts = contents.split(marker);
    if (parts.length > 1) {
      parts[1] = parts[1].replace(/^\s+/gm, "");
      return parts[0] + marker + parts[1];
    }
  }
  return contents;
}
