class Lapin{

    constructor(scene) {
        this.scene = scene
        this.player = this.scene.physics.add.sprite(50, 700, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        this.scene.physics.add.collider(this.player, this.scene.platforms);

    }

}