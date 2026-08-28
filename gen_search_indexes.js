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
const matchingFiles = fileGlob.scan("./src/routes");

// read all routes
for await (const file of matchingFiles) {

  log.info("Transforming", file);
  const rawContent = await defineFile(`./src/routes/${file}`).text();

  const frontmatter = matter(rawContent); // parse markdown front matter

  const filePath = file
    .replaceAll("\\\\", "/")
    .replace(/^\.\/?/, "")
    .replace(/^src\/routes\/?/, "")
    .replace(/\/?\+page\.svx$/, "");

  // add to posts
  const contentNoHtml = stripHtml(frontmatter.content).result;
  const strippedMarkdown = markdown.render(contentNoHtml, {})
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
await write("./src/routes/search.json/meta.json", JSON.stringify(posts));

log.success("Done! Finished in " + Bun.nanoseconds() / 1e6 + " milliseconds.");
