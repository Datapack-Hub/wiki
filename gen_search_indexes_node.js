// Compatibility for Node.js
// Use the Bun script if you are using Bun

import { createConsola } from "consola";
import fg from "fast-glob";
import matter from "gray-matter";
import { readFile, writeFile } from "node:fs/promises";
import { stripHtml } from "string-strip-html";
import RemoveMarkdown from "remove-markdown";

const log = createConsola({
  formatOptions: {
    date: true,
  },
});

const posts = [];
const matchingFiles = fg.stream("**/+page.svx", { dot: true });

// read all routes
for await (const file of matchingFiles) {
  const rawContent = await readFile(file);

  log.info("Transforming", file);
  const frontmatter = matter(rawContent); // parse markdown front matter

  const filePath = file
    .replaceAll("\\\\", "/")
    .replace(/^\.\/?/, "")
    .replace(/^src\/routes\/?/, "")
    .replace(/\/?\+page\.svx$/, "");

  // add to posts
  const contentNoHtml = stripHtml(frontmatter.content).result;
  const strippedMarkdown = RemoveMarkdown(contentNoHtml)
    .replaceAll(/:::.*/g, "")
    .replaceAll(/:::/g, "") // remove admonitions
    .replaceAll(/[^\S\r\n]{2,}/g, ""); // remove extra spaces

  posts.push({
    title: frontmatter.data.title || "MissingNo.",
    content: strippedMarkdown,
    description: frontmatter.data.description || null,
    url: filePath ? "/" + filePath + "/" : "/",
  });
}

// write to file
log.start("Writing to file...");
await writeFile("./src/routes/search.json/meta.json", JSON.stringify(posts));

log.success("Done!");
