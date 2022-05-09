class Player {


    constructor(scene) {

        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(50, 300, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        this.scene.physics.add.collider(this.player, this.scene.platforms);

        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('player', {
                //prefix: 'courirT',
                start: 0,
                end: 8,
                //duration:10,
            }),
            frameRate: 15,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'jump',
            frames: [{key: 'player', frame: 2}],
            frameRate: 10,
            repeat:-1,

        });
    }

    jump(){
        this.player.setVelocityY(-500);
        this.player.play('jump', true);
    }
    moveRight(){
        this.player.setVelocityX(500);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
    }
    moveLeft(){
        this.player.setVelocityX(-300);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
        this.player.setFlipX(true);
    }
    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
        }
    }

    }



