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

	},

	update: function (delta){
		if(me.input.isKeyPressed("right")){
			//sets the position of my x by adding the velocity defined above in.
			//seVelocity() and multiplying itby me.timer.tick.
			//me.timer.tick makes the movement look smoot
			this.body.vel.x += this.body.accel.x * me.timer.tick;

		}
		else{
			this.body.vel.x = 0;
		}

		this.body.update(delta);
		return true;


	}



}); 







































