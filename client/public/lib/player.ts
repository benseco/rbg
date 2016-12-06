/// <reference path="./base/BaseActor.ts" />
class Player extends BaseActor {
    cursors: Phaser.CursorKeys;

    Preload()
    {
        G.game.load.spritesheet('testplayer', '../res/sprite/testplayer.png',16,32);
    }

    Create()
    {
        let sprite = G.game.add.sprite(450, 80, 'testplayer');
        sprite.anchor.setTo(0.5, 0.5);
        G.game.physics.enable(sprite);
        arcb(sprite).collideWorldBounds = true;
        arcb(sprite).setSize(16,16,0,16);

        this.cursors = G.game.input.keyboard.createCursorKeys();

        sprite.animations.add('leftright',[2,3],5,true);
        sprite.animations.add('idlefront',[0]);
        sprite.animations.add('idleback',[1]);
        sprite.animations.add('forward',[4,5],5,true);
        sprite.animations.add('backward',[6,7],5,true);

        this.setMainSprite(sprite);
        G.game.camera.follow(this.mainSprite);

        
        //Temporary hack
        G.mainCollision.add(sprite)

    }

    Update()
    {
        
        this.mainSprite.scale.setTo(2,2);
        arcb(this.mainSprite).velocity.set(0,0);

        if (this.cursors.down.isDown || this.cursors.up.isDown || this.cursors.left.isDown || this.cursors.right.isDown)
        {
            if (this.cursors.left.isDown)
            {
                //this.playerSprite.angle = 180;
                //arcb(this.playerSprite).position.add(-5,0);
                arcb(this.mainSprite).velocity.add(-100,0);

                this.mainSprite.scale.setTo(-2,2);
                this.mainSprite.animations.play('leftright');
            }
            else if (this.cursors.right.isDown)
            {
                //this.playerSprite.angle = 0;
                //arcb(this.playerSprite).position.add(5,0);
                arcb(this.mainSprite).velocity.add(100,0);
                this.mainSprite.animations.play('leftright');
            }

            if (this.cursors.up.isDown)
            {
                //this.playerSprite.angle = 270;
                //arcb(this.playerSprite).position.add(0,-5);
                arcb(this.mainSprite).velocity.add(0,-100);
                if (!this.cursors.right.isDown && !this.cursors.left.isDown) this.mainSprite.animations.play('backward');
            }
            else if (this.cursors.down.isDown)
            {
                //this.playerSprite.angle = 90;
                //arcb(this.playerSprite).position.add(0,5);
                arcb(this.mainSprite).velocity.add(0,100);
                if (!this.cursors.right.isDown && !this.cursors.left.isDown) this.mainSprite.animations.play('forward');
            }

        }
        else
        {
            this.mainSprite.animations.play('idlefront');
        }

        arcb(this.mainSprite).velocity.normalize().multiply(200,200);
        
    }
    
    Render()
    {
        
    }
    
    Shutdown()
    {
        
    }

}