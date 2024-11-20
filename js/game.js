class GameScene extends Phaser.Scene{
    constructor(){
        super({key: 'GameScene'});
    }

    preload(){
        this.load.spritesheet('Sighttail', 'assets/Sightail_spritesheet.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet('Scentpaw', 'assets/Scentpaw-spritesheet.png', {
            frameWidth: 64,
            frameHeight: 64
        });
    }
    // tutorial mostrar movimiento, ver poderes -> entrar en la cripta 
    // juego

    create(){
        //variables para meter las imagenes a posteriori
        const centerX = this.scale.width/2;
        const centerY = this.scale.height/2;
        
        // variables referentes a sighttail y su movimiento
        this.sighttail = this.add.sprite(0.5*centerX,0.5*centerY, 'Sighttail');
        this.sighttail.setScale(2);

        //variables referentes a scentpaw y su movimiento
        this.scentpaw = this.add.sprite(centerX, 0.5*centerY, 'Scentpaw');
        this.scentpaw.setScale(2);

        // crear las animaciones para los dos
        this.createAnimations('Sighttail');
        this.createAnimations('Scentpaw');


        

        // definir el control del movimiento para cada uno de los personajes
        this.controls1 = this.input.keyboard.addKeys({
            up:'W',
            down: 'S',
            left: 'A',
            right: 'D',
        });

        this.controls2 = this.input.keyboard.createCursorKeys();

        this.lastDirection1 = null;
        this.lastDirection2 = null;
    }
    
    // funcion para controlar el movimiento y no tener que poner codigo duplicado
    createAnimations(playerkey){
        this.anims.create({
            key: `${playerkey}-idleUp`,
            frames: this.anims.generateFrameNumbers(playerkey, {start: 0, end: 4}),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: `${playerkey}-idleLeft`,
            frames: this.anims.generateFrameNumbers(playerkey, {start: 13, end:17}),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: `${playerkey}-idleDown`,
            frames: this.anims.generateFrameNumbers(playerkey, {start: 26, end:30}),
            frameRate: 8,
            repeat: -1,
        });
        
        this.anims.create({
            key: `${playerkey}-idleRight`,
            frames: this.anims.generateFrameNumbers(playerkey, {start: 39, end:43}),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: `${playerkey}-walk-up`,
            frames: this.anims.generateFrameNumbers(playerkey, {start: 104, end: 112}),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: `${playerkey}-walk-down`,
            frames: this.anims.generateFrameNumbers(playerkey, {start: 130, end: 138}),
            frameRate: 10,
            repeat: -1,
        });        

        this.anims.create({
            key: `${playerkey}-walk-left`,
            frames: this.anims.generateFrameNumbers(playerkey, {start: 117, end: 125}),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: `${playerkey}-walk-right`,
            frames: this.anims.generateFrameNumbers(playerkey, {start: 143, end: 151}),
            frameRate: 10,
            repeat: -1,
        });
    }
    

    //hacer diferenciación entre sighttail y scentpaw
    update(){
        this.lastDirection1 = this.handlePlayerMovement(this.sighttail, this.controls1, 'Sighttail', this.lastDirection1);
        this.lastDirection2 = this.handlePlayerMovement(this.scentpaw, this.controls2, 'Scentpaw', this.lastDirection2);
       
    }

    handlePlayerMovement(player, controls, playerkey, lastDirection){
        let isMoving = false;

        if(controls.down.isDown){
            player.y+=2;
            player.anims.play(`${playerkey}-walk-down`,true);
            lastDirection = 'down';
            isMoving = true;
        }

        else if(controls.up.isDown){
            player.y -=2;
            player.anims.play(`${playerkey}-walk-up`, true);
            lastDirection = 'up';
            isMoving = true;
        }

        else if(controls.left.isDown){
            player.x-=2;
            player.anims.play(`${playerkey}-walk-left`,true);
            lastDirection = 'left';
            isMoving = true;
        }

        else if(controls.right.isDown){
            player.x+=2;
            player.anims.play(`${playerkey}-walk-right`,true);
            lastDirection = 'right';
            isMoving = true;
        }     


        if(!isMoving){
            
            switch (lastDirection) {
                case 'down':
                    player.anims.play(`${playerkey}-idleDown`, true);
                    break;
                case 'up':
                    player.anims.play(`${playerkey}-idleUp`, true);
                    break;
                case 'left':
                    player.anims.play(`${playerkey}-idleLeft`, true);
                    break;
                case 'right':
                    player.anims.play(`${playerkey}-idleRight`, true);
                    break;
           
        }
    }
    return lastDirection;
}


}
