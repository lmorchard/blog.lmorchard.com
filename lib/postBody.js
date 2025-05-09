import { marked } from "marked";
import cheerio from "cheerio";
import url from "url";
import config from "../config.js";

export async function renderPostBody(body) {
  let result = body;

  // Pre-markdown pipeline
  result = await fixupArchivedComments(result);
  result = await fixupBadLineEndingQuirks(result);
  result = await convertObsidianImagesToHTML(result);

  // Markdown to HTML
  result = await renderMarkdown(result);
  let $ = cheerio.load(result);

  // Post-markdown HTML pipeline
  $ = await fixupImages($);

  return $("html body").html();
}

async function fixupImages($) {
  // HACK: strip explicit width & height attributes for now, since that clashes with 2024 styles
  $("img").each((idx, el) => {
    el.attribs.width = "";
    el.attribs.height = "";
  });
  return $;
}

async function fixupBadLineEndingQuirks(body) {
  let result = body;
  result = result.replace(/<br \/><br \/>/g, "\n\n");
  result = result.replace(/<br \/>/g, "\n\n");
  result = result.replace(/<\/ul>/g, "</ul>\n\n");
  result = result.replace(/<\/small>/g, "</small>\n\n");
  result = result.replace(/<\/blockquote>/g, "</blockquote>\n\n");
  result = result.replace(/<\/div>/g, "</div>\n\n");
  result = result.replace(/<!--more-->/g, "\n\n<!--more-->\n\n");
  result = result.replace(/	+/g, "");
  return result;
}

async function convertObsidianImagesToHTML(body) {
  let result = body;
  result = result.replace(/!\[\[(.*?)\]\]/g, '<img loading="lazy" src="$1" />');
  return result;
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
