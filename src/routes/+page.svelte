<script>
  import { App } from "$lib/system/App";
  import { Game } from "$lib/game/Game";
  import { onMount } from "svelte";
  const sprites = import.meta.glob("$lib/sprites/*.png");
  onMount(() => {
    // @ts-ignore
    // console.log(Object.keys(sprites).map((s) => s.replace("/src/lib", "")));
    App.run({
      element: "wrapper",
      loader: Object.keys(sprites).map((s) => s.replace("/src/lib", "")),
      scenes: {
        Game,
      },
    });
  });
</script>

<div class="wrapper h-screen w-screen" id="wrapper">
  <!-- <canvas
    class="h-full w-full"
    bind:this={canv}
    on:click={(ev) => manager.AddProjectile(ev.clientX, ev.clientY)}
  >
  </canvas> -->
</div>
