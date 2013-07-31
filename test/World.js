define(
	['Terrain'],
	function(Terrain) {
					
		function World(seed,wx,wy,h) {
			this._widthX = wx;
			this._widthY = wy;
			this._height = h;

			this._terrain = new Terrain(seed,wx,wy,h);
		}
		World.prototype.getZ = function(x,y) {
			return this._terrain.getZ(x,y);
		}
		World.prototype.setZs = function(points) {
			//var ts = (new Date()).getTime();
			this._terrain.setZs(points);
			//console.info('generated ' + points.length + ' z coordinates in ' + ((new Date()).getTime() - ts)/1000 + ' seconds');
		}
		World.prototype.getInfo = function() {
			return {
				widthX: this._widthX,
				widthY: this._widthY,
				height: this._height
			};
		}
		
		return World;
		
	}
);
