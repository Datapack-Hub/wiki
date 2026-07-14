import { response } from "super-sitemap/sveltekit";
import type { RequestHandler } from "@sveltejs/kit";

export const prerender = true;

export const GET: RequestHandler = async () => {
  return await response({
    origin: "https://datapack.wiki",
    excludeRoutePatterns: [/^\/sitemap.xml/, /^\/meta.json/, /^\/robots.txt/, /^\/search.json/],
    defaultChangefreq: "weekly",
  });
};
