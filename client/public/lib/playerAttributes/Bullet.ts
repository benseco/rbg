/// <reference path="../base/BaseActor.ts" />
class Bullet extends BaseActor {
    
    x: number;
    y: number;
    x0: number;
    x1: number;
    y0: number;
    y1: number;

    constructor(x: number, y: number) {
        super();
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
        let sprite = G.getSprite('bullet', this.x, this.y);
        //sprite.anchor.setTo(0.5, 0.5);
        G.game.physics.p2.enable(sprite);
        //p2b(sprite).collideWorldBounds = true;
        p2b(sprite).setRectangle(4,4,0,0);
        p2b(sprite).fixedRotation = true;

        
        (p2b(sprite).data as any).ccdSpeedThreshold = 0;
		(p2b(sprite).data as any).ccdIterations = 10;
        
        p2b(sprite).setCollisionGroup(G.allyFire);
        p2b(sprite).collides(G.enemyHitboxes);

        // sprite.animations.add('leftright',[2,3],5,true);
        // sprite.animations.add('idlefront',[0]);
        // sprite.animations.add('idleback',[1]);
        // sprite.animations.add('forward',[4,5],5,true);
        // sprite.animations.add('backward',[6,7],5,true);

        this.setMainSprite(sprite);
        this.mainSprite.scale.setTo(2,2);
        p2b(this.mainSprite).thrust(100000);
        //G.game.physics.arcade.moveToPointer(this.mainSprite, 400);
        // arcb(this.mainSprite).velocity.normalize().multiply(400,400);


        //Temporary hack
        //G.allyFire.add(sprite);
        // G.mainCollision.add(sprite);
        
        //blocked: potential bug with collideSpriteVsTilemapLayer()
        this.mainSprite.body.onCollide = new Phaser.Signal();
        this.mainSprite.body.onCollide.add(this.onCollide, this);

    }

    onCollide()
    {
        G.killSprite(this.mainSprite);
        this.destroy();
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