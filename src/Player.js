class Player {


    constructor(scene) {

        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(50, 600, 'player');
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
            frames: [{key: 'player', frame: 0}],
            frameRate: 10,
            repeat:-1,

        });

        this.scene.anims.create({
            key: 'run',
            frames: [{key: 'playerP',
                start: 0,
                end: 8,
            }],
            frameRate: 10,
            repeat:-1,

        });
    }

    jump(){
        this.player.setVelocityY(-550);
        this.player.play('jump', true);
    }
    moveRight(){
        this.player.setVelocityX(700);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
    }

    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
        }
    }

    }



