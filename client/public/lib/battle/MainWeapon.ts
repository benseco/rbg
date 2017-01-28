class MainWeapon extends BaseActor {

    hand: Phaser.Sprite;
    dial: Phaser.Sprite;

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
    }

    Update()
    {
        this.hand.angle += 5;
    }
    
    Render()
    {
        
    }
    
    Shutdown()
    {
        
    }
}