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
	    //this renderable addanimation idle sets the animation went nothing is pressing
	    this.renderable.addAnimation("idle", [78]);
	    this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
	    // this renderable addanimation controls the animation walk
	    this.renderable.setCurrentAnimation("idle");
	},   

	update: function (delta){
		if(me.input.isKeyPressed("right")){
			//sets the position of my x by adding the velocity defined above in.
			//seVelocity() and multiplying itby me.timer.tick.
			//me.timer.tick makes the movement look smoot
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			
			this.flipX(true);
		}
		else{
			this.body.vel.x = 0;
		}

		if(this.body.vel.x !== 0){

		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");
		}
	}else{
		this.renderable.setCurrentAnimation("idle");
	}

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);// the code delta runs the animation from your renderable addanimation. 
		return true;


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
					return (new me.Rect(0, 0, 100, 100)).toPolygon();
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










































