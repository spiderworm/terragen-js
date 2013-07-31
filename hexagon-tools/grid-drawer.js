define(
	[
		'./tools',
		'./Grid'
	],
	function(
		HT,
		HexGrid
	) {
	
		var config = {
			z: 50,
			ratio: 1.1547005383792515290182975610039,
			width: 100.0,
			height: 86.60254037844388
		};
		
				
		function findHexWithSideLengthZAndRatio()
		{
			var z = config.z;
			var r = config.ratio;
			
			//solve quadratic
			var r2 = Math.pow(r, 2);
			var a = (1 + r2)/r2;
			var b = z/r2;
			var c = ((1-4.0*r2)/(4.0*r2)) * (Math.pow(z, 2));
			
			var x = (-b + Math.sqrt(Math.pow(b,2)-(4.0*a*c)))/(2.0*a);
			
			var y = ((2.0 * x) + z)/(2.0 * r);
			
			var width = ((2.0*x)+z);
			var height = (2.0*y);

			HT.Hexagon.Static.WIDTH = width;
			HT.Hexagon.Static.HEIGHT = height;
			HT.Hexagon.Static.SIDE = z;
		}

		function findHexWithWidthAndHeight()
		{
			var width = config.width;
			var height = config.height;
			
			
			var y = height/2.0;
			
			//solve quadratic
			var a = -3.0;
			var b = (-2.0 * width);
			var c = (Math.pow(width, 2)) + (Math.pow(height, 2));
			
			var z = (-b - Math.sqrt(Math.pow(b,2)-(4.0*a*c)))/(2.0*a);
			
			var x = (width - z)/2.0;
			
			var contentDiv = document.getElementById("hexStatus");

			HT.Hexagon.Static.WIDTH = width;
			HT.Hexagon.Static.HEIGHT = height;
			HT.Hexagon.Static.SIDE = z;
		}

		function drawHexGrid(canvas)
		{
			var grid = new HexGrid(800, 600);
			var ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, 800, 600);
			for(var h in grid.Hexes)
			{
				grid.Hexes[h].draw(ctx);
			}
		}

		function getHexGridZR(canvas)
		{
			findHexWithSideLengthZAndRatio();
			drawHexGrid(canvas);
		}

		function getHexGridWH(canvas)
		{
			findHexWithWidthAndHeight();
			drawHexGrid(canvas);
		}

		function changeOrientation(canvas)
		{
			if(document.getElementById("hexOrientationNormal").checked)
			{
				HT.Hexagon.Static.ORIENTATION = HT.Hexagon.Orientation.Normal;
			}
			else
			{
				HT.Hexagon.Static.ORIENTATION = HT.Hexagon.Orientation.Rotated;
			}
			drawHexGrid(canvas);
		}

		function addHexToCanvasAndDraw(canvas, x, y)
		{
			HT.Hexagon.Static.DRAWSTATS = true;
			var hex = new HT.Hexagon(null, x, y);

			var ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, 800, 600);
			hex.draw(ctx);
		}
		
		return {
			drawGridWH: function(canvas,w,h) {
				config.width = w;
				config.height = h;
				getHexGridWH(canvas);
			},
			drawGridZR: function(canvas,z,r) {
				config.z = z;
				config.ratio = r * 1.1547005383792515290182975610039;
				getHexGridZR(canvas);
			}
		};
	
	}
);