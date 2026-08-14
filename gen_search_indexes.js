import { file as defineFile, Glob, write, markdown } from "bun";
import matter from "gray-matter";
import { stripHtml } from "string-strip-html";
import { createConsola } from "consola";

const log = createConsola({
  formatOptions: {
    date: true,
  },
});

// Requires Bun to be installed
// Sorry!

const posts = [];
const fileGlob = new Glob("./**/+page.svx");
const matchingFiles = fileGlob.scan("./src/pages");

// read all pages
for await (const file of matchingFiles) {
  log.info("Transforming", file);
  const rawContent = await defineFile(`./src/pages/${file}`).text();

  const frontmatter = matter(rawContent); // parse markdown front matter

  // file like: ./en/wiki/files/tags/+page.svx
  const normalized = file.replaceAll("\\", "/").replace(/^\.\//, "");
  const withoutFile = normalized.slice(0, -"+page.svx".length).replace(/\/$/, "");
  // withoutFile: en/wiki/files/tags  OR  en
  const url = "/" + withoutFile;

  const contentNoHtml = stripHtml(frontmatter.content).result;
  const strippedMarkdown = markdown
    .render(contentNoHtml, {})
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
await write("./src/routes/search.json/meta.json", JSON.stringify(posts));

log.success("Done! Finished in " + Bun.nanoseconds() / 1e6 + " milliseconds.");
