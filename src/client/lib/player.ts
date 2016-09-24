/**
 * Player file
 */

class Player {
    playerSprite: Phaser.Sprite;

    constructor(game: Phaser.Game) {
        this.playerSprite = new Phaser.Sprite(game, 450, 80);
        this.playerSprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.playerSprite);
        (this.playerSprite.body as Phaser.Physics.Arcade.Body).collideWorldBounds = true;
    }

    update(cursors: Phaser.CursorKeys) {
        if (cursors.left.isDown)
        {
            this.playerSprite.angle = 180;
            (this.playerSprite.body as Phaser.Physics.Arcade.Body).position.add(-5,0);
            //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(-100,0);
        }
        else if (cursors.right.isDown)
        {
            this.playerSprite.angle = 0;
            (this.playerSprite.body as Phaser.Physics.Arcade.Body).position.add(5,0);
            //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(100,0);
        }

        if (cursors.up.isDown)
        {
            this.playerSprite.angle = 270;
            (this.playerSprite.body as Phaser.Physics.Arcade.Body).position.add(0,-5);
            //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(0,-100);
        }
        else if (cursors.down.isDown)
        {
            this.playerSprite.angle = 90;
            (this.playerSprite.body as Phaser.Physics.Arcade.Body).position.add(0,5);
            //(this.sprite.body as Phaser.Physics.Arcade.Body).velocity.set(0,100);
        }
    }
}