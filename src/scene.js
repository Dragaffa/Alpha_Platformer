class scene extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload() {
        //this.load.image('Piment', 'assets/images/Piment.png');
        //this.load.image('menu', 'assets/images/Menu.png');
        this.load.image('bouton', 'assets/images/bouton.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player2', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.spritesheet('player','assets/images/courirT2.png',{frameWidth: 118, frameHeight: 121});
        this.load.spritesheet('playerP','assets/images/courirP.png',{frameWidth: 136, frameHeight: 137});
        this.load.spritesheet('piment','assets/images/piment.png',{frameWidth: 134, frameHeight: 135});
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('tiles2', 'assets/tilesets/déco1.png');
        this.load.image('bite', 'assets/images/ciel2.png');
        //this.load.image('fondPNG', 'assets/images/fond.png');
        this.load.image('tiles3', 'assets/tilesets/fond.png');
        //this.load.image('tiles4', 'assets/tilesets/ciel.png');


        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
    }

    create() {
        this.backgroundImage = this.add.image(0, 0, 'bite').setOrigin(0, 0);
        this.backgroundImage.setScale(1, 1);
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('platformPack_tilesheet', 'tiles');
        const tileset2 = map.addTilesetImage('déco1', 'tiles2');
        const tileset3 = map.addTilesetImage('fond', 'tiles3');
        //const tileset4 = map.addTilesetImage('ciel', 'tiles4');

        //this.fond = map.createLayer('bleu', tileset4);
        this.fond = map.createLayer('planFond', tileset3);
        this.fond = map.createLayer('atmo1', tileset2);
        this.sol = map.createLayer('Sol2', tileset2);
        this.solo = map.createLayer('Sol3', tileset2);
        this.arriere = map.createLayer('plat', tileset2);
        this.platforms = map.createLayer('Sol', tileset);


        this.platforms.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = new Player(this)
        this.piment = new Piment(this, this.player)



        this.speed = {
            speedMultiple: 1,
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

        // Parallax

        this.backgroundImage.scrollFactorX=0;
        this.backgroundImage.scrollFactorY=0;

    }


    update() {
        this.cameras.main.centerOn(this.player.player.x + 300, 450, true);
        this.cameras.main.setRoundPixels(true);


        if (!this.piment.eatPiment) {
            this.player.player.setVelocityX(500)
        } else {
            this.player.player.setVelocityX(800)
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