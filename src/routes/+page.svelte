<script>
  import { GameObject } from "$lib/GameObject";
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
    // @ts-ignore
    const context = canv.getContext("2d");
    if (context) {
      canv.width = innerWidth;
      canv.height = innerHeight;
      manager = new GameManager(context);
      Start();

      //   const player = new GameObject({
      //     x: canv.width / 2,
      //     y: canv.height / 2,
      //     color: "blue",
      //     radius: 20,
      //     velocity: { x: 0, y: 0 },
      //   });
      //   player.update(context);
    }
  });
  function Start() {
    frameKey = requestAnimationFrame(animate);
  }

  function animate() {
    frameKey = requestAnimationFrame(animate);
    manager?.Animate();
  }
</script>

<div class="wrapper h-screen w-screen">
  <canvas
    class="h-full w-full"
    bind:this={canv}
    on:click={(ev) => manager.AddProjectile(ev.clientX, ev.clientY)}
  >
  </canvas>
</div>
