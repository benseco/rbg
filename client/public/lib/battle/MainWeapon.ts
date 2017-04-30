/// <reference path="../base/BaseActor.ts" />
class MainWeapon extends BaseActor {

    hand: Phaser.Sprite;
    dial: Phaser.Sprite;
    timer: Phaser.Timer;
    looptime: number = 1000;
    isShooting: boolean = false;

    frame: number;
    bullets: number;

    loaded: boolean = true;
    miss: boolean;

    hotSprite: Phaser.Sprite;
    slowSprite: Phaser.Sprite;
    noAmmoSprite: Phaser.Sprite;

    Preload()
    {
        G.game.load.image('dial', '../res/ui/dial3.png');
        G.game.load.image('hand', '../res/ui/hand.png');
        G.game.load.image('hot', '../res/ui/hot.png');
        G.game.load.image('slow', '../res/ui/slow.png');
        G.game.load.image('noammo', '../res/ui/noammo.png');
    }

    Create()
    {
        this.dial = G.game.add.sprite(70, 650, 'dial');
        this.hand = G.game.add.sprite(70, 650, 'hand');
        this.dial.fixedToCamera = true;
        this.hand.fixedToCamera = true;
        this.dial.pivot.set(49,49);
        this.hand.pivot.set(49,49);
        this.dial.z = 9000;
        this.hand.z = 9001;

        this.textSprites();

        this.timer = G.game.time.create(false);
        this.timer.loop(this.looptime, function(){});
        this.timer.start();
    }

    Update()
    {
        this.hand.angle = (this.timer.duration / this.looptime) * 360;

        
    }
    
    Render()
    {
        // if (this.frame % 60 == 0)
        //     G.game.debug.text("Bullets: " + this.bullets, 32, 64, 'rgb(255,255,255)');
        // this.frame += 1;

        
        // G.game.debug.text("" + this.timer.duration / 100, 32, 600, 'rgb(255,255,255)');
    }
    
    Shutdown()
    {
        
    }

    tryShoot()
    {
        let now = this.timer.duration;

        if(Input.pressed(Action.Shoot))
        {
            if (this.loaded && now < (this.looptime / 2))
            {
                let b = new Bullet(G.player.mainSprite.x, G.player.mainSprite.y);
                b.damage = 2 * (now < (this.looptime / 4) ? 2 : 1) * (this.miss ? .5 : 1);

                if (now < (this.looptime / 4))
                {
                    this.show(this.hotSprite);
                } 
                else this.show(this.slowSprite)

                this.bullets += 1;
                this.loaded = false;
                this.miss = false;
                G.game.time.events.add(Phaser.Timer.SECOND * .5, this.reload, this);
            }
            else
            {
                this.miss = true;
                this.show(this.noAmmoSprite);
            }
        }
    }

    reload()
    {
        this.loaded = true;
    }

    textSprites()
    {
        this.hotSprite = G.getSprite('hot');
        this.hotSprite.anchor.setTo(.5,1);
        this.hotSprite.position.setTo(0,-G.player.mainSprite.height / G.player.mainSprite.scale.y);
        this.hotSprite.alpha = 0;
        G.player.mainSprite.addChild(this.hotSprite);

        this.slowSprite = G.getSprite('slow');
        this.slowSprite.anchor.setTo(.5,1);
        this.slowSprite.position.setTo(0,-G.player.mainSprite.height / G.player.mainSprite.scale.y);
        this.slowSprite.alpha = 0;
        G.player.mainSprite.addChild(this.slowSprite);

        this.noAmmoSprite = G.getSprite('noammo');
        this.noAmmoSprite.anchor.setTo(.5,1);
        this.noAmmoSprite.position.setTo(0,-G.player.mainSprite.height / G.player.mainSprite.scale.y);
        this.noAmmoSprite.alpha = 0;
        G.player.mainSprite.addChild(this.noAmmoSprite);
    }

    show(sprite: Phaser.Sprite)
    {
        sprite.alpha = 1;
        G.game.add.tween(sprite).to( { alpha: 0 }, 250, "Linear", true);
    }


}