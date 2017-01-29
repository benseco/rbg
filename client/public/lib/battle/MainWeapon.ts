class MainWeapon extends BaseActor {

    hand: Phaser.Sprite;
    dial: Phaser.Sprite;
    timer: Phaser.Timer;
    looptime: number = 2000;

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
        
    }
    
    Shutdown()
    {
        
    }
}