export default class Unit {
    constructor(scene, x, y, navMesh) {
        this.scene = scene;
        this.navMesh = navMesh;

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
        this.path;

        this.i = 0;
    }

    update() {

        if (this.isMoving) {
            this.scene.physics.moveTo(this.sprite, this.path[this.i].x, this.path[this.i].y, 200);
            if (this.checkDistance) {
                if ((this.sprite.x <= this.path[this.i].x + 3 && this.sprite.x >= this.path[this.i].x - 3) &&
                    (this.sprite.y <= this.path[this.i].y + 3 && this.sprite.y >= this.path[this.i].y - 3)) {
                    if (this.i === this.path.length - 1) {
                        this.isMoving = false;
                        this.checkDistance = false;
                        this.i = 0;
                        this.sprite.body.setVelocity(0, 0);
                    } else {
                        this.i++;
                    }
                }
            }
        }

    }

    move(path) {
        this.isMoving = true;
        this.checkDistance = true;
        this.path = path;
        this.i = 0;
    }

    leftClicked() {
        this.selected = true;
    }
}