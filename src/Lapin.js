class Lapin{

    constructor(scene) {
        this.scene = scene
        this.player = this.scene.physics.add.sprite(50, 700, 'lapinT');
        this.player.setBounce(0.1);
        this.player.setScale(0.45);
        this.player.setCollideWorldBounds(false);
        this.scene.physics.add.collider(this.player, this.scene.platforms);


    }

}