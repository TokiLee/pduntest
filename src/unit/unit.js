export default class Unit {
    constructor(scene, x, y) {
        this.scene = scene;

        this.sprite = scene.physics.add
            .sprite(x, y, "characters", 0)
            .setSize(22, 33)
            .setOffset(23, 27)
            .setInteractive();

        this.sprite.anims.play("player-walk-back");

        this.pointer = scene.input.activePointer;
        this.pos = {
            x: this.sprite.x,
            y: this.sprite.y
        };

        this.selected = false;
        this.isMoving = false;
        this.checkDistance = false;
        this.sprite.body.setVelocity(0, 0);
        this.destination = {
            x: this.sprite.x,
            y: this.sprite.y
        };
    }

    update() {
        if (this.isMoving === true) {
            this.scene.physics.moveTo(this.sprite, this.destination.x, this.destination.y, 200);
        }

        if (this.checkDistance) {
            if ((this.sprite.x <= this.destination.x + 2 && this.sprite.x >= this.destination.x - 2) &&
                (this.sprite.y <= this.destination.y + 2 && this.sprite.y >= this.destination.y - 2)) {
                this.isMoving = false;
                this.checkDistance = false;
                this.sprite.body.setVelocity(0, 0);
            }
        }
    }

    move(x, y) {
        this.isMoving = true;
        this.checkDistance = true;
        this.destination.x = x;
        this.destination.y = y;
    }

    leftClicked() {
        this.selected = true;
    }
}