class Start extends Phaser.Scene {

    constructor() {
        super('start');
    }

    preload() {
        this.load.image('menu', 'assets/images/menu.png');
        this.load.image('bouton', 'assets/images/bouton.png');

    }

    create(){
        const menu = this.add.image(0, 0, 'menu').setOrigin(0, 0);

        const buttonStartSprite = this.add.image(800, 450, 'bouton')
            .setOrigin(0, 0)
            .setScale(0.7)
            .setAlpha(0.7);

        this.buttonStart = this.add.rectangle(buttonStartSprite.x, buttonStartSprite.y,350,150,0xffffff,0)
            .setOrigin(0,0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {
                this.scene.start('game')
            })
            .on('pointerover',function(){
                buttonStartSprite.setAlpha(1);
            })
            .on('pointerout',function(){
                buttonStartSprite.setAlpha(0.7);
            })
    }

}


