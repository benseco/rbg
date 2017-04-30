/// <reference path="../base/BaseActor.ts" />
class Bullet extends BaseActor {
    
    x: number;
    y: number;

    killBody: boolean;

    damage: number = 1;

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
        this.setMainSprite(sprite);
        this.mainSprite.scale.setTo(2,2);
        G.game.physics.box2d.enable(sprite);
        b2d(sprite).setRectangle(15,15,0,0);
        b2d(sprite).linearDamping = 2;
        b2d(sprite).fixedRotation = true;
        b2d(sprite).restitution = .5;
        b2d(sprite).setCollisionCategory(0b001000); //Ally fire
        b2d(sprite).setCollisionMask(0b010001); //Enemy hit and walls
        b2d(this.mainSprite).bullet = true;
        b2d(this.mainSprite).setCategoryContactCallback(0b010000, this.onEnemyHitboxCollide, this);
        b2d(this.mainSprite).setCategoryContactCallback(0b000001, this.onCollide, this);
        this.thrustDirectional(200000, this.x - G.game.input.mousePointer.worldX, this.y - G.game.input.mousePointer.worldY);
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
        if (this.killBody)
        {
            b2d(this.mainSprite).destroy();
            this.killBody = false;
        }
    }
    
    onEnemyHitboxCollide(body1:Phaser.Physics.Box2D.Body, body2:Phaser.Physics.Box2D.Body, fixture1:any, fixture2:any, contact:any, impulseInfo:any)
    { 
        if (!contact) return;

        let enemy = (shell(body2) as BasicEnemy);
        if (enemy.mainSprite)
        {
            enemy.damage(this.damage);
        }
       
        console.log((shell(body2) as BasicEnemy).hitPoints);

        this.onCollide();
    }

    onCollide()
    {
        this.kill()
    }
    
    Render()
    {

    }
    
    Shutdown()
    {
        
    }

    kill()
    {
        //b2d(this.mainSprite).kill(); //.destroy();
        this.mainSprite.kill();
        this.killBody = true;
    }

}