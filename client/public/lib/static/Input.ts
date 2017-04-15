type pressMemory = [Action, boolean];

enum Action
{
    Interact,
    Shoot,

    Up,
    Left,
    Down,
    Right

}

var ActionMap: {[i:number]: number} = {};
ActionMap[Action.Interact] = Phaser.Keyboard.E;
ActionMap[Action.Shoot] = Phaser.Mouse.LEFT_BUTTON;

ActionMap[Action.Up] = Phaser.Keyboard.W;
ActionMap[Action.Left] = Phaser.Keyboard.A;
ActionMap[Action.Down] = Phaser.Keyboard.S;
ActionMap[Action.Right] = Phaser.Keyboard.D;


/*
Note: Using Input potentially prevents more than one 
    response to any given Action from happening during 
    the same update. However, I don't really see that 
    as an issue. It might even be a feature.
        -Ben
*/
class Input
{
    private static wasDown: {[i:number]: boolean} = {};

    public static pressed(a: Action): boolean
    {
        // order of these expressions matters, do not move
        let wasDown = Input.wasDown[a];
        let isDown = Input.isDown(a);

        return !wasDown && isDown;
    }

    public static isDown(a: Action): boolean
    {
        let key = ActionMap[a];
        if (key == undefined) return false;
        
        let isDown = Input.getKeyStatus(key);
        Input.wasDown[a] = isDown;

        return isDown;

    }

    private static getKeyStatus(key: number)
    {
        switch (key)
        {
            case Phaser.Mouse.LEFT_BUTTON:  
                return G.game.input.activePointer.leftButton.isDown;
            default:
                return G.game.input.keyboard.isDown(key);
        }
    }

}