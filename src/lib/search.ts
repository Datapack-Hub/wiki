import { Index } from "flexsearch";
import { stripHtml } from "string-strip-html";

let index: Index;
let posts: Page[] = [];

// This function creates the search index from the given pages.
export function createSearchIndex(pages: Page[]) {
  index = new Index({ tokenize: "forward" });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const indexItem = `${page.title} ${page.content} ${page.url}`;
    index.add(i, indexItem);
  }

  posts = pages;
}

// This function replaces the given match with a highlighted version of the match.
function replaceWithHighlights(text: string, match: string) {
  const regex = new RegExp(match, "gi");
  return text.replace(regex, match => `<mark>${match}</mark>`);
}

type SearchReturnType = { content: string[]; title: string; url: string }[];

export function search(query: string): SearchReturnType {
  // remove regex special characters
  const htmlStripped = stripHtml(query).result;
  const match = htmlStripped.replaceAll(/[\\^$*+?.()|[\]{}]/g, "\\$&");

  const results = index.search(match);

  return results
    .map(i => posts[i as number])
    .map(({ content, title, url }) => {
      return {
        content: getMatches(content, match),
        title: replaceWithHighlights(title, match),
        url,
      };
    });
}

// This function returns an array of matches for the given text and search term.
function getMatches(text: string, searchTerm: string, limit = 1) {
  const regex = new RegExp(searchTerm, "gi");
  const results = [];
  let match;

  while ((match = regex.exec(text)) !== null && results.length < limit) {
    results.push(match.index);
  }

  return results.map(index => {
    const start = index - 80;
    const end = index + 80;
    const textBlock = text.substring(start, end).trim();
    return `...${replaceWithHighlights(textBlock, searchTerm)}...`;
  });
}
