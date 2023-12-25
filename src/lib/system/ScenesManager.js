import * as PIXI from "pixi.js";
import { App } from "./App";
/**
 * @typedef {import("./Scene").Scene} Scene
 */
export class ScenesManager {
    constructor() {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        /**
         * @type {Scene|null}
         */
        this.scene = null;
    }

    /**
     * 
     * @param {string} scene 
     */
    start(scene) {
        if (this.scene) {
            this.scene.remove();
        }
        if (App.config) {
            this.scene = new App.config.scenes[scene]();
            this.container.addChild(this.scene.container);
        }
    }
}
