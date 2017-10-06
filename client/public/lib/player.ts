/// <reference path="./base/BaseActor.ts" />
class Player extends BaseActor {
    cursors: Phaser.CursorKeys;
    hitbox: Phaser.Physics.Box2D.Body;
    weaponSystem: MainWeapon;
    speed: number = 400; // double what you want
    facingForward: boolean = true;
    lastDirection: string = '';

    constructor()
    {
        super();
        this.weaponSystem = new MainWeapon();
    }

    Preload()
    {
        // G.game.load.spritesheet('maintest', '../res/sprite/maintest.png',32,55);
        G.game.load.spritesheet('flower', '../res/sprite/flower.png',18,33,52);
        G.game.load.image('bullet', '../res/sprite/bullet.png');
    }

    Create()
    {
        // let sprite = G.getSprite('maintest', 250, 600);
        let sprite = G.getSprite('flower', 250, 600);
        G.game.physics.box2d.enable(sprite, true);
        b2d(sprite).setCircle(12);
        // b2d(sprite).clearShapes();
        // b2d(sprite).loadPolygon(null,[{shape: [0,0,20,0,20,20,0,10]}] as any)
        //b2d(sprite).offset = new Phaser.Point(0,-16);
        b2d(sprite).mass = 1;
        b2d(sprite).fixedRotation = true;
        b2d(sprite).linearDamping = 15;
        b2d(sprite).setCollisionCategory(0b000010); //Physic
        b2d(sprite).setCollisionMask(0b000011); //Physic and walls

        this.hitbox = new Phaser.Physics.Box2D.Body(G.game, null, sprite.x, sprite.y);
        this.hitbox.setRectangle(10,50,0,-26);
        //this.hitbox.fixedRotation = true;
        this.hitbox.setCollisionCategory(0b000100); //Ally Hit
        this.hitbox.setCollisionMask(0b100000); //Enemy fire only
        G.game.physics.box2d.weldJoint(sprite, this.hitbox);

        this.cursors = G.game.input.keyboard.createCursorKeys();

        
        // sprite.animations.add('leftright',[0,1,2,3,4,5,6,7,8,9,10,11,12],30,true);
        sprite.animations.add('idlefrontleft',[0,1,2,3,4],7,true);        
        sprite.animations.add('frontleft',[5,6,7,8,9,10,11,12],10,true);
        sprite.animations.add('frontright',[13,14,15,16,17,18,19,20],10,true);
        sprite.animations.add('idlefrontright',[21,22,23,24,25],7,true);
        sprite.animations.add('backleft',[26,27,28,29,30,31,32,33],10,true);        
        sprite.animations.add('idlebackleft',[34,35,36,37,38],7,true);
        sprite.animations.add('idlebackright',[39,40,41,42,43],7,true);
        sprite.animations.add('backright',[44,45,46,47,48,49,50,51],10,true);

        sprite.animations.add('forward',[4,5,6,7,8,9,10,11,12],10,true);
        sprite.animations.add('backward',[4,5,6,7,8,9,10,11,12],10,true);

        this.setMainSprite(sprite);
        G.game.camera.follow(this.mainSprite);
        
        sprite.anchor.setTo(0.5,1);

    }

    Update()
    {
        this.tryMove();

        this.weaponSystem.tryShoot();

        // This is for checking the anchor point of an actor.
        // console.log(  "XDiff-" + (this.mainSprite.x - G.game.input.mousePointer.worldX) 
        //             + " :: "
        //             + "YDiff-" + (this.mainSprite.y - G.game.input.mousePointer.worldY)
        //             );

        
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
        let moving = false;
        let leftright = false; // is this necessary?
        if(Input.isDown(Action.Left) || Input.isDown(Action.Right))
        {
            if (Input.isDown(Action.Left))
            {
                this.thrustDirectional(200000*G.game.time.physicsElapsed,1,0);
                if(Input.isDown(Action.Up))
                {
                    this.facingForward = false;
                    b2d(this.mainSprite).thrust(200000*G.game.time.physicsElapsed);
                    this.mainSprite.animations.play('backleft'); 
                }
                else if (Input.isDown(Action.Down))
                {
                    this.facingForward = true;
                    b2d(this.mainSprite).reverse(200000*G.game.time.physicsElapsed);                    
                    this.mainSprite.animations.play('frontleft');
                }
                else
                {
                    this.mainSprite.animations.play('frontleft');
                }
                moving = true;
                leftright = true;
                this.lastDirection = 'left';
            }
            else if (Input.isDown(Action.Right))
            {
                this.thrustDirectional(200000*G.game.time.physicsElapsed,-1,0);
                // this.mainSprite.scale.setTo(-2,2);
                if(Input.isDown(Action.Up))
                {
                    this.facingForward = false;
                    b2d(this.mainSprite).thrust(200000*G.game.time.physicsElapsed);
                    this.mainSprite.animations.play('backright');
                }
                else if (Input.isDown(Action.Down))
                {
                    this.facingForward = true;
                    b2d(this.mainSprite).reverse(200000*G.game.time.physicsElapsed);  
                    this.mainSprite.animations.play('frontright');
                }
                else
                {
                    this.mainSprite.animations.play('frontright');
                }
                moving = true;
                leftright = true;
                this.lastDirection = 'right';
            }
        }
        else
        {
            if (Input.isDown(Action.Up))
            {
                this.facingForward = false;
    
                b2d(this.mainSprite).thrust(200000*G.game.time.physicsElapsed);
    
                if(this.lastDirection == 'right')
                {
                    this.mainSprite.animations.play('backright'); 
                }
                else
                {
                    this.mainSprite.animations.play('backleft');
                }
                // if (!leftright) this.mainSprite.animations.play('backward');
                
                moving = true;
            }
            else if (Input.isDown(Action.Down))
            {
                this.facingForward = true;
    
                b2d(this.mainSprite).reverse(200000*G.game.time.physicsElapsed);
    
                if(this.lastDirection == 'right')
                {
                    this.mainSprite.animations.play('frontright'); 
                }
                else
                {
                    this.mainSprite.animations.play('frontleft');
                }
                // if (!leftright) this.mainSprite.animations.play('forward');
                
                moving = true;
            }
        }
        console.log(this.lastDirection);
        if (!moving)
        {
            if (this.facingForward)
            {
                if (this.lastDirection == 'left')
                {
                    this.mainSprite.animations.play('idlefrontleft');
                }
                else
                {
                    this.mainSprite.animations.play('idlefrontright');
                }
            }
            else
            {
                if (this.lastDirection == 'left')
                {
                    this.mainSprite.animations.play('idlebackleft');
                }
                else
                {
                    this.mainSprite.animations.play('idlebackright');
                }
            }
        }

        // if (G.game.input.keyboard.isDown(Phaser.Keyboard.P))
        // {
        //     b2d(this.mainSprite).thrust(2000 * b2d(this.mainSprite).mass);
        // }

        if (Input.pressed(Action.Interact))
        {
            // Interaction
            if (G.nearestInteractable) G.nearestInteractable.OnInteract();
        }
    }

    // wind: boolean = false;

}