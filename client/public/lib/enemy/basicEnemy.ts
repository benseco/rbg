/// <reference path="../base/BaseActor.ts" />
class BasicEnemy extends BaseActor {
    
    Preload()
    {
        G.game.load.spritesheet('basicenemy', '../res/sprite/testplayer.png',16,25);
    }

    Create()
    {
        let sprite = G.getSprite('basicenemy', 300, 80);
        sprite.anchor.setTo(0.5, 0.5);
        G.game.physics.enable(sprite);
        arcb(sprite).collideWorldBounds = true;
        arcb(sprite).setSize(16,16,0,16);
        arcb(sprite).mass = 5;

        sprite.animations.add('leftright',[2,3],5,true);
        sprite.animations.add('idlefront',[0]);
        sprite.animations.add('idleback',[1]);
        sprite.animations.add('forward',[4,5],5,true);
        sprite.animations.add('backward',[6,7],5,true);

        this.setMainSprite(sprite);

        
        //Temporary hack
        G.physicCollision.add(sprite)
        
    }

    Update()
    {
        this.mainSprite.scale.setTo(2,2);
        //arcb(this.mainSprite).velocity.set(0,0);

        //G.game.physics.arcade.moveToObject(this.mainSprite, G.player.mainSprite, 50)

        /*
        if (Math.random() > 0.8)
        {
            if (Math.random() > 0.8)
            {
                //this.playerSprite.angle = 180;
                //arcb(this.playerSprite).position.add(-5,0);
                arcb(this.mainSprite).velocity.add(-50,0);
                this.mainSprite.scale.setTo(-2,2);
                this.mainSprite.animations.play('leftright');
            }
            else if (Math.random() <= 0.3)
            {
                //this.playerSprite.angle = 0;
                //arcb(this.playerSprite).position.add(5,0);
                arcb(this.mainSprite).velocity.add(50,0);
                this.mainSprite.animations.play('leftright');
            }

            if (Math.random() > 0.8)
            {
                //this.playerSprite.angle = 270;
                //arcb(this.playerSprite).position.add(0,-5);
                arcb(this.mainSprite).velocity.add(0,-50);
                this.mainSprite.animations.play('backward');
            }
            else if (Math.random() <= 0.3)
            {
                //this.playerSprite.angle = 90;
                //arcb(this.playerSprite).position.add(0,5);
                arcb(this.mainSprite).velocity.add(0,50);
                this.mainSprite.animations.play('forward');
            }

        }
        else
        {
            this.mainSprite.animations.play('idlefront');
        }
        */

        // arcb(this.mainSprite).velocity.normalize().multiply(200,200);
        
    }
    
    Render()
    {
        
    }
    
    Shutdown()
    {
        
    }

}