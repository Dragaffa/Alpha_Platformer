class Piment {


    constructor(scene, player) {
        this.scene = scene
        this.player = player
        const map = this.scene.make.tilemap({key: 'map'});

        this.piment = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Piment').objects.forEach((piment) => {
            const pimentSprite = this.piment.create(piment.x, piment.y, 'Piment').setOrigin(0).setScale(0.2);
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