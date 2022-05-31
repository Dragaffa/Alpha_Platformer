class Glisse {


    constructor(scene, player) {
        this.scene = scene
        this.player = player
        const map = this.scene.make.tilemap({key: 'map'});

        this.isGliss = false;
        let me = this
        me.glissIn = false;


        this.Glisse = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true,
        });
        map.getObjectLayer('Gliss').objects.forEach((Glisse) => {
            this.glisseSprite = this.scene.physics.add.sprite(Glisse.x+(Glisse.width*0.5), Glisse.y+(Glisse.height*0.5)).setSize(Glisse.width, Glisse.height)
            this.Glisse.add(this.glisseSprite)
        });
        this.scene.physics.add.overlap(this.player.player, this.Glisse, function(player,gliss){
            me.player.player.body.setOffset(0,82);
            me.player.player.body.setSize( me.player.player.sourceWidth, 40, false);
            me.glissIn = true;
            me.isGliss = true;
            console.log('test')
        },null, this);
    }


}