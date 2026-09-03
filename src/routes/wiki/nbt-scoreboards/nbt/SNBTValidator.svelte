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
  class="snbt-validator snbt-validator--{valid}"
  aria-invalid={valid === "invalid"}
  aria-describedby={error ? "snbt-validator-error" : undefined}
  placeholder="Paste your SNBT here..."></textarea>
{#if error}
  <p class="snbt-validator__error" id="snbt-validator-error">
    {error}
  </p>
{/if}

<style>
  .snbt-validator {
    display: block;
    width: 100%;
    min-height: 10rem;
    resize: vertical;
    border: 1px solid var(--border-strong);
    border-radius: 0;
    background: var(--surface);
    padding: 0.75rem;
    color: var(--text-primary);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.9rem;
    line-height: 1.55;
    outline: none;
    transition:
      border-color 150ms ease,
      box-shadow 150ms ease;
  }

  .snbt-validator::placeholder {
    color: var(--text-muted);
  }

  .snbt-validator:focus-visible {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
  }

  .snbt-validator--valid {
    border-color: var(--success);
  }

  .snbt-validator--invalid {
    border-color: var(--danger);
  }

  .snbt-validator__error {
    margin: 0.6rem 0 0;
    color: var(--danger);
    font-size: 0.86rem;
    line-height: 1.5;
  }
</style>
