import Phaser from "phaser";
export default class Game extends Phaser.Scene {
	private player: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined;
	private target: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined;
	private cursor: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
	private score: number;
	constructor() {
		super("game-scene");
		this.score = 0;
	}

	preload() {
		this.load.image("bg", "/assets/bg.png");
		this.load.image("basket", "/assets/basket.png");
		this.load.image("apple", "/assets/apple.png");
	}

	create() {
		this.add.image(0, 0, "bg").setOrigin(0, 0);
		this.player = this.physics.add.image(0, 400, "basket").setOrigin(0, 0);
		this.target = this.physics.add.image(0, 0, "apple").setOrigin(0, 0);
		this.player.setImmovable(true);
		this.player.body.allowGravity = false;
		this.player.setCollideWorldBounds(true);
		this.cursor = this.input.keyboard?.createCursorKeys();

		this.target.setMaxVelocity(0, 300);
		this.player
			.setSize(this.player.width * 0.75, this.player.height / 6)
			.setOffset(this.player.width / 10, this.player.height * 0.9);
		this.physics.add.overlap(
			this.target,
			this.player,
			() => {
				this.targetHit(true);
				//console.log("overlap");
			},
			undefined,
			this,
		);
		this.player.setInteractive({ draggable: true });
		this.input.on("drag", (pointer, gameObject, dragX) => {
			//  By clamping dragX we can keep it within
			//  whatever bounds we need
			dragX = Phaser.Math.Clamp(dragX, 0, 500);

			//  By only applying the dragX we can limit the drag
			//  to be horizontal only
			gameObject.x = dragX;
		});
	}

	update() {
		if (this.target && this.target.y > 500) {
			this.resetPostion();
		}
		if (this.cursor) {
			const { left, right } = this.cursor;
			if (left.isDown) {
				this.player?.setVelocityX(-300);
			} else if (right.isDown) {
				this.player?.setVelocityX(300);
			} else {
				this.player?.setVelocityX(0);
			}
		}
	}

	getRandomX() {
		return Math.floor(Math.random() * 480);
	}
	resetPostion() {
		if (this.target) {
			this.target.setY(0);
			this.target.setX(this.getRandomX());
		}
	}
	targetHit(addpoint = false) {
		this.resetPostion();
		if (addpoint) this.score++;
	}
}
export function Start() {
	const game = new Phaser.Game({
		width: 500,
		height: 500,

		type: Phaser.AUTO,
		scene: [Game],
		parent: "parent",
		pixelArt: true,
		physics: {
			default: "arcade",
			arcade: {
				gravity: { y: 300 },
				debug: true,
			},
		},
	});
}
