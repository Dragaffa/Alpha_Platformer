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
        this.load.spritesheet('playerP','assets/images/courirP.png',{frameWidth: 118, frameHeight: 121});
        this.load.spritesheet('gliss','assets/images/glisse.png',{frameWidth: 118, frameHeight: 121});
        this.load.spritesheet('glissP','assets/images/glisseP.png',{frameWidth: 118, frameHeight: 121});
        this.load.spritesheet('lapinT','assets/images/LapinT.png',{frameWidth: 258, frameHeight: 281});
        this.load.spritesheet('tribunes','assets/images/tribune.png',{frameWidth: 1157, frameHeight: 736});

        this.load.spritesheet('piment','assets/images/piment.png',{frameWidth: 134, frameHeight: 135});
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('tiles2', 'assets/tilesets/déco1.png');
        this.load.image('truc', 'assets/images/ciel2.png');
        this.load.image('tiles3', 'assets/tilesets/fond.png');
        this.load.image('tiles4', 'assets/tilesets/vege.png');



        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');
    }

    create() {
        this.backgroundImage = this.add.image(0, 0, 'truc').setOrigin(0, 0);
        this.backgroundImage.setScale(1, 1);
        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('platformPack_tilesheet', 'tiles');
        const tileset2 = map.addTilesetImage('déco1', 'tiles2');
        const tileset4 = map.addTilesetImage('vege', 'tiles4');
        const tileset3 = map.addTilesetImage('fond', 'tiles3');

        this.montagne = map.createLayer('montagne', tileset3);
        this.fond = map.createLayer('planFond', tileset3);
        this.arbre2 = map.createLayer('arbre2', tileset4);
        this.arbre3 = map.createLayer('arbre3', tileset4);
        this.arbre1 = map.createLayer('arbre1', tileset4);
        this.atmo = map.createLayer('atmo1', tileset2);
        this.sol = map.createLayer('Sol2', tileset2);
        this.solo = map.createLayer('Sol3', tileset2);
        this.potoFin = map.createLayer('fin', tileset4);
        this.arriere = map.createLayer('plat', tileset2);
        this.platforms = map.createLayer('Sol', tileset);


        this.platforms.setCollisionByExclusion(-1, true);
        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = new Player(this)
        this.lapin = new Lapin(this)
        this.piment = new Piment(this, this.player)
        this.Gliss = new Glisse(this,this.player)
        this.lapinBox = new LapinBox(this,this.lapin)


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

        this.anims.create({
            key:'lapin',
            frames: this.anims.generateFrameNames('lapinT', {

                start: 0,
                end: 5,

            }),
            frameRate: 15,
            repeat: -1,
        });

        this.anims.create({
            key: 'jumpL',
            frames: [{key: 'lapinT', frame:3 }],
            frameRate: 10,
            repeat:-1,

        });

        // Parallax

        this.backgroundImage.scrollFactorX=0;
        this.backgroundImage.scrollFactorY=0;

        this.fond.scrollFactorX=0.3;
        this.montagne.scrollFactorX=0.2;
        this.arbre2.scrollFactorX=0.3;
        this.arbre3.scrollFactorX=0.3;


    }


    update() {
        this.cameras.main.centerOn(this.player.player.x + 300, 480, true);
        this.cameras.main.setRoundPixels(true);


        if (!this.piment.eatPiment) {
            this.player.player.setVelocityX(500)

            if(this.Gliss.glissIn){

            }
            else if (this.player.player.body.onFloor()  && !this.cursors.down.isDown) {
                this.player.player.play('walk', true)}
        } else {
            this.player.player.setVelocityX(800)
            if (this.player.player.body.onFloor() && !this.cursors.down.isDown) {
                this.player.player.play('run', true)}
        }



        switch (true) {
            case (this.cursors.up.isDown) && this.player.player.body.onFloor():
                this.player.jump()
                break;

        }

        if (this.cursors.down.isDown) {
            if (this.player.player.body.onFloor()) {
                if (this.flag) {

                } else {
                    this.glissade.play();
                    this.flag = true;

                    if (this.piment.eatPiment) {
                        this.player.player.anims.play('glissP')

                    } else {
                        this.player.player.anims.play('gliss')

                    }

                }
                this.player.player.body.setOffset(0, 82);
                this.player.player.body.setSize(this.player.player.sourceWidth, 40, false);
                if (!this.piment.eatPiment) {
                    this.player.player.setVelocityX(500 * this.speed.speedMultiple);
                } else {
                    this.player.player.setVelocityX(800 * this.speed.speedMultiple);
                }

            } else {
                this.player.player.setVelocityY(800);
            }
        }
        if (!this.cursors.down.isDown && !this.Gliss.isGliss){
            if (this.flag){
                this.player.player.body.setOffset(0,0);
                this.player.player.body.setSize( this.player.player.sourceWidth,  this.player.player.sourceHeight, true);
                this.glissade.stop();
                this.flag=false;
                this.Gliss.glissIn = false;
            }
        }

        if (this.Gliss.isGliss){
            this.Gliss.isGliss = false;
        }


        this.lapin.player.setVelocityX(600)
        if (this.lapin.player.body.onFloor()) {
            this.lapin.player.play('lapin',true);
        }
        else {
            this.lapin.player.play('jumpL',true);
        }




        if (this.player.player.x >= 25084 || this.lapin.player.x >= 25084){
            this.player.player.setVelocity(0,0);
            this.lapin.player.setVelocity(0,0);
            this.player.player.play('dance',true);
        }

}




}