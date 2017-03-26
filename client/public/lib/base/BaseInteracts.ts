abstract class BaseInteracts extends BaseActor {

    private isNear: boolean;
    private notifierSprite: Phaser.Sprite;

    constructor()
    {
        super();

        G.update.add(this.seekNear, this);
    }

    OnInteract()
    {

    }

    OnNear()
    {
        if (!this.notifierSprite)
        {
            this.notifierSprite = G.getSprite('interact');
            this.notifierSprite.anchor.setTo(.5,1);
            this.notifierSprite.position.setTo(0,-this.mainSprite.height / this.mainSprite.scale.y);
            this.mainSprite.addChild(this.notifierSprite);
        }
        else this.notifierSprite.visible = true;
    }

    OnFar()
    {
        this.notifierSprite.visible = false;
    }

    seekNear()
    {
        // May or may not need this check here. For now, mainSprite is required
        if (this.mainSprite)
        {
            // Get the distance between this and the player
            let distance = this.mainSprite.position.distance(G.player.mainSprite.position);
            if (distance < 30) // Eventually this will need to be a customizable distance
            {
                if (!this.isNear) // Were we already near enough last update? 
                {
                    this.isNear = true;
                    this.OnNear();
                }
            }
            else if (this.isNear) // If we aren't near anymore, yet we were last update...
            {
                this.isNear = false;
                this.OnFar();
            }
        }
    }


}