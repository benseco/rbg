/**
 * Player file
 */

class Player {
    playerSprite: Phaser.Sprite;
    cursors: Phaser.CursorKeys;

    constructor(game: Phaser.Game, cursors: Phaser.CursorKeys) {
        this.playerSprite = new Phaser.Sprite(game, 450, 80, 'car');
        this.playerSprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.playerSprite);
        arcb(this.playerSprite).collideWorldBounds = true;

        this.cursors = cursors;

        
        SimpleGame.subscribers.push(this);
    }

    update() {
        if (this.cursors.left.isDown)
        {
            this.playerSprite.angle = 180;
            arcb(this.playerSprite).position.add(-5,0);
            //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(-100,0);
        }
        else if (this.cursors.right.isDown)
        {
            this.playerSprite.angle = 0;
            arcb(this.playerSprite).position.add(5,0);
            //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(100,0);
        }

        if (this.cursors.up.isDown)
        {
            this.playerSprite.angle = 270;
            arcb(this.playerSprite).position.add(0,-5);
            //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(0,-100);
        }
        else if (this.cursors.down.isDown)
        {
            this.playerSprite.angle = 90;
            arcb(this.playerSprite).position.add(0,5);
            //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(0,100);
        }
    }
}