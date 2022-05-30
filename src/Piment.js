class Piment {


    constructor(scene, player) {
        this.scene = scene
        this.player = player
        const map = this.scene.make.tilemap({key: 'map'});

        this.scene.anims.create({
            key:'piment',
            frames: this.scene.anims.generateFrameNames('piment', {

                start: 0,
                end: 35,

            }),
            frameRate: 15,
            repeat: -1,
        });

        this.piment = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Piment').objects.forEach((piment) => {
            this.pimentSprite = this.piment.create(piment.x, piment.y, 'piment').setOrigin(0).setScale(1);
            this.pimentSprite.play('piment');
            this.Collect();
        });
    }

    Collect(){
        this.scene.physics.add.overlap(this.player.player, this.piment, this.collectCollectible.bind(this))
    }

    collectCollectible(player, bonus){
        let me = this;
        bonus.disableBody(true, true);
        console.log('collectible',this);
        this.eatPiment = true;
        setTimeout(function(){
            me.eatPiment = false;
        },5000)
    }
}