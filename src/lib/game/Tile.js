import { App } from "../system/App";
import { gsap } from "gsap";
export class Tile {
    /**
     * 
     * @param {*} color 
     */
    constructor(color) {
        this.color = color;
        this.sprite = App.sprite(this.color);
        this.sprite.anchor.set(0.5);
    }
    /**
     * 
     * @param {{x:number,y:number}} position 
     */
    setPosition(position) {
        this.sprite.x = position.x;
        this.sprite.y = position.y;
    }
    /**
     * @param {import("./Field").Field} fie 
     */
    set field(fie) {
        this.fieldTile = fie
    }

    get field() {
        // @ts-ignore
        return this.fieldTile;
    }

    /**
     * 
     * @param {{x:number,y:number}} position 
     * @param {number} duration 
     * @returns 
     */
    moveTo(position, duration) {
        return new Promise(resolve => {
            gsap.to(this.sprite, {
                duration,
                pixi: {
                    x: position.x,
                    y: position.y
                },
                onComplete: () => {
                    resolve({})
                }
            });
        });
    }

    /**
     * 
     * @param {Tile} tile 
     * @returns 
     */
    isNeighbour(tile) {
        return Math.abs(this.field.row - tile.field.row) + Math.abs(this.field.col - tile.field.col) === 1
    }

    remove() {
        if (!this.sprite) {
            return;
        }
        this.sprite.destroy();
        this.sprite = null;

        if (this.field) {
            this.field.tile = null;
            this.field = null;
        }
    }
    /**
         * 
         * @param {{x:number,y:number}} position 
         * @param {number} delay 
         * @returns 
         */
    fallDownTo(position, delay) {
        return this.moveTo(position, 0.5, delay, "bounce.out");
    }
}