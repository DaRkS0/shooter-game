import { App } from "../system/App";

export class Field {
    /**
     * 
     * @param {number} row 
     * @param {number} col 
     */
    constructor(row, col) {
        this.row = row;
        this.col = col;

        this.sprite = App.sprite("field");
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        this.sprite.anchor.set(0.5);

        this.selected = App.sprite("field-selected");
        this.sprite.addChild(this.selected);
        this.selected.visible = false;
        this.selected.anchor.set(0.5);
    }

    get position() {
        return {
            x: this.col * this.sprite.width,
            y: this.row * this.sprite.height
        };
    }
    /**
     * 
     * @param {import("./Tile").Tile} tile 
     */
    setTile(tile) {
        this.tile = tile;
        // @ts-ignore
        tile.field = this;
        tile.setPosition(this.position);
    } unselect() {
        this.selected.visible = false;
    }

    select() {
        this.selected.visible = true;
    }
}