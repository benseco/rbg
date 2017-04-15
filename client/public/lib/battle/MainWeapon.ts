/// <reference path="../base/BaseActor.ts" />
class MainWeapon extends BaseActor {

    hand: Phaser.Sprite;
    dial: Phaser.Sprite;
    timer: Phaser.Timer;
    looptime: number = 2000;
    isShooting: boolean = false;

    frame: number;
    bullets: number;

    Preload()
    {
        G.game.load.image('dial', '../res/ui/dial.png');
        G.game.load.image('hand', '../res/ui/hand.png');
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
        if (this.frame % 60 == 0)
            G.game.debug.text("Bullets: " + this.bullets, 32, 64, 'rgb(255,255,255)');
        this.frame += 1;
    }
    
    Shutdown()
    {
        
    }

    tryShoot()
    {
        if(Input.pressed(Action.Shoot))
        {
            //for (let i=0; i<50; i++)
            new Bullet(G.player.mainSprite.x, G.player.mainSprite.y);
            this.isShooting = true;
            this.bullets += 1;
        }
    }
}