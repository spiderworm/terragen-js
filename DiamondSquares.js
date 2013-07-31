define(
	['util/Random-Giver'],
	function(RandomGiver) {
		
		function DiamondSquares(seed,widthX,widthY,height,maxDivisions,jaggedness) {
			this._randomGen = new RandomGiver(seed);
			this._widthX = widthX;
			this._widthY = widthY;
			this._height = height;
			this._countX = 1;
			this._countY = 1;
			this._maxDivisions = maxDivisions;
			this._jaggedness = jaggedness;
			
			if(widthX/widthY >= 1.5)
				this._countX = Math.ceil(widthX/widthY);
			if(widthY/widthX >= 1.5)
				this._countY = Math.ceil(widthY/widthX);
			
			this._nodes = {};

			for(var y=0; y<this._countY; y++) {
				for(var x=0; x<this._countX; x++) {
					this._createNode(x,y,height/2);
				}
			}
		}

		DiamondSquares.prototype.getPointZ = function(x,y) {
			x = this._translateToNodeXCoord(x);
			y = this._translateToNodeYCoord(y);

			var ds = this;
			
			function Point(pointX,pointY) {
				this.x = pointX;
				this.y = pointY;
				this.dist = Math.sqrt(Math.pow(pointX-x,2) + Math.pow(pointY-y,2));
				var node = ds._getNode(pointX,pointY);
				this.z = node.z;
				this.grad = node.grad;
			}
			
			function getSquare() {
				var width = Math.pow(.5,ds._maxDivisions);
				var left = width * Math.floor(x/width);
				var right = left + width;
				var top = width * Math.floor(y/width);
				var bot = top + width;
				return [
					new Point(left,top),
					new Point(right,top),
					new Point(left,bot),
					new Point(right,bot)
				];
			}

			var nearestDist = Infinity;
			var nearestPoint = null;
						
			var points = getSquare();
			var totalDist = points[0].dist + points[1].dist + points[2].dist + points[3].dist;

			var z =	(
				((points[0].z) * (.5-points[0].dist/totalDist)) +
				((points[1].z) * (.5-points[1].dist/totalDist)) +
				((points[2].z) * (.5-points[2].dist/totalDist)) +
				((points[3].z) * (.5-points[3].dist/totalDist))
			);

			return z;

		}

		DiamondSquares.prototype._getNode = function(x,y) {
		
			var ds = this;

			function createNode() {

				//console.info('trying to create node:',x,y);
			
				var point = {
					x: x,
					y: y,
					subdivisionWidth: null,
					subdivisions: null,
					fromDiamondPhase: null
				};
				
				function setSubdivisions() {
					var result = ds._maxDivisions + 1;
					while((x/Math.pow(.5,result-1))%1 == 0 && (y/Math.pow(.5,result-1))%1 == 0) {
						result -= 1;
					}
					if(result > ds._maxDivisions)
						throw new Error('_getNode passed x,y coords that don\'t fit on the grid system');
					point.subdivisions = result;
					point.subdivisionWidth = Math.pow(.5,result);
				}

				function setPhase() {
					point.fromDiamondPhase = (
						((x+point.subdivisionWidth)%(2*point.subdivisionWidth)) == 0 && 
						((y+point.subdivisionWidth)%(2*point.subdivisionWidth)) == 0
					);
					//console.info('setting phase for:',x,y);
					//console.info('width is:',point.subdivisionWidth);
					//console.info('result was:',point.fromDiamondPhase);
				}
			
				setSubdivisions();
				setPhase();
							
				//console.info('point: ',point);
				
				var surroundingPoints;
			
				if(point.fromDiamondPhase) {
					surroundingPoints = [
						[x-point.subdivisionWidth,y-point.subdivisionWidth],
						[x+point.subdivisionWidth,y-point.subdivisionWidth],
						[x-point.subdivisionWidth,y+point.subdivisionWidth],
						[x+point.subdivisionWidth,y+point.subdivisionWidth]
					];
				} else {
					surroundingPoints = [
						[x,y-point.subdivisionWidth],
						[x-point.subdivisionWidth,y],
						[x+point.subdivisionWidth,y],
						[x,y+point.subdivisionWidth]
					];
				}
				
				var z = 0;
				for(var i in surroundingPoints)
					z += ds._getNode(surroundingPoints[i][0],surroundingPoints[i][1]).z;
				z = z/surroundingPoints.length;
				var grad = ds._height * ((2 * ds._randomGen.determine(x+','+y)) - 1);
				z += grad * Math.pow(ds._jaggedness,point.subdivisions);

				return ds._createNode(x,y,z,grad);
			}
			
			x = this._normalizeX(x);
			y = this._normalizeY(y);
			
			var node = this._nodes[x + ',' + y];
			
			return node || createNode();
		}

		DiamondSquares.prototype._normalizeX = function(x) {
			while(x<0) {
				x+=this._countX;
			}
			while(x>=this._countX) {
				x-=this._countX;
			}
			return x;
		}
				
		DiamondSquares.prototype._normalizeY = function(y) {
			while(y<0) {
				y+=this._countY;
			}
			while(y>=this._countY) {
				y-=this._countY;
			}
			return y;
		}
		
		DiamondSquares.prototype._createNode = function(x,y,z,grad) {
			var node = {
				x: x,
				y: y,
				z: z,
				grad: grad
			};
			this._nodes[x + ',' + y] = node;
			return node;
		}

		DiamondSquares.prototype._translateToNodeXCoord = function(n) {
			return n*this._countX/this._widthX;
		}
		DiamondSquares.prototype._translateToNodeYCoord = function(n) {
			return n*this._countY/this._widthY;
		}

		return DiamondSquares;
		
	}
);
