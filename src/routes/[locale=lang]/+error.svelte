<script lang="ts">
  import { page } from "$app/state";
  import { Discord } from "$lib/reusables";

  const messages = new Map([
    [
      404,
      "This page does not exist. It might have been removed, or never existed in the first place. Try searching for the page you need, or if this page should exist, let us know in our discord (use the link below)",
    ],
    [
      500,
      "Something went wrong internally! This isn't your fault. If this issue persists, please let us know in our discord (use the link below)",
    ],
  ]);
</script>

<main class="md px-4 md:px-8 lg:px-16 prose-headings:text-stone-200" id="main_content">
  <h1>Error {page.status}: {page.error?.message}</h1>
  <p>
    {messages.get(page.status)}
    <Discord />
  </p>
</main>
