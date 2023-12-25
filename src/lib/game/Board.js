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
        this.create(); this.ajustPosition();
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

        tile.sprite.interactive = true;
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
        this.container.x = (window.innerWidth - this.width) / 2 + this.fieldSize / 2;
        this.container.y = (window.innerHeight - this.height) / 2 + this.fieldSize / 2;
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