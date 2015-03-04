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
				game.data.Win = true;
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