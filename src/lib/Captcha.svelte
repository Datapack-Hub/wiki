<script lang="ts">
  import { enhance } from "$app/forms";
  import IconCheck from "~icons/tabler/check";
  import { getRandomCaptcha } from "./captcha";
</script>

<div
  class="top-0 left-0 z-60 fixed flex justify-center items-center bg-black/50 backdrop-blur-sm p-4 w-screen h-screen">
  {#await getRandomCaptcha()}
    <div class="bg-stone-800 p-4 border border-stone-700 rounded-md max-h-full overflow-scroll">
      <p>Loading CAPTCHA...</p>
    </div>
  {:then captcha}
    <form
      method="POST"
      action="/?/solveCaptcha"
      class="space-y-6 bg-stone-800 p-4 border border-stone-700 rounded-md w-sm max-h-full overflow-scroll"
      use:enhance>
      <input type="hidden" name="name" value={captcha.name} />
      <input type="hidden" name="redirectTo" value={location.href} />
      <div>
        <p class="mx-2 text-stone-400">Select all squares with a</p>
        <h1 class="mx-2 font-bold text-2xl">valid Jigsaw Block placement.</h1>
      </div>
      <div class="gap-1.5 grid grid-cols-3">
        {#each captcha.images as image}
          <label class="relative bg-stone-900 rounded-md has-checked:scale-85 transition cursor-pointer">
            <img
              src={image.url}
              alt=""
              class="border border-stone-600 rounded-md h-auto object-cover aspect-square" />
            <input type="checkbox" name={`checked-${image.id}`} class="peer hidden" />
            <IconCheck
              class="hidden peer-checked:block top-0 left-0 absolute bg-stone-800 border border-stone-600 rounded-md size-6 text-orange-400 -translate-2" />
          </label>
        {/each}
      </div>
      <div class="flex justify-between">
        <button
          onclick={() => location.reload()}
          class="hover:bg-stone-700 px-4 py-2 rounded-md hover:font-medium cursor-pointer">Reset</button>
        <button type="submit" class="bg-stone-700 px-4 py-2 rounded-md hover:font-medium cursor-pointer">Verify</button>
      </div>
    </form>
  {/await}
</div>
