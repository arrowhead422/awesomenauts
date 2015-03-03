
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0, 
		EnemyBaseHealth: 10,
		PlayerBaseHealth: 10,
		EnemyCreepHealth: 10,
		PlayerHealth: 10,
		EnemyCreepAttack: 1,
		PlayerAttack: 1,
		//OrcBaseDamage: 10,
		//OrcBaseHealth: 100,
		//OrcBaseSpeed: 3,
		//OrcBaseDefence: 0,
		PlayerAttackTimer: 1000,
		EnemyCreepAttackTimer: 1000,
		PlayerMoveSpeed: 5,
		CreepMoveSpeed: 5,
		GameTimerManger: "",
		HeroDeathManager: "",
		Player: "",
		exp: 0,
		gold: 0,
		expl: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

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
		me.input.bindKey(me.input.KEY.RIGHT, "right");

		me.pool.register("player", game.PlayerEntity, true);
		//we add register entities
		me.pool.register("PlayerBase", game. PlayerBaseEntity);
		//the enemy base
		me.pool.register("EnemyBase", game. EnemyBaseEntity);
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		me.pool.register("GameManger", game.GameTimerManger);
		me.pool.register.("HeroDeathManager", game.HeroDeathManager);

		
		 me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// Start the game.
		me.state.change(me.state.MENU);
	}
};



