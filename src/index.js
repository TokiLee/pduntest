import Phaser from "phaser";
import FirstDungeon from "./first-dungeon-scene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000",
  parent: "game-container",
  pixelArt: true,
  scene: FirstDungeon,
  input: {
    keyboard: true,
    mouse: true,
    touch: false,
    gamepad: false
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0
      },
      debug: true
    }
  }
};

const game = new Phaser.Game(config);