import { getCorrect } from "$lib/server/captcha";
import { fail, type Actions } from "@sveltejs/kit";

export const actions = {
  solveCaptcha: async ({ cookies, request }) => {
    const data = await request.formData();
    const name = data.get("name")?.toString();
    const checked = Array.from({ length: 9 }, (_, i) => data.get(`checked-${i}`) === "on");

    if (!name) return fail(400, { name, missing: true });
    if (!checked) return fail(400, { checked, missing: true });

    const correct = await getCorrect(name);

    if (!correct || !checked.every((e, i) => e === correct[i])) return fail(400, { incorrect: true });

    cookies.set("captchaSolved", "true", { path: "/" });

    return { success: true };
  },
} satisfies Actions;
