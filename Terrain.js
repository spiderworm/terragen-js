define(
	[
		'hexagon-tools/grid-drawer',
		'hexagon-tools/Grid',
		'DiamondSquares'
	],
	function(
		gridDrawer,
		Grid,
		DiamondSquares
	) {

		function Terrain(seed,wx,wy,wz) {
			var shorter = wx > wy ? wy : wx;
			var subdivs = 1;
			while(shorter/10 > Math.pow(2,subdivs))
				subdivs++;
			var jaggedness = 1-Math.pow(.88,subdivs);
			console.info(subdivs);
			console.info(jaggedness);
			this._diamondSquares = new DiamondSquares(seed,wx,wy,wz,subdivs,jaggedness);			
		}
		Terrain.prototype.draw = function(canvas) {
			gridDrawer.drawGridZR(canvas,50,1);
		}
		Terrain.prototype.getZ = function(x,y) {
			return this._diamondSquares.getPointZ(x,y);
		}
		Terrain.prototype.setZs = function(points) {
			for(var i in points) {
				points[i].z = this._diamondSquares.getPointZ(points[i].x,points[i].y);
			}
		}
		
		return Terrain;
	
	}
);
