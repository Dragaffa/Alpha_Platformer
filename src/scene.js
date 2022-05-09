class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('Piment', 'assets/images/Piment.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player2', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.spritesheet('player','assets/images/courirT.png',{frameWidth: 118, frameHeight: 121});
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('tiles2', 'assets/tilesets/déco1.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
    }


    create() {

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(1, 0.8);
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');
        const tileset2 = map.addTilesetImage('déco1', 'tiles2');
        this.arrière = map.createStaticLayer('plat', tileset2);
        this.platforms = map.createStaticLayer('Sol', tileset);

        this.platforms.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = new Player(this)
        this.piment = new Piment(this, this.player)

        this.cameras.main.startFollow(this.player.player,false);

        this.speed={
            speedMultiple : 1,
        }
        this.glissade = this.tweens.add({
            targets: this.speed,
            speedMultiple: 0,
            // alpha: { start: 0, to: 1 },
            // alpha: 1,
            // alpha: '+=1',
            ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 5000,

            //repeat: -1, // -1: infinity
            //yoyo: true
        });
    }


    update() {
        if (!this.piment.eatPiment){
            this.player.player.setVelocityX(300)
        }else {
            this.player.player.setVelocityX(700)
        }

        if (this.player.player.body.onFloor()) {
            this.player.player.play('walk', true)}

        switch (true) {
            case (this.cursors.up.isDown) && this.player.player.body.onFloor():
                this.player.jump()
                break;

        }

        if (this.cursors.down.isDown){
            if (this.flag){

            }else{
                this.glissade.play();
                this.flag=true;
            }
            this.player.player.body.setOffset(0,82);
            this.player.player.body.setSize( this.player.player.sourceWidth, 40, false);
            if (!this.piment.eatPiment){
                this.player.player.setVelocityX(350 * this.speed.speedMultiple);
            }else {
                this.player.player.setVelocityX(650 * this.speed.speedMultiple);
            }

            console.log(this.player.player.getCenter());
        }
        if (!this.cursors.down.isDown){
            if (this.flag){
                this.player.player.setVelocityX(0);
                this.flag=false;
                this.player.player.body.setOffset(0,0);
                this.player.player.body.setSize( this.player.player.sourceWidth,  this.player.player.sourceHeight, true);
                this.glissade.stop();
            }
        }

}




}