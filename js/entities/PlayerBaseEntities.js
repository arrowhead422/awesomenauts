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
