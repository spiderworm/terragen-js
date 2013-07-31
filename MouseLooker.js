define(
	['./MouseState'],
	function(MouseState) {
		
		function MouseLooker() {
			var mouseState = new MouseState();
			this.rotationVelocity = {
				x: 0,
				y: 0
			};
			var vel = this.rotationVelocity;
			
			var stillZoneRatioX = .01;
			var stillZoneRatioY = .01
			
			var leftZone = new Zone(.5 - (.5 * stillZoneRatioX), 0);
			var rightZone = new Zone(.5 + (.5 * stillZoneRatioX), 1);
			var topZone = new Zone(.5 - (.5 * stillZoneRatioY), 0);
			var bottomZone = new Zone(.5 + (.5 * stillZoneRatioY), 1);
			
			mouseState.onMove(
				function() {
					var left = leftZone.calc(mouseState.xRatio);
					var right = rightZone.calc(mouseState.xRatio);
					var top = topZone.calc(mouseState.yRatio);
					var bottom = bottomZone.calc(mouseState.yRatio);
					
					vel.x = (left > 0 ? left*left : -right*right);
					vel.y = (top > 0 ? -top*top : bottom*bottom);
				}
			);
		}
		
		function Zone(zero,one) {
			this.zero = zero;
			this.one = one;
			this.diff = one - zero;
		}
		Zone.prototype.calc = function(point) {
			if(this.diff >= 0 && point >= this.zero && point <= this.one)
				return -(point - this.zero) / this.diff;
			if(this.diff < 0 && point <= this.zero && point >= this.one)
				return (point - this.zero) / this.diff;
			return 0;
		}
		
		return MouseLooker;
		
	}
);