import { getCorrect } from "$lib/captcha";
import { redirect, type Actions } from "@sveltejs/kit";

const isCorrect = async (formData: FormData) => {
  const captcha = formData.get("captcha");
  if (!captcha) return false;

  const checked = Array.from({ length: 9 }, (_, i) => formData.get(`checked-${i}`) === "on");

  const correct = await getCorrect(captcha.toString());
  if (!correct) return false;

  return checked.every((e, i) => e === correct[i]);
};

export const actions = {
  solveCaptcha: async ({ cookies, request, url }) => {
    const formData = await request.formData();
    if (await isCorrect(formData)) {
      cookies.set("captchaSolved", "true", { path: "/" });
    }
    const redirectTo = formData.get("redirectTo");
    if (redirectTo) redirect(303, redirectTo.toString());
  },
} satisfies Actions;
