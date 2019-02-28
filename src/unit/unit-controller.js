import Unit from "./unit";

const DRAG_PIXELS = 15;

export default class UnitController {
    constructor(scene, units, navMesh) {
        this.scene = scene;
        this.navMesh = navMesh;
        navMesh.enableDebug(); // Creates a Phaser.Graphics overlay on top of the screen
        navMesh.debugDrawClear(); // Clears the overlay
        // Visualize the underlying navmesh
        // Visualize an individual path

        // Mouse
        scene.input.topOnly = true;
        this.pointer = scene.input.activePointer;
        this.pos = {
            x: 0,
            y: 0
        };
        this.savedWorldPoint = {
            x: 0,
            y: 0
        };
        scene.input.on('gameobjectdown', (pointer, gameObject) => {
            if (pointer.leftButtonDown()) {
                this.leftClick(gameObject);
            }
        });

        // Keyboard
        this.keys = scene.input.keyboard.addKeys({
            'selectUnit1': Phaser.Input.Keyboard.KeyCodes.ONE,
            'selectUnit2': Phaser.Input.Keyboard.KeyCodes.TWO,
            'selectUnit3': Phaser.Input.Keyboard.KeyCodes.THREE,
            'selectUnit4': Phaser.Input.Keyboard.KeyCodes.FOUR
        });

        this.units = units;

        this.isDragging = false;

        this.graphics = scene.add.graphics({
            lineStyle: {
                width: 2,
                color: 0x00ff00
            },
            fillStyle: {
                color: 0xff0000
            }
        });
    }

    update() {
        const {
            scene,
            pointer,
            units,
            keys
        } = this;
        this.worldPoint = pointer.positionToCamera(scene.cameras.main);


        // Clears drawn selection box at the start of every frame
        this.graphics.clear();

        // Input Logic
        // Mouse
        if (pointer.rightButtonDown()) {
            this.pos.x = this.worldPoint.x;
            this.pos.y = this.worldPoint.y;
            this.rightClick(units, this.pos.x, this.pos.y);
        }

        // Drag logic
        if (!this.isDragging) {
            if (pointer.leftButtonDown()) {
                this.pos.x = this.pointer.x;
                this.pos.y = this.pointer.y;
                this.savedWorldPoint.x = this.worldPoint.x;
                this.savedWorldPoint.y = this.worldPoint.y;
                this.isDragging = true;
            }
        }
        if (this.isDragging) {
            if (Math.abs(this.pointer.x - this.pos.x) + Math.abs(this.pointer.y - this.pos.y) > DRAG_PIXELS) {
                this.drawBox();
            } else if (!pointer.leftButtonDown()) {
                this.isDragging = false;
            }
        }


        // Keyboard Inputs
        if (keys['selectUnit1'].isDown) {
            this.units.forEach(function (unit) {
                unit.selected = false;
            });
            this.units[0].selected = true;
        }

        if (keys['selectUnit2'].isDown) {
            this.units.forEach(function (unit) {
                unit.selected = false;
            });
            this.units[1].selected = true;
        }

        if (keys['selectUnit3'].isDown) {
            this.units.forEach(function (unit) {
                unit.selected = false;
            });
            this.units[2].selected = true;
        }

        if (keys['selectUnit4'].isDown) {
            this.units.forEach(function (unit) {
                unit.selected = false;
            });
            this.units[3].selected = true;
        }

    }

    rightClick(units, x, y) {
        // Basic right click functionality. Once more complicated systems are in place, put in if statement to check which case to handle.
        units.forEach(unit => {
            if (unit.selected) {
                const path = this.navMesh.findPath({
                    x: unit.sprite.x,
                    y: unit.sprite.y
                }, {
                    x: x,
                    y: y
                });
                if (path) {
                    unit.move(path);
                }
            };
        });
    }

    // left click selects unit hovered over.
    leftClick(clickedUnit) {
        //Deselects all selected units and then selects the clicked unit
        this.units.forEach(function (unit) {
            unit.selected = false;
        });
        this.units.forEach(function (unit) {
            if (unit.sprite === clickedUnit) {
                unit.selected = true;
            }
        })
    }

    drawBox() {
        let rect = new Phaser.Geom.Rectangle(this.savedWorldPoint.x, this.savedWorldPoint.y, this.pointer.x - this.pos.x, this.pointer.y - this.pos.y);
        this.graphics.lineStyle(2, 0x00ff00);
        this.graphics.strokeRectShape(rect);
        if (!this.pointer.leftButtonDown()) {
            this.boxSelection(this.units, this.savedWorldPoint.x, this.savedWorldPoint.y, this.worldPoint.x, this.worldPoint.y);
            this.isDragging = false;
        }
    }

    // drag functionality to select multiple units
    boxSelection(units, startX, startY, endX, endY) {
        units.forEach(unit => {
            if (startX <= endX && startY <= endY) {
                if (unit.sprite.x >= startX && unit.sprite.x <= endX && unit.sprite.y >= startY && unit.sprite.y <= endY) {
                    unit.selected = true;
                } else {
                    unit.selected = false;
                }
            } else if (startX >= endX && startY <= endY) {
                if (unit.sprite.x <= startX && unit.sprite.x >= endX && unit.sprite.y >= startY && unit.sprite.y <= endY) {
                    unit.selected = true;
                } else {
                    unit.selected = false;
                }
            } else if (startX <= endX && startY >= endY) {
                if (unit.sprite.x >= startX && unit.sprite.x <= endX && unit.sprite.y <= startY && unit.sprite.y >= endY) {
                    unit.selected = true;
                } else {
                    unit.selected = false;
                }
            } else if (startX >= endX && startY >= endY) {
                if (unit.sprite.x <= startX && unit.sprite.x >= endX && unit.sprite.y <= startY && unit.sprite.y >= endY) {
                    unit.selected = true;
                } else {
                    unit.selected = false;
                }
            }
        })
    }

}