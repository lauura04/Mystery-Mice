class ControlsManager {
    constructor(){
        this.controls = {
            player1: {
                up: 'W',
                down: 'S',
                left: 'A',
                right: 'D',
                power: 'E',
                lastDirection: 'down',
            },
            player1: {
                up: 'UP',
                down: 'DOWN',
                left: 'LEFT',
                right: 'RIGHT',
                power: 'SPACE',
                lastDirection: 'down',
            },
        };
    }

    initializeControls(scene){
        this.controls.player1.keys = scene.input.keyboard.addKeys({
            up: this.controls.player1.up,
            down: this.controls.player1.down,
            left: this.controls.player1.left,
            right: this.controls.player1.right,
            power: this.controls.player1.power,
        });

        this.controls.player2.keys = scene.input.keyboard.addKeys({
            up: this.controls.player2.up,
            down: this.controls.player2.down,
            left: this.controls.player2.left,
            right: this.controls.player2.right,
            power: this.controls.player2.power,
        });
    }

    handlePlayerMovement(player, controls, playerKey) {
        let isMoving = false;

        player.setVelocity(0); // Detener movimiento al principio del frame

        if (controls.down.isDown) {
            player.setVelocityY(100);
            player.anims.play(`${playerkey}-walk-down`, true);
            lastDirection = 'down';
            isMoving = true;
        } else if (controls.up.isDown) {
            player.setVelocityY(-100);
            player.anims.play(`${playerkey}-walk-up`, true);
            lastDirection = 'up';
            isMoving = true;
        } else if (controls.left.isDown) {
            player.setVelocityX(-100);
            player.anims.play(`${playerkey}-walk-left`, true);
            lastDirection = 'left';
            isMoving = true;
        } else if (controls.right.isDown) {
            player.setVelocityX(100);
            player.anims.play(`${playerkey}-walk-right`, true);
            lastDirection = 'right';
            isMoving = true;
        }

        //Si no se mueve pone la animación de ilde
        if (!isMoving) {
            switch (controls.lastDirection) {
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
       
    }
}

export default ControlsManager;