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

	   
	    this.body.setVelocity(5, 20); // this part sets the locating of the player
	    this.facing = "right";//keeps track of which direction your character is going
	   	me.game.viewport.follow(this.pos, me.game.viewport. AXIS.BOTH);
	    //this renderable addanimation idle sets the animation went nothing is pressing
	    this.renderable.addAnimation("idle", [78]);
	    this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
	    // this renderable addanimation controls the animation walk
	   	this.renderable.addAnimation("attack", [65, 66, 67, 69, 70, 71, 72],80);
	    this.renderable.setCurrentAnimation("idle");
	},   

	update: function (delta){
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

		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.falling){
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;

		}




		if(me.input.isKeyPressed("attack")){
			
			if(!this.renderable.isCurrentAnimation("attack")){
				console.log();
				// sets the current animation to attack and once that is over
				//goes back to the idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so that the next timme we start this sequence we begin
				//from the first animation, not wherever we left off when we
				//switched to tanother animation
				this.renderable.setAnimationFrame();

			}
		}



		else if(this.body.vel.x !== 0){

		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");
		}
	}else{
		this.renderable.setCurrentAnimation("idle");
	}

	if(me.input.isKeyPressed("attack")){
			
			if(!this.renderable.isCurrentAnimation("attack")){
				console.log();
				// sets the current animation to attack and once that is over
				//goes back to the idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so that the next timme we start this sequence we begin
				//from the first animation, not wherever we left off when we
				//switched to tanother animation
				this.renderable.setAnimationFrame();

			}
		}


		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);// the code delta runs the animation from your renderable addanimation. 
		return true;


	},

	collideHandler: function(resonse){
		if (response.b.type==='EnemyBaseEntity') {
			var ydif = this.pos.y = response.b.pos.y;
			var xdif = this.pos.x = response.b.pos.x;

			console.log("xdif" + xdif + "ydif" + ydif);

			//if(){
			//	this.body.vel.x = 0;
			//	this.pos.x = this.pos.x -1;
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
			this.health = 10;
			this.alwaysUpdate = true;
			this.body.onCollision = this.onCollision.bind(this);
			console.log("init");
			this.type = "PlayerBaseEntity";		
			
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
			this.health = 10;
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

		}
	});










































