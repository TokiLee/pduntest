/**
 * A class that wraps up our top down player logic. It creates, animates and moves a sprite in
 * response to WASD keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Player {
    constructor(scene, x, y) {
      this.scene = scene;
  
      const anims = scene.anims;
      anims.create({
        key: "player-walk",
        frames: anims.generateFrameNumbers("characters", { start: 46, end: 49 }),
        frameRate: 8,
        repeat: -1
      });
      anims.create({
        key: "player-walk-back",
        frames: anims.generateFrameNumbers("characters", { start: 65, end: 68 }),
        frameRate: 8,
        repeat: -1
      });
  
      this.sprite = scene.physics.add
        .sprite(x, y, "characters", 0)
        .setSize(22, 33)
        .setOffset(23, 27);
  
      this.sprite.anims.play("player-walk-back");
  
      this.keys = scene.input.keyboard.createCursorKeys();
      this.pointer = scene.input.activePointer;
      this.XYPos = {"x": this.sprite.x, "y": this.sprite.y, "angle": 0};
      this.walking = {"isWalking": false};
    }
  
    freeze() {
      this.sprite.body.moves = false;
    }
  
    update() {
    //   const pointer = scene.input.activePointer;
      const keys = this.keys;
      const pointer = this.pointer;
      const worldPoint = this.pointer.positionToCamera(this.scene.cameras.main);
      const sprite = this.sprite;
      const speed = 300;
      const prevVelocity = sprite.body.velocity.clone();
      
      
  
      // Stop any previous movement from the last frame
      sprite.body.setVelocity(0);
  
      // // Horizontal movement
      // if (keys.left.isDown) {
      //   sprite.body.setVelocityX(-speed);
      //   sprite.setFlipX(true);
      // } else if (keys.right.isDown) {
      //   sprite.body.setVelocityX(speed);
      //   sprite.setFlipX(false);
      // }
  
      // // Vertical movement
      // if (keys.up.isDown) {
      //   sprite.body.setVelocityY(-speed);
      // } else if (keys.down.isDown) {
      //   sprite.body.setVelocityY(speed);
      // }

      if (pointer.rightButtonDown()) {
        this.XYPos.x = worldPoint.x;
        this.XYPos.y = worldPoint.y;
        this.XYPos.angle = Phaser.Math.Angle.Between(sprite.x, sprite.y, this.XYPos.x, this.XYPos.y);
        console.log(this.XYPos.angle);
        if (sprite.x != worldPoint.x || sprite.y != worldPoint.y)
          this.walking.isWalking = true;
      }

      if (this.walking.isWalking === true){
        //if (XYPos.angle)

      // if(sprite.x < this.XYPos.x) {
      //   sprite.body.setVelocityX(speed);
      // }
      // if(sprite.x > this.XYPos.x)
      //   sprite.body.setVelocityX(-speed);

      // if(sprite.y < this.XYPos.y)
      //   sprite.body.setVelocityY(speed);
      // if(sprite.y > this.XYPos.y)
      //   sprite.body.setVelocityY(-speed);

        this.scene.physics.moveTo(sprite, this.XYPos.x, this.XYPos.y);
        if (sprite.x === this.XYPos.x && sprite.y === this.XYPos.y)
          this.walking.isWalking = false;
      }
      // Normalize and scale the velocity so that sprite can't move faster along a diagonal
      sprite.body.velocity.normalize().scale(speed);
  
      // Update the animation last and give left/right/down animations precedence over up animations
      if (keys.left.isDown || keys.right.isDown || keys.down.isDown ) {
        sprite.anims.play("player-walk", true);
      } else if (keys.up.isDown) {
        sprite.anims.play("player-walk-back", true);
      } else {
        sprite.anims.stop();
  
        // If we were moving & now we're not, then pick a single idle frame to use
        if (prevVelocity.y < 0) sprite.setTexture("characters", 65);
        else sprite.setTexture("characters", 46);
      }

    }

    destroy() {
      this.sprite.destroy();
    }
  }
  