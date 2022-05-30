class Player {


    constructor(scene) {

        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(50, 700, 'player');
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
            key: 'jumpP',
            frames: [{key: 'playerP', frame: 8}],
            frameRate: 10,
            repeat:-1,

        });

        this.scene.anims.create({
            key:'gliss',
            frames: this.scene.anims.generateFrameNames('gliss', {

                start: 0,
                end: 2,

            }),
            frameRate: 15,
            repeat: 0,
        });

        this.scene.anims.create({
            key:'glissP',
            frames: this.scene.anims.generateFrameNames('glissP', {

                start: 0,
                end: 2,

            }),
            frameRate: 15,
            repeat: 0,
        });

        this.scene.anims.create({
            key:'run',
            frames: this.scene.anims.generateFrameNames('playerP', {

                start: 0,
                end: 8,

            }),
            frameRate: 15,
            repeat: -1,
        });
    }

    jump(){
        this.player.setVelocityY(-550);
        if(this.scene.piment.eatPiment){
            this.player.play('jumpP', true);
        } else {
            this.player.play('jump', true);
        }
    }
    moveRight(){
        this.player.setVelocityX(700);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            if(this.scene.piment.eatPiment){
                this.player.play('run', true)}
            } else{
                this.player.play('walk', true)}
        }

    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
        }
    }

    }



