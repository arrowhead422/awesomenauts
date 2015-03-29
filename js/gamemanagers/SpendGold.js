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

		this.checkBuyKeys();
		return true;
	}, 

	startBuying: function(){ // allows me to pause the game and go right into the startbuying
		this.buying = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		game.data.buyscreen.updateWhenPaused = true;
		game.data.Music = me.audio.stopTrack();
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
					this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B to EXIT. Current gold:" + game.data.gold, this.pos.x, this.pos.y);
					this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + "Cost:" + ((game.data.exp1+1)*10), this.pos.x, this.pos.y + 40);
					this.font.draw(renderer.getContext(), "Skill 2: Fast footing! Current Level:" + game.data.skill2 + "Cost:" + ((game.data.exp2+1)*10), this.pos.x, this.pos.y + 80);
					this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level:" + game.data.skill3 + "Cost:" + ((game.data.exp3+1)*10), this.pos.x, this.pos.y + 120);
					this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level:" + game.data.ability1 + "Cost:" + ((game.data.exp4+1)*10), this.pos.x, this.pos.y + 160);
					this.font.draw(renderer.getContext(), "W Ability: Eat your Creep for Health. Current Level:" + game.data.ability2 + "Cost:" + ((game.data.exp5+1)*10), this.pos.x, this.pos.y + 200);
					this.font.draw(renderer.getContext(), "E Ability: Throw your Spear. Current Level:" + game.data.ability3 + "Cost:" + ((game.data.exp6+1)*10), this.pos.x, this.pos.y + 240);

				}
			}));
		me.game.world.addChild(game.data.buytext,35);
	},

	stopBuying: function(){
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.Player.body.setVelocity(game.data.PlayerMoveSpeed, 22);
		me.game.world.removeChild(game.data.buyscreen);
		game.data.Music = me.audio.playTrack("one");
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);
		me.game.world.removeChild(game.data.buytext);
	},

	checkBuyKeys: function(){
		if (me.input.isKeyPressed("F1")){
			if(this.checksCost(1)){
				this.makePurchase(1);
			}
		}else if (me.input.isKeyPressed("F2")){
			if(this.checksCost(2)){
				this.makePurchase(2);
			}
		}else if (me.input.isKeyPressed("F3")){
			if(this.checksCost(3)){
				this.makePurchase(3);
			}
		}else if (me.input.isKeyPressed("F4")){
			if(this.checksCost(4)){
				this.makePurchase(4);
			}
		}else if (me.input.isKeyPressed("F5")){
			if(this.checksCost(5)){
				this.makePurchase(5);
			}
		}else if (me.input.isKeyPressed("F6")){
			if(this.checksCost(6)){
				this.makePurchase(6);
			}
		}
	},

	checksCost: function(Skill) {
		if(skill===1 && ( game.data.gold >=  ((game.data.skill1 + 1)*10))){
			return true;
		}else if(skill===2 && ( game.data.gold >=  ((game.data.skill2+1)*10))){
			return true;
		}else if(skill===3 && ( game.data.gold >=  ((game.data.skill3+1)*10))){
			return true;
		}else if(skill===4 && ( game.data.gold >=  ((game.data.ability1+1)*10))){
			return true;
		}else if(skill===5 && ( game.data.gold >=  ((game.data.ability2+1)*10))){
			return true;
		}else if(skill===6 && ( game.data.gold >=  ((game.data.ability3+1)*10))){
			return true;
		}else{
			return false;
		}
	},
	makePurchase: function(Skill){
		if(Skill === 1){
			game.data.gold -= ((game.data.Skill1 + 1)* 10);
			game.data.skill1 += 1;
			game.data.Player.attack +=1;
		}else if(skill === 2){
			game.data.gold -= ((game.data.Skill2 + 1)* 10);
			game.data.skill2 += 1;
		}else if(skill === 3){
			game.data.gold -= ((game.data.Skill3 + 1)* 10);
			game.data.skill3 += 1;			
		}else if(skill === 4){
			game.data.gold -= ((game.data.ability1 + 1)* 10);
			game.data.ability1 += 1;
		}else if(skill === 5){
			game.data.gold -= ((game.data.ability2 + 1)* 10);
			game.data.ability2 += 1;
		}else if(skill === 6){
			game.data.gold -= ((game.data.ability3 + 1)* 10);
			game.data.ability3 += 1;
		}
}

});



