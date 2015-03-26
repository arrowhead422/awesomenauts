game.GameTimerManger = Object.extend({ // is a object not a entities
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;

	},

	update: function(){
		this.now = new Date().getTime();
		this.GoldTimerCheck();
		this.CreepTimerCheck();
	
	
		return true;
	},
	GoldTimerCheck: function(){
			if (Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)) { // % this is a mod it checks if we have mutiple 10 ?????
			game.data.gold += (game.data.exp+1);
			console.log("Current gold: " + game.data.gold);	
		}

	},
	CreepTimerCheck: function(){
			if (Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) { // % this is a mod it checks if we have mutiple 10 ?????
			this.lastCreep = this.now;
			var creep = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creep, 5);
		}

	}
});

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

game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		this.gameover = false;
	},
	update: function(){
		if (game.data.win === true && !this.gameover) {
			this.gameOver(true);
		}else if(game.data.win === false && !this.gameover){
			this.gameOver(false);
		}
		

		return true;
	},

	gameOver: function(win){
		if (win) {
			game.data.exp += 10;
		}
		else{
			game.data.exp += 1;
		}
		console.log(game.data.exp);
		this.gameover = true;
		me.save.exp = game.data.exp;
		
	}
});


game.SpendGold = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastBuy = new Date().getTime();
		this.pause = false;
		this.alwaysUpdate = true;
		this.updateWhenPasued= true;
		this.buying = false;

	},

	update: function(){
		this.now = new Date().getTime();

		if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
			this.lastBuy = this.now;
			if(!this.buying){
				this.startBuying();
			}else{
				this.stopBuying();
			}

		}
		return true;
	}, 

	startBuying: function(){ // allows me to pause the game and go right into the startbuying
		this.buying = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		game.data.Music = me.audio.stopTrack("one");
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.8);
		me.game.world.addChild(game.data.buyscreen, 34);
		game.data.Player.body.setVelocity(0, 0);
		me.state.pause(me.state.PLAY);
		me.input.bindKey(me.input.KEY.F1, "F1", true);
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		this.setBuyText();
	},

	setBuyText: function(){
		game.data.buytext = new (me.Renderable.extend ({ // % this game world controls the meau
 				init: function(){
 					this._super(me.Renderable, "init", [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
 					this.font = new me.Font("Arial", 26, "white");
 					this.updateWhenPaused = true;
 					this.alwaysUpdate = true;
 				},

 				draw: function(renderer){
					this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B to EXIT", this.pos.x, this.pos.y);

				}
			}));
		me.game.world.addChild(game.data.buytext,35);
	},

	stopBuying: function(){
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.Player.body.setVelocity(game.data.PlayerMoveSpeed, 22);
		me.game.world.removeChild(game.data.buyscreen);
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);
		me.game.world.removeChild(game.data.buytext);
	}

});




