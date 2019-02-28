// Developed by Toki Lee

import Phaser from "phaser";
import PhaserNaveMeshPlugin from "phaser-navmesh";
import FirstDungeon from "./first-dungeon-scene.js";

const config = {
  type: Phaser.AUTO,
  width: 816,
  height: 624,
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
  plugins: {
    scene: [{
      key: "PhaserNavMeshPlugin",
      plugin: PhaserNaveMeshPlugin,
      mapping: "navMeshPlugin",
      start: true
    }]
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