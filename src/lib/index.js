import { GameObject } from "$lib/GameObject";
const speed = 5;
export class GameManager {
    /**
    * 
    * @param {CanvasRenderingContext2D} ctx 
    */
    constructor(ctx) {

        this.ctx = ctx;
        this.canvas = ctx.canvas;
        /**
         * @type {GameObject[]}
         */
        this.Projectiles = [];
        this.SpawnPlayer();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    SpawnPlayer() {
        if (this.player === undefined) {
            this.player = new GameObject({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                color: "blue",
                radius: 20,
                velocity: { x: 0, y: 0 },
            });
        }
        this.player.update(this.ctx)
    }

    SpawnProjectiles() {
        this.Projectiles.forEach((p, index) => {
            if (p.OutOfBounds(this.canvas.width, this.canvas.height)) {
                setTimeout(() => {
                    this.Projectiles.splice(index, 1);
                }, 0);
            }
            p.update(this.ctx)
        });
    }
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */

    AddProjectile(x, y) {
        if (this.player) {
            const radian = Math.atan2(y - this.player.y, x - this.player.x);
            const Projectile = new GameObject({
                x: this.player.x,
                y: this.player.y,
                color: "red",
                radius: 10,
                velocity: { x: Math.cos(radian) * speed, y: Math.sin(radian) * speed },
            });
            Projectile.update(this.ctx);
            this.Projectiles.push(Projectile);
        }
    }
    Animate() {
        this.clear();
        this.SpawnPlayer();
        this.SpawnProjectiles();
    }
}