<script>
  import { GameObject } from "$lib/GameObject";
  import { onMount } from "svelte";
  /**
   * @type {HTMLCanvasElement}
   */
  let canv;

  onMount(() => {
    // @ts-ignore
    const context = canv.getContext("2d");
    if (context) {
      canv.width = innerWidth;
      canv.height = innerHeight;
      const player = new GameObject({
        x: canv.width / 2,
        y: canv.height / 2,
        color: "blue",
        radius: 20,
        velocity: { x: 0, y: 0 },
      });
      player.update(context);
    }
  });
</script>

<div class="wrapper h-screen w-screen">
  <canvas class="h-full w-full" bind:this={canv}> </canvas>
</div>
