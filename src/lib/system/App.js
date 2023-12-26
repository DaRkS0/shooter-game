//import { Assets, Sprite } from 'pixi.js';
import * as PIXI from "pixi.js";
import { ScenesManager } from "./ScenesManager";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

const datas = [
  {
    "name": "bg",
    "srcs": "/sprites/bg.png"
  },

  {
    "name": "field",
    "srcs": "/sprites/field.png"
  },
  {
    "name": "field-selected",
    "srcs": "/sprites/field-selected.png"
  },
  {
    "name": "blue",
    "srcs": "/sprites/blue.png"
  },
  {
    "name": "green",
    "srcs": "/sprites/green.png"
  },
  {
    "name": "orange",
    "srcs": "/sprites/orange.png"
  },
  {
    "name": "pink",
    "srcs": "/sprites/pink.png"
  },
  {
    "name": "red",
    "srcs": "/sprites/red.png"
  },
  {
    "name": "yellow",
    "srcs": "/sprites/yellow.png"
  }
];
/**
 * @typedef {import("./Scene").Scene} Scene
 */

class Application {
  /**
   * @param {import("../game/Config")} config 
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
    for (let index = 0; index < datas.length; index++) {
      const element = datas[index];
      this.app.loader.add(element.name, element.srcs)
    }
    this.app.loader.load(() => {
      console.log(this.app.loader.resources)
      this.start();
    });
    // const asss = await PIXI.Assets.loadBundle('game-screen');
    // console.log(asss)

  }
  /**
   * @param {string} key 
   */
  res(key) {
    //return this.Assets[key];// PIXI.Assets.get(key);
    //return PIXI.Assets.get(key);
    const test = this.app.loader.resources[key].texture;
    // console.log(test, key)
    console.log(this.app.loader.resources[key])
    return test;
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