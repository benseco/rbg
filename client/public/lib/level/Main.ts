/// <reference path="../base/BaseState.ts" />
class Main extends BaseState
{

    player: Player;
    map: Phaser.Tilemap;
    layers: Phaser.TilemapLayer[] = [];

    constructor()
    {
        super();
        let basicEnemy = new BasicEnemy();
    }
    
    Preload()
    {
        this.game.load.tilemap('testmap', '../res/map/testmap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', '../res/map/testset.png');
        this.game.load.image('car', '../res/sprite/car90.png');

        
        this.game.load.image('map1', '../res/map/citytest.png');


    }

    Create()
    {

        let background = this.game.add.image(0,0,"map1");
        background.scale = new Phaser.Point(2,2);
        this.game.world.resize(background.width, background.height);



        let ground = new Phaser.Physics.Box2D.Body(G.game, null, 0, 0);
        let verts = [0,266,151,234,291,396,520,243,895,298,999,
                    436,796,690,548,761,366,648,151,390,0];
        verts = verts.map(v => v*2);
        for (let i = 1; i < verts.length - 1; i++)
        {
            if (i%2) ground.addEdge(verts[i-1],verts[i],verts[i+1],verts[i]);
            else     ground.addEdge(verts[i],verts[i-1],verts[i],verts[i+1]);
        }
        ground.static = true;
        ground.setCollisionCategory(0b000001); //Walls
        ground.setCollisionMask(0b101010); //Physic, Ally fire, Enemy fire

    }

    Update()
    { 

    }
    
    Render()
    {
        
    }
    
    Shutdown()
    {
        
    }

    useTestMap()
    {
        this.map = this.game.add.tilemap('testmap');
        this.map.addTilesetImage('testset', 'tiles');

        this.layers = [];
        this.layers.push(this.map.createLayer('ground'));

        G.layerCollision = this.map.createLayer('collision');
        this.map.setCollisionByExclusion([],true,'collision');
        this.layers.push(G.layerCollision);

        //Add overhead layers?
        let ol1 = this.map.createLayer('overhead');
        ol1.z = 1000;
        this.layers.push(ol1);

        let ol2 = this.map.createLayer('overhead2');
        ol2.z = 2000;
        this.layers.push(ol2);

        //All layers
        for (let l of this.layers)
        {
            l.setScale(2,2);
            l.renderSettings.enableScrollDelta = true;
        }
        this.layers[0].resizeWorld();
    }

    
}