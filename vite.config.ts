// vite.config.js
import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
    tailwindcss(),
  ],
});
