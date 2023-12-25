/**
 * @typedef {{x:number,y:number}} velocity
 * @typedef {{x:number,y:number,radius:number,color:string,velocity:velocity}} GameObjectData
 */

class GameObject {
    /**
     * 
     * @param {GameObjectData} data 
     */
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.color = data.color;
        this.radius = data.radius;
        this.velocity = data.velocity;
    }

    draw() {
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.color;
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.ctx.fill()
        }
    }
    /**
     * 
     * @param {CanvasRenderingContext2D|null} ctx 
     */
    update(ctx) {
        this.ctx = ctx;
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

export { GameObject }