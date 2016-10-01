/**
 * Player file
 */

class Player {
    playerSprite: Phaser.Sprite;
    cursors: Phaser.CursorKeys;

    constructor(game: Phaser.Game, cursors: Phaser.CursorKeys) {
        this.playerSprite = new Phaser.Sprite(game, 450, 80, 'testplayer');
        this.playerSprite.anchor.setTo(0.5, 0.5);
        game.physics.enable(this.playerSprite);
        arcb(this.playerSprite).collideWorldBounds = true;

        this.cursors = cursors;

        this.playerSprite.animations.add('leftright',[2,3],5,true);
        this.playerSprite.animations.add('idlefront',[2,3],5,true);
        this.playerSprite.animations.add('idlefront',[0]);
        this.playerSprite.animations.add('idleback',[1]);
        this.playerSprite.animations.add('forward',[4,5],5,true);
        this.playerSprite.animations.add('backward',[6,7],5,true);

        
        SimpleGame.subscribers.push(this);
    }

    update() {
        
        this.playerSprite.scale.setTo(2,2);
        arcb(this.playerSprite).velocity.set(0,0);

        if (this.cursors.down.isDown || this.cursors.up.isDown || this.cursors.left.isDown || this.cursors.right.isDown)
        {
            if (this.cursors.left.isDown)
            {
                //this.playerSprite.angle = 180;
                //arcb(this.playerSprite).position.add(-5,0);
                arcb(this.playerSprite).velocity.add(-100,0);

                this.playerSprite.scale.setTo(-2,2);
                this.playerSprite.animations.play('leftright');
            }
            else if (this.cursors.right.isDown)
            {
                //this.playerSprite.angle = 0;
                //arcb(this.playerSprite).position.add(5,0);
                arcb(this.playerSprite).velocity.add(100,0);
                this.playerSprite.animations.play('leftright');
            }

            if (this.cursors.up.isDown)
            {
                //this.playerSprite.angle = 270;
                //arcb(this.playerSprite).position.add(0,-5);
                arcb(this.playerSprite).velocity.add(0,-100);
                if (!this.cursors.right.isDown && !this.cursors.left.isDown) this.playerSprite.animations.play('backward');
            }
            else if (this.cursors.down.isDown)
            {
                //this.playerSprite.angle = 90;
                //arcb(this.playerSprite).position.add(0,5);
                arcb(this.playerSprite).velocity.add(0,100);
                if (!this.cursors.right.isDown && !this.cursors.left.isDown) this.playerSprite.animations.play('forward');
            }

        }
        else
        {
            this.playerSprite.animations.play('idlefront');
        }

        arcb(this.playerSprite).velocity.normalize().multiply(200,200);
    }
}