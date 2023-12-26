<script>
  import { Start } from "$lib/Game";
  import { GameManager } from "$lib";
  import { onMount } from "svelte";
  /**
   * @type {HTMLCanvasElement}
   */
  let canv;

  /**
   * @type {GameManager}
   */
  let manager;
  let frameKey = -1;
  onMount(() => {
    Start();
  });
</script>

<div
  class="wrapper h-screen w-screen flex flex-col items-center justify-center"
  id="parent"
></div>
