abstract class BaseInteracts extends BaseActor {

    private isNear: boolean;
    private notifierSprite: Phaser.Sprite;

    constructor()
    {
        super();

        G.update.add(this.seekNear, this);
    }

    abstract OnInteract(): void;
    abstract OnNear(): void;
    abstract OnFar(): void;

    seekNear()
    {
        if (this.mainSprite)
        {
            let distance = this.mainSprite.position.distance(G.player.mainSprite.position);
            if (distance < 30)
            {
                if (!this.isNear)
                {
                    this.isNear = true;
                    if (!this.notifierSprite)
                    {
                        this.notifierSprite = G.getSprite('interact');
                        this.notifierSprite.anchor.setTo(.5,1);
                        this.notifierSprite.position.setTo(0,-this.mainSprite.height / this.mainSprite.scale.y);
                        this.mainSprite.addChild(this.notifierSprite);
                    }
                    else this.notifierSprite.visible = true;
                }
            }
            else if (this.isNear)
            {
                this.isNear = false;
                this.notifierSprite.visible = false;
            }
        }
    }


}