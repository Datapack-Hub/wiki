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
    .replaceAll(/[^\S\r\n]{2,}/g, ""); // remove extra spaces

  posts.push({
    title: frontmatter.data.title || "MissingNo.",
    content: strippedMarkdown,
    description: frontmatter.data.description || null,
<<<<<<< HEAD:gen_search_indexes_bun.js
    url: "/" + filePath,
    tags: tags
      .split(",")
      .map((el) => el.trim())
      .filter(String),
=======
    url: filePath ? "/" + filePath + "/" : "/",
>>>>>>> 353e511b5a5e1371c6326fc5c3ff100aa93091ae:gen_search_indexes_node.js
  });
}

// write to file
log.start("Writing to file...");
await write("./src/routes/search.json/meta.json", JSON.stringify(posts));

log.success("Done! Finished in " + Bun.nanoseconds() / 1e6 + " milliseconds.");
