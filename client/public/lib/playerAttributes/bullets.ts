/// <reference path="../base/BaseActor.ts" />
class Bullet extends BaseActor {
    
    x: number;
    y: number;
    x0: number;
    x1: number;
    y0: number;
    y1: number;

    constructor(x: number, y: number) {
        super(null);
        this.x = x;
        this.y = y;
        this.Preload();
        this.Create();
    }


    Preload()
    {
        // G.game.load.spritesheet('bullets', '../../res/sprite/testplayer.png',2,2);
    }

    Create()
    {
        let sprite = G.game.add.sprite(this.x, this.y, 'basicenemy');
        sprite.anchor.setTo(0.5, 0.5);
        G.game.physics.enable(sprite);
        arcb(sprite).collideWorldBounds = true;
        arcb(sprite).setSize(2,2,0,2);

        // sprite.animations.add('leftright',[2,3],5,true);
        // sprite.animations.add('idlefront',[0]);
        // sprite.animations.add('idleback',[1]);
        // sprite.animations.add('forward',[4,5],5,true);
        // sprite.animations.add('backward',[6,7],5,true);

        this.setMainSprite(sprite);
        this.mainSprite.scale.setTo(2,2);
        // arcb(this.mainSprite).velocity.set(this.x1 - this.x0, this.y1 - this.y0);
        G.game.physics.arcade.moveToPointer(this.mainSprite, 400);
        // arcb(this.mainSprite).velocity.normalize().multiply(400,400);


        //Temporary hack
        G.friendlyFireCollision.add(sprite);
        // G.mainCollision.add(sprite);
        
        //blocked: potential bug with collideSpriteVsTilemapLayer()
        this.mainSprite.body.onCollide = new Phaser.Signal();
        this.mainSprite.body.onCollide.add(this.Destroy, this);

    }

    Destroy()
    {
        this.mainSprite.kill();
    }

    Update()
    {

        // G.game.physics.arcade.moveToObject(this.mainSprite, this.player.mainSprite, 100)

        

        // if (Math.random() > 0.8)
        // {
        //     if (Math.random() > 0.8)
        //     {
        //         //this.playerSprite.angle = 180;
        //         //arcb(this.playerSprite).position.add(-5,0);
        //         arcb(this.mainSprite).velocity.add(-50,0);
        //         this.mainSprite.scale.setTo(-2,2);
        //         this.mainSprite.animations.play('leftright');
        //     }
        //     else if (Math.random() <= 0.3)
        //     {
        //         //this.playerSprite.angle = 0;
        //         //arcb(this.playerSprite).position.add(5,0);
        //         arcb(this.mainSprite).velocity.add(50,0);
        //         this.mainSprite.animations.play('leftright');
        //     }

        //     if (Math.random() > 0.8)
        //     {
        //         //this.playerSprite.angle = 270;
        //         //arcb(this.playerSprite).position.add(0,-5);
        //         arcb(this.mainSprite).velocity.add(0,-50);
        //         this.mainSprite.animations.play('backward');
        //     }
        //     else if (Math.random() <= 0.3)
        //     {
        //         //this.playerSprite.angle = 90;
        //         //arcb(this.playerSprite).position.add(0,5);
        //         arcb(this.mainSprite).velocity.add(0,50);
        //         this.mainSprite.animations.play('forward');
        //     }

        // }
        // else
        // {
        //     this.mainSprite.animations.play('idlefront');
        // }

        // arcb(this.mainSprite).velocity.normalize().multiply(200,200);
        
    }
    
    Render()
    {
        
    }
    
    Shutdown()
    {
        
    }

}