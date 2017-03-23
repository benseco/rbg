/// <reference path="../base/BaseActor.ts" />
class Bullet extends BaseActor {
    
    x: number;
    y: number;
    x0: number;
    x1: number;
    y0: number;
    y1: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.Preload();
        this.Create();
    }


    Preload()
    {

    }

    Create()
    {
        let sprite = G.getSprite('bullet', this.x, this.y);
        G.game.physics.box2d.enable(sprite);
        b2d(sprite).setRectangle(15,15,0,0);
        b2d(sprite).fixedRotation = true;
        b2d(sprite).restitution = 1;
        b2d(sprite).setCollisionCategory(0b001000); //Ally fire
        b2d(sprite).setCollisionMask(0b010001); //Enemy hit and walls

        this.setMainSprite(sprite);
        this.mainSprite.scale.setTo(2,2);
        b2d(this.mainSprite).thrust(100000);

    }

    /*
    onCollide()
    {
        G.killSprite(this.mainSprite);
        this.destroy();
    }
    */

    Update()
    {
        
    }
    
    Render()
    {

    }
    
    Shutdown()
    {
        
    }

}