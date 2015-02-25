game.GameManger = Object.extend({ // is a object not a entities
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;

	},

	update: function(){
		this.now = new Date().getTime();

		if (game.data.Player.dead) {
			me.game.world.removeChild(game.data.Player);
			me.state.current().resetPlayer(10, 0);
		}

		if (Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)) { // % this is a mod it checks if we have mutiple 10 ?????
			game.data.gold += 1;
			console.log("Current gold: " + game.data.gold);	
	}


		if (Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) { // % this is a mod it checks if we have mutiple 10 ?????
			this.lastCreep = this.now;
			var creep = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creep, 5);
	}

		return true;
	}
});




