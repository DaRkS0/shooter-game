import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Field } from "./Field";
import { Tile } from "./Tile";
import { TileFactory } from "./TileFactory";

export class Board {
    constructor() {
        this.container = new PIXI.Container();
        /**
         * @type {Field[]}
         */
        this.fields = [];
        // @ts-ignore
        this.rows = App.config.board.rows;
        // @ts-ignore
        this.cols = App.config.board.cols;
        this.create();
        this.ajustPosition();
        this.repos();
        //App.app.stage.on("onWindowResize", this.repos = this.repos.bind(this));

        //   window.addEventListener("res", this.repos = this.repos.bind(this))

        window.addEventListener("resize", () => {
            clearTimeout(this.doit);
            this.doit = setTimeout(this.repos = this.repos.bind(this), 100);
        })

    }

    create() {
        this.createFields();
        this.createTiles();
    }

    createFields() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createField(row, col);
            }
        }
    }
    createTiles() {
        this.fields.forEach(field => this.createTile(field));
    }
    /**
     * 
     * @param {Field} field 
     */
    createTile(field) {
        const tile = TileFactory.generate();
        field.setTile(tile);
        this.container.addChild(tile.sprite);

        //tile.sprite.interactive = true;
        tile.sprite.eventMode = "static"
        tile.sprite.on("pointerdown", () => {
            this.container.emit('tile-touch-start', tile);
        });

        return tile;
    }

    /**
     * 
     * @param {number} row 
     * @param {number} col 
     */
    createField(row, col) {
        const field = new Field(row, col);
        this.fields.push(field);
        this.container.addChild(field.sprite);
    }

    ajustPosition() {
        this.fieldSize = this.fields[0].sprite.width;
        this.width = this.cols * this.fieldSize;
        this.height = this.rows * this.fieldSize;
        //  this.container.x = (window.innerWidth - this.width) / 2 + this.fieldSize / 2;
        // this.container.y = (window.innerHeight - this.height) / 2 + this.fieldSize / 2;
    }
    repos() {

        //console.log("RESIZE");

        let bounds = this.container.getBounds();
        let kx = window.innerWidth / this.width;
        let ky = window.innerHeight / bounds.height;
        console.log({
            kx, ky
        })
        if (kx < 1.4) this.container.scale.set(kx * 0.9);
        else this.container.scale.set(1);
        // this.container.x = (window.innerWidth - this.container.width) / 2;
        // this.container.y = (window.innerHeight - this.container.height) / 2;
        //this.fieldSize = this.fields[0].sprite.width;

        bounds = this.container.getBounds();
        const test = bounds.width / this.cols
        const htest = bounds.height / this.rows
        this.container.position.set((window.innerWidth - bounds.width) * 0.5 + test / 2, (window.innerHeight - bounds.height) * 0.5 + test / 2);

        // bounds = this.container.getBounds();
        // this.container.position.set((window.innerWidth - bounds.width) * 0.5, (window.innerHeight - bounds.height) * 0.5);

        // let bounds = this.fields[0].sprite.getBounds();
        // let kx = window.innerWidth / bounds.width;
        // let ky = window.innerHeight / bounds.height;
        // if (kx < 1 || ky < 1) this._field.scale.set(Math.min(kx * 0.9, ky * 0.9));
        // else this._field.scale.set(1);
        // bounds = this.fields[0].sprite.getBounds();
        // this._field.position.set((window.innerWidth - bounds.width) * 0.5, (window.innerHeight - bounds.height) * 0.5);



    }
    /**
     * 
     * @param {Tile} tile1 
     * @param {Tile} tile2 
     */
    swap(tile1, tile2) {
        const tile1Field = tile1.field;
        const tile2Field = tile2.field;

        tile1Field.tile = tile2;
        tile2.field = tile1Field;

        tile2Field.tile = tile1;
        tile1.field = tile2Field;
    }

    /**
     * 
     * @param {number} row 
     * @param {number} col 
     * @returns 
     */
    getField(row, col) {
        return this.fields.find(field => field.row === row && field.col === col);
    }
}