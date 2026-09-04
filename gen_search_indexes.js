import { createConsola } from "consola";
import matter from "@11ty/gray-matter";
import { readFile, writeFile } from "node:fs/promises";
import { stripHtml } from "string-strip-html";
import { glob } from "node:fs/promises";
import RemoveMarkdown from "remove-markdown";

const log = createConsola({
  formatOptions: {
    date: true,
  },
});

performance.mark("start");

const posts = [];

// read all routes
for await (const file of glob("./src/routes/**/*.svx")) {
  log.info("Transforming", file);
  
  const frontmatter = matter.read(file); // parse markdown front matter

  const filePath = file
    .replaceAll("\\", "/")
    .replace(/^\.\/?/, "")
    .replace(/^src\/routes\/?/, "")
    .replace(/\/?\+page\.svx$/, "");

  // add to posts
  const contentNoHtml = stripHtml(frontmatter.content).result;
  const strippedMarkdown = RemoveMarkdown(contentNoHtml)
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
await writeFile("./src/routes/search.json/meta.json", JSON.stringify(posts));

performance.mark("end");

log.success("Done! Completed in " + (performance.measure("gen_search_indexes", "start", "end").duration) + "ms");
