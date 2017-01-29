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
        let sprite = G.getSprite('testplayer', 450, 80);
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

        this.isShooting = false;

    }

    Update()
    {
        this.tryMove();

        this.tryShoot();
        
    }
    
    Render()
    {
        
    }
    
    Shutdown()
    {
        
    }

    tryMove()
    {
        this.mainSprite.scale.setTo(2,2);
        arcb(this.mainSprite).velocity.set(0,0);

        if (G.game.input.keyboard.isDown(Phaser.Keyboard.S) || G.game.input.keyboard.isDown(Phaser.Keyboard.W) ||
             G.game.input.keyboard.isDown(Phaser.Keyboard.A) || G.game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            if (G.game.input.keyboard.isDown(Phaser.Keyboard.A))
            {
                //this.playerSprite.angle = 180;
                //arcb(this.playerSprite).position.add(-5,0);
                arcb(this.mainSprite).velocity.add(-100,0);

                this.mainSprite.scale.setTo(-2,2);
                this.mainSprite.animations.play('leftright');
            }
            else if (G.game.input.keyboard.isDown(Phaser.Keyboard.D))
            {
                //this.playerSprite.angle = 0;
                //arcb(this.playerSprite).position.add(5,0);
                arcb(this.mainSprite).velocity.add(100,0);
                this.mainSprite.animations.play('leftright');
            }

            if (G.game.input.keyboard.isDown(Phaser.Keyboard.W))
            {
                //this.playerSprite.angle = 270;
                //arcb(this.playerSprite).position.add(0,-5);
                arcb(this.mainSprite).velocity.add(0,-100);
                if (!G.game.input.keyboard.isDown(Phaser.Keyboard.D) && !G.game.input.keyboard.isDown(Phaser.Keyboard.A)) this.mainSprite.animations.play('backward');
            }
            else if (G.game.input.keyboard.isDown(Phaser.Keyboard.S))
            {
                //this.playerSprite.angle = 90;
                //arcb(this.playerSprite).position.add(0,5);
                arcb(this.mainSprite).velocity.add(0,100);
                if (!G.game.input.keyboard.isDown(Phaser.Keyboard.D) && !G.game.input.keyboard.isDown(Phaser.Keyboard.A)) this.mainSprite.animations.play('forward');
            }

        }
        else
        {
            this.mainSprite.animations.play('idlefront');
        }

        arcb(this.mainSprite).velocity.normalize().multiply(200,200);
    }

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