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
  log.info("Transforming", file);
  const rawContent = await readFile(file);
  const frontmatter = matter(rawContent); // parse markdown front matter
  const filePath = file.slice(11).slice(0, -9); // remove the file name and extension and src/routes prefix

  // add to posts
  const contentNoHtml = stripHtml(frontmatter.content).result;
  const strippedMarkdown = RemoveMarkdown(contentNoHtml)
    .replaceAll(/[^\S\r\n]{2,}/g, ""); // remove extra spaces

  const tags = frontmatter.data.tags || "";

  posts.push({
    title: frontmatter.data.title || "MissingNo.",
    content: strippedMarkdown,
    description: frontmatter.data.description || null,
    url: "/" + filePath,
    tags: tags
      .split(",")
      .map(el => el.trim())
      .filter(String),
  });
}

// write to file
log.start("Writing to file...");
await writeFile("./src/routes/search.json/meta.json", JSON.stringify(posts));

log.success("Done!");
