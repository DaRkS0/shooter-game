<script>
  import { App } from "$lib/system/App";
  import { Game } from "$lib/game/Game";
  import { onMount } from "svelte";
  import Config from "$lib/game/Config";
  const sprites = import.meta.glob("$lib/sprites/*.png");
  onMount(() => {
    // @ts-ignore
    // console.log(Object.keys(sprites).map((s) => s.replace("/src/lib", "")));
    App.run(Config);
  });
</script>

<div class="wrapper h-full w-full flex" id="wrapper">
  <!-- <canvas
    class="h-full w-full"
    bind:this={canv}
    on:click={(ev) => manager.AddProjectile(ev.clientX, ev.clientY)}
  >
  </canvas> -->
</div>

<style>
  :global(html, body) {
    background-color: #000;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  /* :global(canvas) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  } */
</style>
