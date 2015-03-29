
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0, 
		EnemyBaseHealth: 1,
		PlayerBaseHealth: 1,
		EnemyCreepHealth: 10,
		PlayerHealth: 100,
		EnemyCreepAttack: 1,
		PlayerAttack: 1,
		//OrcBaseDamage: 10,
		//OrcBaseHealth: 100,
		//OrcBaseSpeed: 3,
		//OrcBaseDefence: 0,
		PlayerAttackTimer: 1000,
		EnemyCreepAttackTimer: 1000,
		PlayerMoveSpeed: 5,
		//PlyaerJumpSpeed: 10, 
		CreepMoveSpeed: 5,
		GameTimerManager: "",
		HeroDeathManager: "",
		ExperienceManager: "",
		Player: "",
		exp: 0,
		gold: 0,
		ability1: 0,
		ability2: 0,
		ability3: 0,
		skill1: 0,
		skill2: 0,
		skill3: 0,
		expl: 10,
		exp2: 0,
		exp3: 0,
		exp4: 0,
		exp5: 0,
		exp6: 0,
		win: "",
		pausePos: "",
		buyscreen: "",
		buytext: "",
		Music: "",
		Creep: "",
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

	me.save.add({exp: 0, epx1: 0, exp2: 0, exp3: 0, exp4: 0});
	
	me.state.SPENDEXP = 112;
	me.state.LOAD = 113;
	me.state.NEW = 114;

	me.state.SPENDEXP = 112;	
	
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
		//we add register entities
		me.pool.register("PlayerBase", game. PlayerBaseEntity);
		//the enemy base
		me.pool.register("EnemyBase", game. EnemyBaseEntity);
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		me.pool.register("GameTimerManger", game.GameTimerManger);
		me.pool.register("GameManger", game.GameManger);
		me.pool.register("HeroDeathManager", game.HeroDeathManager);
		me.pool.register("ExperienceManager", game.ExperienceManager);
		me.pool.register("SpendGold", game.SpendGold);
		
		me.state.set(me.state.MENU, new game.TitleScreen());
		//menu and play repersented as number for my game
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.SPENDEXP, new game.SpendExp());
		me.state.set(me.state.LOAD, new game.LoadProfile());
		me.state.set(me.state.NEW, new game.NewProfile());
		

		// Start the game.
		me.state.change(me.state.MENU);
	}
};



