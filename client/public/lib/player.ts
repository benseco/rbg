/// <reference path="./base/BaseActor.ts" />
class Player extends BaseActor {
    cursors: Phaser.CursorKeys;
    isShooting: boolean;

    weaponSystem: MainWeapon;

    constructor()
    {
        super();
        this.weaponSystem = new MainWeapon();
    }

    Preload()
    {
        G.game.load.spritesheet('testplayer', '../res/sprite/testplayer.png',16,32);
    }

    Create()
    {
        let sprite = G.getSprite('testplayer', 250, 80);
        sprite.anchor.setTo(0.5, 0.5);
        G.game.physics.enable(sprite);
        arcb(sprite).collideWorldBounds = true;
        arcb(sprite).setSize(16,16,0,16);
        arcb(sprite).mass = 40;

        this.cursors = G.game.input.keyboard.createCursorKeys();

        sprite.animations.add('leftright',[2,3],5,true);
        sprite.animations.add('idlefront',[0]);
        sprite.animations.add('idleback',[1]);
        sprite.animations.add('forward',[4,5],5,true);
        sprite.animations.add('backward',[6,7],5,true);

        this.setMainSprite(sprite);
        G.game.camera.follow(this.mainSprite);

        
        //Temporary hack
        G.physicCollision.add(sprite)

        this.isShooting = false;

    }

    Update()
    {
        this.tryMove();

        this.tryShoot();
        
    }
    
    Render()
    {
        G.game.debug.text("Wind: " + this.wind, 32, 64, 'rgb(255,255,255)');
        G.game.debug.text("Ax: " + (arcb(this.mainSprite).acceleration.x * arcb(this.mainSprite).acceleration.x > 1 ? arcb(this.mainSprite).acceleration.x : 0), 32, 100, 'rgb(255,255,255)');
        G.game.debug.text("Ay: " + (arcb(this.mainSprite).acceleration.y * arcb(this.mainSprite).acceleration.y > 1 ? arcb(this.mainSprite).acceleration.y : 0), 32, 120, 'rgb(255,255,255)');
        G.game.debug.text("Vx: " + (arcb(this.mainSprite).velocity.x * arcb(this.mainSprite).velocity.x > 1 ? arcb(this.mainSprite).velocity.x : 0), 32, 140, 'rgb(255,255,255)');
        G.game.debug.text("Vy: " + (arcb(this.mainSprite).velocity.y * arcb(this.mainSprite).velocity.y > 1 ? arcb(this.mainSprite).velocity.y : 0), 32, 160, 'rgb(255,255,255)');
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
            let direction: Phaser.Point = new Phaser.Point();
            if (G.game.input.keyboard.isDown(Phaser.Keyboard.A))
            {
                direction.add(-1,0);

                this.mainSprite.scale.setTo(-2,2);
                this.mainSprite.animations.play('leftright');
            }
            else if (G.game.input.keyboard.isDown(Phaser.Keyboard.D))
            {
                direction.add(1,0);

                this.mainSprite.animations.play('leftright');
            }

            if (G.game.input.keyboard.isDown(Phaser.Keyboard.W))
            {
                direction.add(0,-1);
                
                if (!G.game.input.keyboard.isDown(Phaser.Keyboard.D) && !G.game.input.keyboard.isDown(Phaser.Keyboard.A)) this.mainSprite.animations.play('backward');
            }
            else if (G.game.input.keyboard.isDown(Phaser.Keyboard.S))
            {
                direction.add(0,1);

                if (!G.game.input.keyboard.isDown(Phaser.Keyboard.D) && !G.game.input.keyboard.isDown(Phaser.Keyboard.A)) this.mainSprite.animations.play('forward');
            }

            direction.normalize().multiply(100,100);
            arcb(this.mainSprite).acceleration.x += direction.x - arcb(this.mainSprite).acceleration.x;
            arcb(this.mainSprite).acceleration.y += direction.y - arcb(this.mainSprite).acceleration.y;


        }
        else
        {
            this.mainSprite.animations.play('idlefront');
        }

        arcb(this.mainSprite).velocity.multiply(.9,.9);
        arcb(this.mainSprite).acceleration.multiply(.5,.5);


        //TESTING WIND
        
        if (G.game.input.keyboard.isDown(Phaser.Keyboard.M)) this.wind = !this.wind;
        if (this.wind)
        {
            this.applyForce(new Phaser.Point(0,-1500));
        }

        //TESTING INSTANTANEOUS FORCES
        if (G.game.input.keyboard.isDown(Phaser.Keyboard.P))
        {
            console.log("PUSHED");
            this.applyForce(new Phaser.Point(0,20000));
        }
    }

    wind: boolean = false;

    tryShoot()
    {
        if(G.game.input.activePointer.leftButton.isDown)
        {
            if(!this.isShooting)
            {
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