game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	

		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10);		 
		document.getElementById("input").style.visibility = "visible";
		document.getElementById("register").style.visibility = "visible";

		me.input.unbindKey(me.input.KEY.F1.B);
		me.input.unbindKey(me.input.KEY.F2.Q);
		me.input.unbindKey(me.input.KEY.F3.E);
		me.input.unbindKey(me.input.KEY.F4.W);
		me.input.unbindKey(me.input.KEY.F5.A); 

 		me.game.world.addChild(new (me.Renderable.extend ({ // % this game world controls the meau
 			init: function(){
 				this._super(me.Renderable, "init", [10, 10, 300, 50]);
 				this.font = new me.Font("Arial", 26, "white");
 			},

 			draw: function(renderer){
				this.font.draw(renderer.getContext(), "PICK A UserName And PassWord", this.pos.x, this.pos.y);
				
			}

			
		})));

		
},



	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		document.getElementById("input").style.visibility = "hidden";
		document.getElementById("register").style.visibility = "hidden";
		
	}
});