/// <reference path="./base/BaseActor.ts" />
class Player extends BaseActor {
    cursors: Phaser.CursorKeys;
    isShooting: boolean;
    bullets: number;
    hitbox: Phaser.Physics.Box2D.Body;
    weaponSystem: MainWeapon;
    speed: number = 400; // double what you want

    constructor()
    {
        super();
        //this.weaponSystem = new MainWeapon();
        this.bullets = 0;
    }

    Preload()
    {
        G.game.load.spritesheet('testplayer', '../res/sprite/testplayer.png',16,32);
        G.game.load.image('bullet', '../res/sprite/bullet.png');
    }

    Create()
    {
        let sprite = G.getSprite('testplayer', 250, 600);
        G.game.physics.box2d.enable(sprite, true);
        b2d(sprite).setCircle(16,0,20);
        // b2d(sprite).clearShapes();
        // b2d(sprite).loadPolygon(null,[{shape: [0,0,20,0,20,20,0,10]}] as any)
        //b2d(sprite).offset = new Phaser.Point(0,-16);
        b2d(sprite).mass = 1;
        b2d(sprite).fixedRotation = true;
        b2d(sprite).linearDamping = 10;
        b2d(sprite).setCollisionCategory(0b000010); //Physic
        b2d(sprite).setCollisionMask(0b000011); //Physic and walls

        this.hitbox = new Phaser.Physics.Box2D.Body(G.game, null, sprite.x, sprite.y);
        this.hitbox.setRectangle(10,50,0,-5)
        //this.hitbox.fixedRotation = true;
        this.hitbox.setCollisionCategory(0b000100); //Ally Hit
        this.hitbox.setCollisionMask(0b100000); //Enemy fire only
        G.game.physics.box2d.weldJoint(sprite, this.hitbox);

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

    Update()
    {
        this.tryMove();

        this.tryShoot();
        
    }
    
    frame: number = 0;
    Render()
    {
        //G.game.debug.text("Wind: " + this.wind, 32, 64, 'rgb(255,255,255)');
        //G.game.debug.text("Vx: " + (p2b(this.mainSprite).velocity.x * p2b(this.mainSprite).velocity.x > 1 ? p2b(this.mainSprite).velocity.x : 0), 32, 140, 'rgb(255,255,255)');
        //G.game.debug.text("Vy: " + (p2b(this.mainSprite).velocity.y * p2b(this.mainSprite).velocity.y > 1 ? p2b(this.mainSprite).velocity.y : 0), 32, 160, 'rgb(255,255,255)');


        //G.game.debug.spriteBounds(this.hitbox);

        if (this.frame % 60 == 0)
            G.game.debug.text("Bullets: " + this.bullets, 32, 64, 'rgb(255,255,255)');
        this.frame += 1;

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
                this.thrustDirectional(200000*G.game.time.physicsElapsed,1,0);

                this.mainSprite.scale.setTo(-2,2);
                this.mainSprite.animations.play('leftright');
            }
            else if (G.game.input.keyboard.isDown(Phaser.Keyboard.D))
            {
                this.thrustDirectional(200000*G.game.time.physicsElapsed,-1,0);

                this.mainSprite.animations.play('leftright');
            }

            if (G.game.input.keyboard.isDown(Phaser.Keyboard.W))
            {
                b2d(this.mainSprite).thrust(200000*G.game.time.physicsElapsed);

                if (!G.game.input.keyboard.isDown(Phaser.Keyboard.D) && !G.game.input.keyboard.isDown(Phaser.Keyboard.A)) this.mainSprite.animations.play('backward');
            }
            else if (G.game.input.keyboard.isDown(Phaser.Keyboard.S))
            {
                b2d(this.mainSprite).reverse(200000*G.game.time.physicsElapsed);

                if (!G.game.input.keyboard.isDown(Phaser.Keyboard.D) && !G.game.input.keyboard.isDown(Phaser.Keyboard.A)) this.mainSprite.animations.play('forward');
            }
        }
        else
        {
            this.mainSprite.animations.play('idlefront');
        }

        if (G.game.input.keyboard.isDown(Phaser.Keyboard.P))
        {
            b2d(this.mainSprite).thrust(2000 * b2d(this.mainSprite).mass);
        }
    }

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
                this.bullets += 1;
            }
        }
        else if (this.isShooting)
        {
            this.isShooting = false;
        }
    }

}