import type { RequestHandler } from "./$types";
import { getRandomCaptcha } from "$lib/server/captcha";

export const GET: RequestHandler = async ({ url }) => {
  const exclude = url.searchParams.get("exclude") ?? undefined;

  return new Response(JSON.stringify(await getRandomCaptcha(exclude)));
};
