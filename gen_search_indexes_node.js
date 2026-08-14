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
const matchingFiles = fg.stream("src/pages/**/+page.svx", { dot: true });

// read all pages
for await (const file of matchingFiles) {
  const rawContent = await readFile(file);

  log.info("Transforming", file);
  const frontmatter = matter(rawContent); // parse markdown front matter

  const normalized = String(file).replaceAll("\\", "/");
  const withoutRoot = normalized.replace(/^src\/pages\//, "");
  const withoutFile = withoutRoot.slice(0, -"+page.svx".length).replace(/\/$/, "");
  const url = "/" + withoutFile;

  const contentNoHtml = stripHtml(frontmatter.content).result;
  const strippedMarkdown = RemoveMarkdown(contentNoHtml)
    .replaceAll(/:::.*/g, "")
    .replaceAll(/:::/g, "") // remove admonitions
    .replaceAll(/[^\S\r\n]{2,}/g, ""); // remove extra spaces

  const tags = frontmatter.data.tags || "";

  posts.push({
    title: frontmatter.data.title || "MissingNo.",
    content: strippedMarkdown,
    description: frontmatter.data.description || null,
    url,
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
