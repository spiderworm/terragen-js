define(
	function() {
		
		function MouseState() {
			this._moveListeners = [];
			
			var mouse = this;
			
			document.addEventListener(
				'mousemove',
				function(e) {
					mouse.x = e.pageX;
					mouse.y = e.pageY;
					mouse.xRatio = e.pageX / window.innerWidth;
					mouse.yRatio = e.pageY / window.innerHeight;
					for(var i in mouse._moveListeners) {
						try {
							mouse._moveListeners[i]();
						} catch(e) {
							if(window.console)
								console.info(e);
						}
					}
				}
			);

		}
		
		MouseState.prototype.onMove = function(handler) {
			this._moveListeners.push(handler);
		}
		
		return MouseState;
		
	}
);