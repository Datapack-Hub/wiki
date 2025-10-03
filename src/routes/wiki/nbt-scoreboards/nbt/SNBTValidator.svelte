<script lang="ts">
  import { parse } from "nbtify";

  let value = $state("");
  let valid = $state("unset");
  let error = $state("");

  function validate() {
    if (value.length === 0) {
      valid = "unset";
      error = "";
      return;
    }

    try {
      parse(value);
      valid = "valid";
      error = "";
    } catch (e) {
      valid = "invalid";
      error = e as string;
    }
  }
</script>

<textarea
  spellcheck="false"
  autocomplete="off"
  bind:value
  oninput={validate}
  class="w-full h-full rounded-md bg-stone-800 p-2 text-stone-200 placeholder-stone-500 resize-none outline-none ring-2 motion-safe:transition-colors {valid !==
  'unset'
    ? valid === 'valid'
      ? 'ring-blue-500'
      : 'ring-red-500'
    : 'ring-stone-700'}"
  placeholder="Paste your SNBT here..."></textarea>
<p class="text-red-500">
  {error}
</p>
