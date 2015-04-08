game.SpearThrow = game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings, facing){
		this._super(me.Entity, 'init', [x, y, {
			image: "spear",
			width: 48,
			height: 48,
			spritewidth: "48",
			spriteheight:"48",
			getShape: function(){
				return (new me.Rect(0, 0, 48, 48)).toPolygon();
			}
					// is almost the same function as enemy base entities
			}]);
			
			this.alwaysUpdate = true;
			this.body.setVelocity(8, 0);
			this.attack = game.data.ability3*3;
			this.type = "spear";
			this.facing = facing
			
			},

	update: function(delta){
		if(this.facing ==="left"){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
		}else{
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}

		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		
		me.collision.check(this,true, this.collideHandler.bind(this), true);
     	
     	this.body.update(delta);
		
		this._super(me.Entity, "update", [delta]);// the code delta runs the animation from your renderable addanimation. 
		
		return true;
	},

	collideHandler: function(response){
	if (response.b.type==='EnemyBase' || response.b.type==='EnemyBase' ) {
		response.b.loseHealth(this.attack);
		me.game.world.removeChild(this);
		}
	}

});