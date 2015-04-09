game.MiniMap = me.Entity.extend({ // minimap 
	init: function(x, y, settings)
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			width: 1004,
			height: 153,
			spritewidth: "1004",
			spriteheight: "153",
			getShape: function(){
				return (new me.Rect(0, 0, 1004, 153)). toPolygon();
			}

		}]);

		this.floating = true; //floating will make sure our minimap stays where it where

	}
});