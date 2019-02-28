import Phaser from "phaser";
import Dungeon from "@mikewesthad/dungeon";


// Input controls
import UnitController from "./unit/unit-controller.js";

// units
import Unit from "./unit/unit.js";
import Animations from "./unit/animations.js"

// assets
import TILES from "./tile-mapping.js";
import Character from "./assets/spritesheets/character.png";
import TileSet from "./assets/tilesets/dungeon-tile.png";
import SingleRoomMap from "./assets/tilesets/single-room.json";

export default class FirstDungeon extends Phaser.Scene {
    preload() {
        this.load.image("tiles", TileSet);
        this.load.tilemapTiledJSON("map", SingleRoomMap);
        this.load.spritesheet(
            "characters",
            Character, {
                frameWidth: 64,
                frameHeight: 64,
                margin: 1,
                spacing: 2
            }
        );
    }

    create() {
        // no menu on right click
        this.input.mouse.disableContextMenu();

        const tilemap = this.add.tilemap("map")
        const tileset = tilemap.addTilesetImage("dungeon-tile", "tiles");
        const obstacles = tilemap.createStaticLayer("obstacles", tileset);

        const objectLayer = tilemap.getObjectLayer("navmesh");
        const navMesh = this.navMeshPlugin.buildMeshFromTiled("mesh", objectLayer, 3.42);





        // // Dungeon Generator
        // this.dungeon = new Dungeon({
        //     width: 50,
        //     height: 50,
        //     doorPadding: 2,
        //     rooms: {
        //         width: {
        //             min: 7,
        //             max: 15,
        //             onlyOdd: true
        //         },
        //         height: {
        //             min: 7,
        //             max: 15,
        //             onlyOdd: true
        //         }
        //     }
        // });

        // // Creating a blank tilemap with dimensions matching the dungeon
        // const map = this.make.tilemap({
        //     tileWidth: 48,
        //     tileHeight: 48,
        //     width: this.dungeon.width,
        //     height: this.dungeon.height
        // });
        // const tileset = map.addTilesetImage("tiles", null, 48, 48, 1, 2); // 1px margin, 2px spacing
        // this.groundLayer = map.createBlankDynamicLayer("Ground", tileset);
        // // this.stuffLayer = map.createBlankDynamicLayer("Stuff", tileset);

        // this.groundLayer.fill(TILES.BLANK);

        // this.dungeon.rooms.forEach(room => {
        //     const {
        //         x,
        //         y,
        //         width,
        //         height,
        //         left,
        //         right,
        //         top,
        //         bottom
        //     } = room;

        //     // Fill the floor with mostly clean tiles
        //     this.groundLayer.weightedRandomize(x + 1, y + 1, width - 2, height - 2, TILES.FLOOR);

        //     // Place the room corners tiles
        //     this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
        //     this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
        //     this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
        //     this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);

        //     // Fill the walls with mostly clean tiles
        //     this.groundLayer.weightedRandomize(left + 1, top, width - 2, 1, TILES.WALL.TOP);
        //     this.groundLayer.weightedRandomize(left + 1, bottom, width - 2, 1, TILES.WALL.BOTTOM);
        //     this.groundLayer.weightedRandomize(left, top + 1, 1, height - 2, TILES.WALL.LEFT);
        //     this.groundLayer.weightedRandomize(right, top + 1, 1, height - 2, TILES.WALL.RIGHT);

        //     // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
        //     // room's location. Each direction has a different door to tile mapping.
        //     var doors = room.getDoorLocations(); // → Returns an array of {x, y} objects
        //     for (var i = 0; i < doors.length; i++) {
        //         if (doors[i].y === 0) {
        //             this.groundLayer.putTilesAt(TILES.DOOR.TOP, x + doors[i].x - 1, y + doors[i].y);
        //         } else if (doors[i].y === room.height - 1) {
        //             this.groundLayer.putTilesAt(TILES.DOOR.BOTTOM, x + doors[i].x - 1, y + doors[i].y);
        //         } else if (doors[i].x === 0) {
        //             this.groundLayer.putTilesAt(TILES.DOOR.LEFT, x + doors[i].x, y + doors[i].y - 1);
        //         } else if (doors[i].x === room.width - 1) {
        //             this.groundLayer.putTilesAt(TILES.DOOR.RIGHT, x + doors[i].x, y + doors[i].y - 1);
        //         }
        //     }
        // });



        // Not exactly correct for the tileset since there are more possible floor tiles, but this will
        // do for the example.
        // this.groundLayer.setCollisionByExclusion([-1, 6, 7, 8, 26]);

        // const navMesh = this.navMeshPlugin.buildMeshFromTiled("mesh", this.groundLayer, 12.5);

        // 4x4 per 1 tile 200x200

        // create tilemap for pathfinder 2d array
        // const tileMapForPathfinder = new Array(this.groundLayer.layer.data.length * 4);

        // for (var i = 0; i < this.groundLayer.layer.data.length; i++) {
        //     tileMapForPathfinder[i * 4] = new Array(this.groundLayer.layer.data[i].length * 4);
        //     tileMapForPathfinder[(i * 4) + 1] = new Array(this.groundLayer.layer.data[i].length * 4);
        //     tileMapForPathfinder[(i * 4) + 2] = new Array(this.groundLayer.layer.data[i].length * 4);
        //     tileMapForPathfinder[(i * 4) + 3] = new Array(this.groundLayer.layer.data[i].length * 4);
        // }
        // for (let i = 0; i < this.groundLayer.layer.data.length; i++) {
        //     for (let j = 0; j < this.groundLayer.layer.data[i].length; j++) {
        //         if ([6, 7, 8, 26].includes(this.groundLayer.layer.data[i][j].index)) {
        //             tileMapForPathfinder[i * 4][j * 4] = 0;
        //             tileMapForPathfinder[i * 4][(j * 4) + 1] = 0;
        //             tileMapForPathfinder[i * 4][(j * 4) + 2] = 0;
        //             tileMapForPathfinder[i * 4][(j * 4) + 3] = 0;
        //         } else {
        //             tileMapForPathfinder[i * 4][j * 4] = 1;
        //             tileMapForPathfinder[i * 4][(j * 4) + 1] = 1;
        //             tileMapForPathfinder[i * 4][(j * 4) + 2] = 1;
        //             tileMapForPathfinder[i * 4][(j * 4) + 3] = 1;
        //         }
        //     }
        //     tileMapForPathfinder[(i * 4) + 1] = tileMapForPathfinder[i * 4];
        //     tileMapForPathfinder[(i * 4) + 2] = tileMapForPathfinder[i * 4];
        //     tileMapForPathfinder[(i * 4) + 3] = tileMapForPathfinder[i * 4];
        // }

        // this.PathFinding = new PathFinding.Grid(tileMapForPathfinder);

        // Place the units in the center of the map
        this.animations = new Animations(this);

        const renn = new Unit(this, 88, 88, navMesh);
        const tweed = new Unit(this, 88, 88, navMesh);
        const bismark = new Unit(this, 88, 88, navMesh);
        const mayumi = new Unit(this, 88, 88, navMesh);

        this.units = [renn, tweed, bismark, mayumi];
        this.unitController = new UnitController(this, this.units, navMesh);

        // Watch the player and ground layer for collisions, for the duration of the scene:
        // for (let i = 0; i < this.units.length; i++) {
        //     this.physics.add.collider(this.units[i].sprite, this.groundLayer);
        // }

        this.units.forEach(unit => this.physics.add.collider(unit.sprite, this.groundLayer));

        // Phaser supports multiple cameras, but you can access the default camera like this:
        const camera = this.cameras.main;

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        camera.startFollow(this.units[0].sprite);
    }

    update() {
        this.unitController.update();
        this.units.forEach(function (unit) {
            unit.update();
        });
    }
}