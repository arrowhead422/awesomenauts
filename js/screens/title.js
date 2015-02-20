game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	

		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title')), -10);		 
 
 		me.input.bindKey(me.input.KEY.ENTER, "start");

 		me.game.world.addChild(new (me.Renderable.extend ({ // % this game world controls the meau
 			init: function(){
 				this._super(me.Renderable, "init", [510, 30, me.game.viewport.width, me.game.viewport.height]);
 				this.font = new me.Font("Arial", 46, "white"); 
 			},

 			draw: function(rendrer){
				this.font.draw(rendrer.getContext(), "awesomenauts", 450, 130);
				this.font.draw(rendrer.getContext(), "Press ENTER to play!", 250, 530);

			}
	
	

 		})));

 		this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {// because of title js we can not have upadate function so instead we use handler to listing or check when the key is press down and remove the title screen
  			if(action === "start"){
  				me.state.change(me.state.PLAY);
  			}

  		});
	},


	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.event.unsubscribe(this.handler);
		 
	}
});




































































