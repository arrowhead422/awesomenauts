// TODO
game.PlayerEntity = me.Entity.extend({// game and me .Entity is a class
	init: function (x, y, settings) { // this is our constructor function
		this._super(me.Entity, 'init', [x, y,{
			image: "player",
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function (){
				return(new me.Rect(0, 0, 64, 64)).toPolygon();

				}
		}]);
		//from video 24 all the game.date info are all stored in the game.entities.
	   	this.type= "PlayerEntity";
	   	this.health = game.data.PlayerHealth;// player's health are stored in the game; date
	    this.body.setVelocity(game.data.PlayerMoveSpeed, 20); // this part sets the speed of the player
	    this.facing = "right";//keeps track of which direction your character is going
	   	this.now = new Date().getTime();// it keep track of time
	   	this.lastHit = this.now;
	   	this.dead = false;
	   	this.attack = game.data.PlayerAttack;
	   	this.lastAttack = new Date().getTime();
	   	me.game.viewport.follow(this.pos, me.game.viewport. AXIS.BOTH);
	    //this renderable addanimation idle sets the animation went nothing is pressing
	    this.renderable.addAnimation("idle", [78]);
	    this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
	    // this renderable addanimation controls the animation walk
	   	this.renderable.addAnimation("attack", [65, 66, 67, 69, 70, 71, 72],80);
	    this.renderable.setCurrentAnimation("idle");
	},   

	update: function (delta){
		this.now = new Date().getTime();

		if (this.health <= 0) {
			this.dead = true;
			
		}


		if(me.input.isKeyPressed("right")){
			//sets the position of my x by adding the velocity defined above in.
			//seVelocity() and multiplying itby me.timer.tick.
			//me.timer.tick makes the movement look smoot
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			
			this.flipX(true);
		}else if(me.input.isKeyPressed("left")){
			this.facing = "left";
			this.body.vel.x -=this.body.accel.x * me.timer.tick;
			this.flipX(false);

		}
		else{
			this.body.vel.x = 0;
		}

		if(me.input.isKeyPressed("jump")){

			if(!this.body.jumping && !this.body.falling) {

				this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
				this.body.jumping = true;
				

			}
			
		}




		if(me.input.isKeyPressed("attack")){
			
			if(!this.renderable.isCurrentAnimation("attack")){
				
				// sets the current animation to attack and once that is over
				//goes back to the idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so that the next timme we start this sequence we begin
				//from the first animation, not wherever we left off when we
				//switched to tanother animation
				this.renderable.setAnimationFrame();

			}
		}



		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){

		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");
		}
	}else if(!this.renderable.isCurrentAnimation("attack")){
		this.renderable.setCurrentAnimation("idle");
	}

	


		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);// the code delta runs the animation from your renderable addanimation. 
		return true;


	},

	loseHealth: function(damage){
			this.health = this.health - damage;
		
	},

	collideHandler: function(response){
		if (response.b.type==='EnemyBaseEntity') {
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;

			console.log("xdif" + xdif + "ydif" + ydif);



			if (ydif<-40 && xdif< 70 && xdif>-35) {// player collide with the top of the base
				this.body.falling = false;
				this.body.vel.y = -1;
			}

			else if(xdif>-35 && this.facing==='right' && (xdif<0)){ // when player collide with enemybase it will stop the player from the right side
				this.body.vel.x = 0;
				//this.pos.x = this.pos.x -1;
			}else if (xdif<70 && this.facing==='left' && xdif>0) {// the left side
				this.body.vel.x = 0;
				//this.pos.x = this.pos.x +1;

			}

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.PlayerAttackTimer){
			
				this.lastHit = this.now;
				response.b.loseHealth(game.data.PlayerAttack);
			}
		}
		else if (response.b.type==='EnemyCreep') {
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			if(xdif>0){
				//this.pos.x = this.pos.x + 1;
				if (this.facing==="left") {
					this.body.vel.x = 0;
				}
			}else{
				//this.pos.x = this.pos.x - 1;
				if (this.facing==="right") {
					this.body.vel.x = 0;
			}
}
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.PlayerAttackTimer
				&& (Math.abs(ydif) <=40) && 
				(((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
				){
				this.lastHit = this.now;
					//if the creeps health is less than our attack, execute code in if statement
				if (response.b.health <= game.data.PlayerAttack) {
					//adds one gold for a creep kill
					game.data.gold += 1;
					console.log("Current gold" + game.data.gold);
				}

				response.b.loseHealth(game.data.PlayerAttack);
			}
		}
			
	}
		
	



}); 
	











































































