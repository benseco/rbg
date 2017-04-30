/// <reference path="../base/BaseInteracts.ts" />
class BasicEnemy extends BaseInteracts {
    hitbox: Phaser.Physics.Box2D.Body;

    Preload()
    {
        G.game.load.spritesheet('basicenemy', '../res/sprite/testplayer.png',12,26);
        this.hitPoints = 50;
    }

    Create()
    {
        let sprite = G.getSprite('basicenemy', 300, 600);
        G.game.physics.box2d.enable(sprite, true);
        b2d(sprite).collideWorldBounds = true;
        b2d(sprite).setCircle(12);
        b2d(sprite).mass = 15;
        b2d(sprite).static = true;

        b2d(sprite).setCollisionCategory(0b000010); //Physic
        b2d(sprite).setCollisionMask(0b010011); //Physic and walls

        this.hitbox = new Phaser.Physics.Box2D.Body(G.game, null, sprite.x, sprite.y);
        this.hitbox.setRectangle(10,50,0,-26);
        this.hitbox.mass = 15;
        this.hitbox.setCollisionCategory(0b010000); //Enemy hit
        this.hitbox.setCollisionMask(0b001000); //Enemy fire, enemy hit?, physic, and walls
        G.game.physics.box2d.weldJoint(sprite, this.hitbox);

        sprite.animations.add('leftright',[2,3],5,true);
        sprite.animations.add('idlefront',[0]);
        sprite.animations.add('idleback',[1]);
        sprite.animations.add('forward',[4,5],5,true);
        sprite.animations.add('backward',[6,7],5,true);

        this.setMainSprite(sprite);

        this.mainSprite.anchor.set(0.5,1);
        this.mainSprite.scale.setTo(2,2);

        encase(this.hitbox, this);
        
    }

    Update()
    {
        // if (this.hitPoints < 1){
        //     this.destroy();
        // }
        //this.mainSprite.scale.setTo(2,2);
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
        // if (this.floatingDamage && this.floatingDamage.alive)
        // G.game.debug.spriteBounds(this.floatingDamage);
    }
    
    Shutdown()
    {
        
    }

    OnInteract()
    {
        this.mainSprite.animations.play('forward');
        new Dialogue();
    }

    floatingDamage: Phaser.Text;

    damage(amount: number)
    {
        this.floatingDamage = G.game.add.text(0,-this.mainSprite.height / this.mainSprite.scale.y,""+amount,{ font: "8px Arial", fill: "#ffffff" });
        this.mainSprite.addChild(this.floatingDamage);
        let tween = G.game.add.tween(this.floatingDamage).to({alpha: 0, y: this.floatingDamage.y - 20},250,"Linear",true);
        tween.onComplete.add(this.floatingDamage.destroy,this.floatingDamage);
        tween.onComplete.add(function(){this.floatingDamage = null;});

        this.hitPoints -= amount;
        if (this.hitPoints <= 0)
        {
            this.kill()
        }
    }

    kill()
    {
        this.hitbox.kill()
        b2d(this.mainSprite).kill()
        this.mainSprite.kill();
    }

}