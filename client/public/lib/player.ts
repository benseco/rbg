/// <reference path="./base/BaseActor.ts" />
class Player extends BaseActor {
    cursors: Phaser.CursorKeys;
    isShooting: boolean;

    weaponSystem: MainWeapon;

    speed: number = 400; // double what you want

    constructor()
    {
        super();
        //this.weaponSystem = new MainWeapon();
    }

    Preload()
    {
        G.game.load.spritesheet('testplayer', '../res/sprite/testplayer.png',16,32);
        G.game.load.image('bullet', '../res/sprite/bullet.png');
    }

    Create()
    {
        let sprite = G.getSprite('testplayer', 250, 80);
        G.game.physics.p2.enable(sprite, true);
        //p2b(sprite).collideWorldBounds = true;
        p2b(sprite).setCircle(16);
        //p2b(sprite).offset = new Phaser.Point(0,-16);
        //p2b(sprite).updateCollisionMask();
        p2b(sprite).mass = 200;
        p2b(sprite).fixedRotation = true;
        p2b(sprite).damping = 0.999;

        (p2b(sprite).data as any).ccdSpeedThreshold = 0;
		(p2b(sprite).data as any).ccdIterations = 10;

        p2b(sprite).setCollisionGroup(G.physicCollision);
        p2b(sprite).collides(G.physicCollision);

        this.hitbox = G.getSprite();
        this.hitbox.width = 8;
        this.hitbox.height = 80;

        G.game.physics.p2.enable(this.hitbox, true);
        p2b(this.hitbox).fixedRotation = true;
        p2b(this.hitbox).mass = 200;
        p2b(this.hitbox).x = sprite.x;
        p2b(this.hitbox).y = sprite.y;

        p2b(this.hitbox).setCollisionGroup(G.enemyHitboxes);
        p2b(this.hitbox).collides(G.allyFire);
        
        G.game.physics.p2.createLockConstraint(sprite, this.hitbox);
        //G.game.physics.p2.createRevoluteConstraint(sprite, [0, 0], this.hitbox, [0, 0]);

        //THIN BOX
        let thinbox = G.getSprite();
        thinbox.width = 600;
        thinbox.height = 10;
        thinbox.x = 20;
        thinbox.y = 400;
        
        G.game.physics.p2.enable(thinbox, true);
        p2b(thinbox).fixedRotation = true;
        p2b(thinbox).static = true;

        p2b(thinbox).setCollisionGroup(G.enemyHitboxes);
        p2b(thinbox).collides(G.allyFire);
        //END THIN BOX




        this.cursors = G.game.input.keyboard.createCursorKeys();

        sprite.animations.add('leftright',[2,3],5,true);
        sprite.animations.add('idlefront',[0]);
        sprite.animations.add('idleback',[1]);
        sprite.animations.add('forward',[4,5],5,true);
        sprite.animations.add('backward',[6,7],5,true);

        this.setMainSprite(sprite);
        G.game.camera.follow(this.mainSprite);

        this.isShooting = false;

    }

    hitbox: Phaser.Sprite;

    Update()
    {
        this.tryMove();

        this.tryShoot();
        
    }
    
    Render()
    {
        //G.game.debug.text("Wind: " + this.wind, 32, 64, 'rgb(255,255,255)');
        //G.game.debug.text("Vx: " + (p2b(this.mainSprite).velocity.x * p2b(this.mainSprite).velocity.x > 1 ? p2b(this.mainSprite).velocity.x : 0), 32, 140, 'rgb(255,255,255)');
        //G.game.debug.text("Vy: " + (p2b(this.mainSprite).velocity.y * p2b(this.mainSprite).velocity.y > 1 ? p2b(this.mainSprite).velocity.y : 0), 32, 160, 'rgb(255,255,255)');


        //G.game.debug.spriteBounds(this.hitbox);
    }
    
    Shutdown()
    {
        
    }

    tryMove()
    {
        this.mainSprite.scale.setTo(2,2);
        
        if (G.game.input.keyboard.isDown(Phaser.Keyboard.S) || G.game.input.keyboard.isDown(Phaser.Keyboard.W) ||
             G.game.input.keyboard.isDown(Phaser.Keyboard.A) || G.game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            if (G.game.input.keyboard.isDown(Phaser.Keyboard.A))
            {
                p2b(this.mainSprite).thrustLeft(2000 * p2b(this.mainSprite).mass);

                this.mainSprite.scale.setTo(-2,2);
                this.mainSprite.animations.play('leftright');
            }
            else if (G.game.input.keyboard.isDown(Phaser.Keyboard.D))
            {
                p2b(this.mainSprite).thrustRight(2000 * p2b(this.mainSprite).mass);

                this.mainSprite.animations.play('leftright');
            }

            if (G.game.input.keyboard.isDown(Phaser.Keyboard.W))
            {
                p2b(this.mainSprite).thrust(2000 * p2b(this.mainSprite).mass);

                if (!G.game.input.keyboard.isDown(Phaser.Keyboard.D) && !G.game.input.keyboard.isDown(Phaser.Keyboard.A)) this.mainSprite.animations.play('backward');
            }
            else if (G.game.input.keyboard.isDown(Phaser.Keyboard.S))
            {
                p2b(this.mainSprite).reverse(2000 * p2b(this.mainSprite).mass);

                if (!G.game.input.keyboard.isDown(Phaser.Keyboard.D) && !G.game.input.keyboard.isDown(Phaser.Keyboard.A)) this.mainSprite.animations.play('forward');
            }
        }
        else
        {
            this.mainSprite.animations.play('idlefront');
        }

        if (G.game.input.keyboard.isDown(Phaser.Keyboard.P))
        {
            p2b(this.mainSprite).thrustLeft(2000 * p2b(this.mainSprite).mass);
        }
    }

    // tryMove()
    // {
    //     this.mainSprite.scale.setTo(2,2);

    //     if (G.game.input.keyboard.isDown(Phaser.Keyboard.S) || G.game.input.keyboard.isDown(Phaser.Keyboard.W) ||
    //          G.game.input.keyboard.isDown(Phaser.Keyboard.A) || G.game.input.keyboard.isDown(Phaser.Keyboard.D))
    //     {
    //         let direction: Phaser.Point = new Phaser.Point();
    //         if (G.game.input.keyboard.isDown(Phaser.Keyboard.A))
    //         {
    //             direction.add(-1,0);

    //             this.mainSprite.scale.setTo(-2,2);
    //             this.mainSprite.animations.play('leftright');
    //         }
    //         else if (G.game.input.keyboard.isDown(Phaser.Keyboard.D))
    //         {
    //             direction.add(1,0);

    //             this.mainSprite.animations.play('leftright');
    //         }

    //         if (G.game.input.keyboard.isDown(Phaser.Keyboard.W))
    //         {
    //             direction.add(0,-1);
                
    //             if (!G.game.input.keyboard.isDown(Phaser.Keyboard.D) && !G.game.input.keyboard.isDown(Phaser.Keyboard.A)) this.mainSprite.animations.play('backward');
    //         }
    //         else if (G.game.input.keyboard.isDown(Phaser.Keyboard.S))
    //         {
    //             direction.add(0,1);

    //             if (!G.game.input.keyboard.isDown(Phaser.Keyboard.D) && !G.game.input.keyboard.isDown(Phaser.Keyboard.A)) this.mainSprite.animations.play('forward');
    //         }

    //         direction.normalize().multiply(this.speed, this.speed);
    //         p2b(this.mainSprite).velocity.x += ((direction.x - p2b(this.mainSprite).velocity.x) / (this.speed * .001)) * G.game.time.physicsElapsed;
    //         p2b(this.mainSprite).velocity.y += ((direction.y - p2b(this.mainSprite).velocity.y) / (this.speed * .001)) * G.game.time.physicsElapsed;


    //     }
    //     else
    //     {
    //         this.mainSprite.animations.play('idlefront');
    //     }

    //     //this.drag();

    //     //arcb(this.mainSprite).velocity.multiply(.9,.9);
    //     //arcb(this.mainSprite).acceleration.multiply(.5,.5);

    //     /*
    //     //TESTING WIND
        
    //     if (G.game.input.keyboard.isDown(Phaser.Keyboard.M)) this.wind = !this.wind;
    //     if (this.wind)
    //     {
    //         this.applyForce(new Phaser.Point(0,-1500));
    //     }

    //     //TESTING INSTANTANEOUS FORCES
    //     if (G.game.input.keyboard.isDown(Phaser.Keyboard.P))
    //     {
    //         console.log("PUSHED");
    //         this.applyForce(new Phaser.Point(0,20000));
    //     }
    //     */
    // }

    // wind: boolean = false;

    tryShoot()
    {
        if(G.game.input.activePointer.leftButton.isDown)
        {
            if(!this.isShooting)
            {
                //for (let i=0; i<50; i++)
                new Bullet(this.mainSprite.x, this.mainSprite.y);
                this.isShooting = true;
            }
        }
        else if (this.isShooting)
        {
            this.isShooting = false;
        }
    }

}