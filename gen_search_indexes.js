import { file as defineFile, Glob, write } from "bun";
import matter from "gray-matter";
import { stripHtml } from "string-strip-html";
import { createConsola } from "consola";
import RemoveMarkdown from "remove-markdown";

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
await write("./src/routes/search.json/meta.json", JSON.stringify(posts));

log.success("Done!");
