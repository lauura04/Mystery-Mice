class ControlsManager {
    constructor() {
        this.controls = {
            keys: {
                up: 'W',
                down: 'S',
                left: 'A',
                right: 'D',
                power: 'E',

            },
            lastDirection: 'down',

        };
    }

    initializeControls(scene) {
        this.controls.keys = scene.input.keyboard.addKeys({
            up: this.controls.up,
            down: this.controls.down,
            left: this.controls.left,
            right: this.controls.right,
            power: this.controls.power,
        });

    }

    handlePlayerMovement(player, playerKey, updatePositionCallback) {
        let isMoving = false;

        player.setVelocity(0); // Detener movimiento al principio del frame

        if (controls.down.isDown) {
            player.setVelocityY(100);
            player.anims.play(`${playerkey}-walk-down`, true);
            this.controls.lastDirection = 'down';
            isMoving = true;
        } else if (controls.up.isDown) {
            player.setVelocityY(-100);
            player.anims.play(`${playerkey}-walk-up`, true);
            this.controls.lastDirection = 'up';
            isMoving = true;
        } else if (controls.left.isDown) {
            player.setVelocityX(-100);
            player.anims.play(`${playerkey}-walk-left`, true);
            this.controls.lastDirection = 'left';
            isMoving = true;
        } else if (controls.right.isDown) {
            player.setVelocityX(100);
            player.anims.play(`${playerkey}-walk-right`, true);
            this.controls.lastDirection = 'right';
            isMoving = true;
        }

        //Si no se mueve pone la animación de ilde
        if (!isMoving) {
            switch (this.controls.lastDirection) {
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
        if(isMoving){
            updatePositionCallback(player.x, player.y, playerKey);
        }

    }
}

export default ControlsManager;