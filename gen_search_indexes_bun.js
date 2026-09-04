import { file as defineFile, Glob, write, markdown } from "bun";
import matter from "@11ty/gray-matter";
import { stripHtml } from "string-strip-html";
import { createConsola } from "consola";

const log = createConsola({
  formatOptions: {
    date: true,
  },
});

const posts = [];
const fileGlob = new Glob("./**/+page.svx");
const matchingFiles = fileGlob.scan("./src/routes");

// read all routes
for await (const file of matchingFiles) {

  log.info("Transforming", file);
  const frontmatter = matter.read(`./src/routes/${file}`); // parse markdown front matter

  const filePath = file
    .replaceAll("\\", "/")
    .replace(/^\.\/?/, "")
    .replace(/^src\/routes\/?/, "")
    .replace(/\/?\+page\.svx$/, "");

  // add to posts
  const contentNoHtml = stripHtml(frontmatter.content).result;
  const strippedMarkdown = markdown.render(contentNoHtml, {})
    .replaceAll(/[^\S\r\n]{2,}/g, ""); // remove extra spaces

  posts.push({
    title: frontmatter.data.title || "MissingNo.",
    content: strippedMarkdown,
    description: frontmatter.data.description || null,
    url: filePath ? `/${filePath}/` : "/",
  });
}

// write to file
log.start("Writing to file...");
await write("./src/routes/search.json/meta.json", JSON.stringify(posts));

log.success("Done! Finished in " + Bun.nanoseconds() / 1e6 + " milliseconds.");
