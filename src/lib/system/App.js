//import { Assets, Sprite } from 'pixi.js';
import * as PIXI from "pixi.js";
import { ScenesManager } from "./ScenesManager";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

/**
 * @typedef {import("./Scene").Scene} Scene
 */

class Application {
  /**
   * @param {{element:string,scenes:Record<string,new()=>Scene>,loader:string[]}} config 
   */
  async run(config) {
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);

    this.app = new PIXI.Application({ resizeTo: window });


    this.config = config;
    // @ts-ignore
    // document.body.appendChild(this.app.view);
    document.querySelector(`#${this.config.element}`)?.appendChild(this.app.view);
    this.scenes = new ScenesManager();
    this.app.stage.interactive = true;

    this.app.stage.addChild(this.scenes.container);
    await PIXI.Assets.init({ manifest: "manifest.json" });
    const asss = await PIXI.Assets.loadBundle('game-screen');
    // console.log(asss)
    this.start();
  }
  /**
   * @param {string} key 
   */
  res(key) {
    //return this.Assets[key];// PIXI.Assets.get(key);
    return PIXI.Assets.get(key);
  }
  /**
   * @param {string} key 
   */
  sprite(key) {
    return new PIXI.Sprite(this.res(key));
  }
  start() {
    this.scenes?.start("Game");
  }
}
export const App = new Application();