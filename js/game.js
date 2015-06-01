
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
        option1: "",
        option2: "",
        enemyCreepHealth: 10,
        
        playerHealth: 35,
        enemyCreepAttack: 1,
        
        bulletDamage: 1,
        playerAttackTimer: 1000,
        enemyCreepAttackTimer: 1000,
        playerMoveSpeed: 5,
        creepMoveSpeed: 5,
        gameTimerManager: "",
        heroDeathManager: "",
        bulletTimer: 0.2,
        bullet: 0,
        player: "",
        win: ""

	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}
        
        me.state.LOAD = 113;
        me.state.NEW = 114;
        me.state.MAIN = 115;
        me.state.CON = 116;
        

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
                me.pool.register("player", game.PlayerEntity, true);
                me.pool.register("EnemyCreep", game.EnemyCreep, true);
                me.pool.register("GameManager", game.GameManager);
                me.pool.register("bullet", game.shootGun);
                me.pool.register("SpendGold", game.SpendGold);
            
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
                me.state.set(me.state.NEW, new game.NewScreen());
                me.state.set(me.state.LOAD, new game.LoadScreen());
                me.state.set(me.state.MAIN, new game.MainScreen());
                me.state.set(me.state.CON, new game.ControlScreen());
                
                

		// Start the game.
		me.state.change(me.state.MENU);
	}
};
