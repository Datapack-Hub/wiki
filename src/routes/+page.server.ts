import { invalidate, invalidateAll } from "$app/navigation";
import { getCorrect } from "$lib/captcha";
import type { Actions } from "@sveltejs/kit";

const isCorrect = (formData: FormData) => {
  const captcha = formData.get("captcha");
  if (!captcha) return false;
  const checked = [];
  for (let i = 0; i < 9; i++) {
    checked.push(formData.get(`checked-${i}`) === "on");
  }
  const correct = getCorrect(captcha.toString());
  if (!correct) return false;
  return checked.every((e, i) => e === correct[i]);
};

export const actions = {
  solveCaptcha: async ({ cookies, request }) => {
    if (isCorrect(await request.formData())) {
      cookies.set("captchaSolved", "true", { path: "/" });
      return { success: true };
    } else {
      return { success: false };
    }
  },
} satisfies Actions;
