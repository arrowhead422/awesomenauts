game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	},

	update: function(){
		if (game.data.Player.dead) {
			me.game.world.removeChild(game.data.Player);
			me.state.current().resetPlayer(10, 0);
		}

		return true;
	}
});


