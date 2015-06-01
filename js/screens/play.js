//my class for play
game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    //my onreset function
    onResetEvent: function(x, y) {
        // reset the score
        game.data.score = 0;

        me.levelDirector.loadLevel("level1");

        me.state.current().resetPlayer(0, 420);

        var gamemanager = me.pool.pull("GameManager", 0, 0, {});
        me.game.world.addChild(gamemanager, 0);

        var spendGold = me.pool.pull("SpendGold", 0, 420, {});
        me.game.world.addChild(spendGold, 5);

        //binding keys
        me.input.bindKey(me.input.KEY.B, "buy");
        me.input.bindKey(me.input.KEY.A, "shoot");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.SPACE, "jump");

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },
    /**
     *  action to perform when leaving this screen (state change)
     */
    //my ondestroy function
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    },
    //my reset player function
    resetPlayer: function(x, y) {
        game.data.player = me.pool.pull("player", x, y, {});
        me.game.world.addChild(game.data.player, 10);
    }
});
