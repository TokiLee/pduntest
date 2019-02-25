export default class UnitController {
    constructor(scene, units) {
        this.scene = scene;

        // Mouse
        scene.input.topOnly = true;
        this.pointer = scene.input.activePointer;
        this.pos = {
            x: 0,
            y: 0
        };

        // Keyboard
        this.keys = scene.input.keyboard.addKeys({
            'selectUnit1': Phaser.Input.Keyboard.KeyCodes.ONE,
            'selectUnit2': Phaser.Input.Keyboard.KeyCodes.TWO,
            'selectUnit3': Phaser.Input.Keyboard.KeyCodes.THREE,
            'selectUnit4': Phaser.Input.Keyboard.KeyCodes.FOUR
        });

        this.units = units;

    }

    update() {
        const units = this.units;
        const pointer = this.pointer;
        const pos = this.pos;
        const worldPoint = this.pointer.positionToCamera(this.scene.cameras.main);
        const keys = this.keys;


        // Input Logic
        // Mouse
        if (pointer.rightButtonDown()) {
            pos.x = worldPoint.x;
            pos.y = worldPoint.y;
            this.rightClick(units, pos.x, pos.y);
        }

        // Click on another object
        // this.scene.input.on('gameobjectdown', (pointer, unit) => {
        //         if (pointer.leftButtonDown()) {
        //             this.leftClick(unit);
        //             // later add functionality when right click on other objects
        //         }
        //     // Drag functionality
        // );

        this.scene.input.on('gameobjectdown', (pointer, gameObject, event) => {
            if (pointer.leftButtonDown()) {
                this.leftClick(gameObject);
            }
        });

        // Keyboard
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
        units.forEach(function (unit) {
            if (unit.selected === true) {
                unit.move(x, y);
            }
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

    // drag functionality to select multiple units
    leftClickDrag() {

    }

}