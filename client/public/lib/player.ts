/// <reference path="./base/BaseActor.ts" />
class Player extends BaseActor {
    sprite: Phaser.Sprite;
    cursors: Phaser.CursorKeys;

    /*
    constructor(state: BaseState)
    {
        super(state);
    }
    */

    Preload()
    {
        this.game.load.spritesheet('testplayer', '../res/sprite/testplayer.png',16,32);
    }

    Create()
    {
        this.sprite = new Phaser.Sprite(this.game, 450, 80, 'testplayer');
        this.sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.sprite);
        arcb(this.sprite).collideWorldBounds = true;
        arcb(this.sprite).setSize(16,16,0,16);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.sprite.animations.add('leftright',[2,3],5,true);
        this.sprite.animations.add('idlefront',[2,3],5,true);
        this.sprite.animations.add('idlefront',[0]);
        this.sprite.animations.add('idleback',[1]);
        this.sprite.animations.add('forward',[4,5],5,true);
        this.sprite.animations.add('backward',[6,7],5,true);

    }

    Update()
    {
        
        this.sprite.scale.setTo(2,2);
        arcb(this.sprite).velocity.set(0,0);

        if (this.cursors.down.isDown || this.cursors.up.isDown || this.cursors.left.isDown || this.cursors.right.isDown)
        {
            if (this.cursors.left.isDown)
            {
                //this.playerSprite.angle = 180;
                //arcb(this.playerSprite).position.add(-5,0);
                arcb(this.sprite).velocity.add(-100,0);

                this.sprite.scale.setTo(-2,2);
                this.sprite.animations.play('leftright');
            }
            else if (this.cursors.right.isDown)
            {
                //this.playerSprite.angle = 0;
                //arcb(this.playerSprite).position.add(5,0);
                arcb(this.sprite).velocity.add(100,0);
                this.sprite.animations.play('leftright');
            }

            if (this.cursors.up.isDown)
            {
                //this.playerSprite.angle = 270;
                //arcb(this.playerSprite).position.add(0,-5);
                arcb(this.sprite).velocity.add(0,-100);
                if (!this.cursors.right.isDown && !this.cursors.left.isDown) this.sprite.animations.play('backward');
            }
            else if (this.cursors.down.isDown)
            {
                //this.playerSprite.angle = 90;
                //arcb(this.playerSprite).position.add(0,5);
                arcb(this.sprite).velocity.add(0,100);
                if (!this.cursors.right.isDown && !this.cursors.left.isDown) this.sprite.animations.play('forward');
            }

        }
        else
        {
            this.sprite.animations.play('idlefront');
        }

        arcb(this.sprite).velocity.normalize().multiply(200,200);
        
    }
    
    Render()
    {
        
    }
    
    Shutdown()
    {
        
    }

}