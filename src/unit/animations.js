// Animations class loads up all used animations to the animation manager. Everything global

export default class Animations {
    constructor(scene) {
        this.scene = scene;
        const anims = scene.anims;
        anims.create({
            key: "player-walk",
            frames: anims.generateFrameNumbers("characters", {
                start: 46,
                end: 49
            }),
            frameRate: 8,
            repeat: -1
        });

        anims.create({
            key: "player-walk-back",
            frames: anims.generateFrameNumbers("characters", {
                start: 65,
                end: 68
            }),
            frameRate: 8,
            repeat: -1
        });
    }
}