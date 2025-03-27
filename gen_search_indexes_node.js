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

  const filePath = file.slice(0, -9).slice(2); // remove the file name and extension and leading slash

  // add to posts
  const contentNoHtml = stripHtml(frontmatter.content).result;
  const strippedMarkdown = RemoveMarkdown(contentNoHtml)
    .replace(/:::.*/, "")
    .replace(/:::/, "") // remove admonitions

  const tags = frontmatter.data.tags || "";

  posts.push({
    title: frontmatter.data.title || "MissingNo.",
    content: strippedMarkdown,
    description: frontmatter.data.description || null,
    url: "/" + filePath,
    tags: tags
      .split(",")
      .map((el) => el.trim())
      .filter(String),
  });
}

// write to file
log.start("Writing to file...");
await writeFile("./src/routes/search.json/meta.json", JSON.stringify(posts));

log.success("Done!");
