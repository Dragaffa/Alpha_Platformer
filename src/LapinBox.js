class LapinBox{

        constructor(scene, lapin) {
            this.scene = scene
            this.lapin = lapin
            const map = this.scene.make.tilemap({key: 'map'});

            this.box = this.scene.physics.add.group({
                allowGravity: false,
                immovable: true
            });

            map.getObjectLayer('LapinBox').objects.forEach((box) => {
                this.boxSprite = this.scene.physics.add.sprite(box.x+(box.width*0.5), box.y+(box.height*0.5)).setSize(box.width, box.height);
                this.box.add(this.boxSprite)
                this.boxSprite.hauteurMax = box.properties[0].value;
                this.boxSprite.hauteurMin = box.properties[1].value;
            });

            this.scene.physics.add.overlap(this.lapin.player, this.box, this.tuch.bind(this))

        }

        tuch(lapin, box){

            let rand = Phaser.Math.Between(1,10);
            console.log(rand)
            if (lapin.x < this.scene.player.player.x){
                lapin.setVelocityY(-box.hauteurMax)
            }
            else if (rand >=5){
                if (lapin.body.onFloor()){
                    lapin.setVelocityY(-box.hauteurMax)
                }
            } else {
                if (lapin.body.onFloor()){
                    lapin.setVelocityY(-box.hauteurMin)
                }
            }

        }

}