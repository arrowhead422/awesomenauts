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
	
	game.PlayerBaseEntity = me.Entity.extend({ // this code here sorts out how does our base play out
		init: function (x, y, settings){
			this._super(me.Entity, 'init',[x, y, {
				image: "tower",
				width: 100,
				height: 100,
				spriteheight: "100",
				spriteheight: "100",
				getShape: function(){
					return (new me.Rect(0, 0, 100, 70)).toPolygon();
				}
			}]);
			this.broken = false;
			this.health = game.data.PlayerBaseHealth;
			this.alwaysUpdate = true;
			this.body.onCollision = this.onCollision.bind(this);
			this.type = "PlayerBase";		
			
			this.renderable.addAnimation("idle", [0]); // line 77 to 79 help to display the player tower
			this.renderable.addAnimation("broken", [1]);
			this.renderable.setCurrentAnimation("idle");

		},

		update:function(delta){
			if (this.health<=0) {
				this.broken = true;
				this.renderable.setCurrentAnimation("broken");
			}
			this.body.update(delta);

			this._super(me.Entity, "update", [delta]);
			return true;
		},

		loseHealth: function(damage){
			this.health = this.health - damage;

		},

		onCollision: function(){

		}
	});



// the enemybaseentity are the same player base entity
	game.EnemyBaseEntity = me.Entity.extend({ // this code here sorts out how does our base play out
		init: function (x, y, settings){
			this._super(me.Entity, 'init',[x, y, {
				image: "tower",
				width: 100,
				height: 100,
				spriteheight: "100",
				spriteheight: "100",
				getShape: function(){
					return (new me.Rect(0, 0, 100, 100)).toPolygon();
				}
			}]);
			this.broken = false;
			this.health = game.data.EnemyBaseHealth;
			this.alwaysUpdate = true;
			this.body.onCollision = this.onCollision.bind(this);

			this.type = "EnemyBaseEntity";		


			this.renderable.addAnimation("idle", [0]); // line 119 to 121 controls or display the image of enemys base
			this.renderable.addAnimation("broken", [1]);
			this.renderable.setCurrentAnimation("idle");
		},

		update:function(delta){
			if (this.health<=0) {
				this.broken = true;
				this.renderable.setCurrentAnimation("broken");

			}
			this.body.update(delta);

			this._super(me.Entity, "update", [delta]);
			return true;
		},

		onCollision: function(){

		},

		loseHealth: function(){
			this.health--;
		}
	});

game.EnemyCreep = me.Entity.extend({ // enemy team creep
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight:"64",
			getShape: function(){
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
					// is almost the same function as enemy base entities
		}]);
		this.health = game.data.EnemyCreepHealth;
		this.alwaysUpdate = true;
		//this.attack lets us know if the enemy is currently attacking
		this.attacking = false;
		//keeps track of when our creep last attacked, anything
		this.lastAttacking = new Date().getTime();
		//keep track of the last time our creep hit anything
		this.lastHit = new Date().getTime();
		this.now = new Date(). getTime();
		this.body.setVelocity(3, 20);

		this.type = "EnemyCreep";

		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");

	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},

	update: function(delta){ //update the enemey creep
		if (this.health <=0) {
			me.game.world.removeChild(this);
		}

		this.now = new Date().getTime();

		this.body.vel.x -= this.body.accel.x * me.timer.tick;


		me.collision.check(this,true, this.collideHandler.bind(this), true);

     	this.body.update(delta);

		this._super(me.Entity, "update", [delta]);// the code delta runs the animation from your renderable addanimation. 
		

		this._super(me.Entity, "update", [delta]);	
		return true;
},

collideHandler: function(response){
	if (response.b.type==='PlayerBase') {
		this.attacking = true;
		//this.lastAttacking = this.now;
		this.body.vel.x = 0;
		//keeps moving the creep to the right to maintain its position
		this.pos.x = this.pos.x + 1;
		//checks that it has been at least 1 second since this creep hit a base
		if ((this.now-this.lastHit >= 1000)){
			this.lastHit = this.now;

			response.b.loseHealth(game.data.EnemyCreepAttack);
		}
	}else if (response.b.type==='PlayerEntity') {
		var xdif = this.pos.x - response.b.pos.x;

		this.attacking = true;
		//this.lastAttacking = this.now;
		
		if(xdif>0){
					
			//keeps moving the creep to the right to maintain its position	
			this.pos.x = this.pos.x + 1;
			this.body.vel.x = 0;

		}
		//checks that it has been at least 1 second since this creep hit a base
		if ((this.now-this.lastHit >= 1000)  && xdif>0){

			this.lastHit = this.now;

			response.b.loseHealth(game.data.EnemyCreepAttack);
		}
	}
}
});



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




































































