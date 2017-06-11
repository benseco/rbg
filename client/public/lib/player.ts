/// <reference path="./base/BaseActor.ts" />
class Player extends BaseActor {
    cursors: Phaser.CursorKeys;
    hitbox: Phaser.Physics.Box2D.Body;
    weaponSystem: MainWeapon;
    speed: number = 400; // double what you want
    facingForward: boolean = true;

    constructor()
    {
        super();
        this.weaponSystem = new MainWeapon();
    }

    Preload()
    {
        G.game.load.spritesheet('maintest', '../res/sprite/maintest.png',32,55);
        G.game.load.image('bullet', '../res/sprite/bullet.png');
    }

    Create()
    {
        let sprite = G.getSprite('maintest', 250, 600);
        G.game.physics.box2d.enable(sprite, true);
        b2d(sprite).setCircle(12);
        // b2d(sprite).clearShapes();
        // b2d(sprite).loadPolygon(null,[{shape: [0,0,20,0,20,20,0,10]}] as any)
        //b2d(sprite).offset = new Phaser.Point(0,-16);
        b2d(sprite).mass = 1;
        b2d(sprite).fixedRotation = true;
        b2d(sprite).linearDamping = 10;
        b2d(sprite).setCollisionCategory(0b000010); //Physic
        b2d(sprite).setCollisionMask(0b000011); //Physic and walls

        this.hitbox = new Phaser.Physics.Box2D.Body(G.game, null, sprite.x, sprite.y);
        this.hitbox.setRectangle(10,50,0,-26);
        //this.hitbox.fixedRotation = true;
        this.hitbox.setCollisionCategory(0b000100); //Ally Hit
        this.hitbox.setCollisionMask(0b100000); //Enemy fire only
        G.game.physics.box2d.weldJoint(sprite, this.hitbox);

        this.cursors = G.game.input.keyboard.createCursorKeys();

        
        sprite.animations.add('leftright',[0,1,2,3,4,5,6,7,8,9,10,11,12],30,true);
        sprite.animations.add('idlefront',[0]);
        sprite.animations.add('idleback',[0]);
        sprite.animations.add('forward',[0,1,2,3,4,5,6,7,8,9,10,11,12],30,true);
        sprite.animations.add('backward',[0,1,2,3,4,5,6,7,8,9,10,11,12],30,true);

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
        
        if (Input.isDown(Action.Left))
        {
            this.thrustDirectional(200000*G.game.time.physicsElapsed,1,0);

            this.mainSprite.animations.play('leftright');

            moving = true;
            leftright = true;
        }
        else if (Input.isDown(Action.Right))
        {
            this.thrustDirectional(200000*G.game.time.physicsElapsed,-1,0);

            this.mainSprite.scale.setTo(-2,2);
            this.mainSprite.animations.play('leftright');

            moving = true;
            leftright = true;
        }

        if (Input.isDown(Action.Up))
        {
            this.facingForward = false;

            b2d(this.mainSprite).thrust(200000*G.game.time.physicsElapsed);

            if (!leftright) this.mainSprite.animations.play('backward');
            
            moving = true;
        }
        else if (Input.isDown(Action.Down))
        {
            this.facingForward = true;

            b2d(this.mainSprite).reverse(200000*G.game.time.physicsElapsed);

            if (!leftright) this.mainSprite.animations.play('forward');
            
            moving = true;
        }

        if (!moving)
        {
            if (this.facingForward) this.mainSprite.animations.play('idlefront');
            else this.mainSprite.animations.play('idleback');
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