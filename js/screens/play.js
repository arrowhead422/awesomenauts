game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		me.audio.playTrack("one");
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level01"); // this code here loads up our tile set up.
		this.resetPlayer(0, 420);
		
		var GameTimerManager = me.pool.pull("GameTimerManger", 0, 0, {});
		me.game.world.addChild(GameTimerManager, 0);

		var HeroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
		me.game.world.addChild(HeroDeathManager, 0);

		var ExperienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
		me.game.world.addChild(ExperienceManager, 0);

		var SpendGold = me.pool.pull("SpendGold", 0, 0, {});
		me.game.world.addChild(SpendGold, 0);

		//game.data.minimap = me.pool.pull("minimap", 10, 10, {});
		//me.game.world.addChild(game.data.minimap, 30);

		me.input.bindKey(me.input.KEY.B, "buy");
		me.input.bindKey(me.input.KEY.Q, "skill");
		me.input.bindKey(me.input.KEY.W, "skill2");
		me.input.bindKey(me.input.KEY.E, "skill3");
		me.input.bindKey(me.input.KEY.S, "attack");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.SPACE, "jump");


		
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.audio.stopTrack();
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	
	},

	resetPlayer: function(x, y){
		game.data.Player = me.pool.pull("Player" , x, y, {});
		me.game.world.addChild(game.data.Player, 5);

	}
});
 