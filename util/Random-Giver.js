define(
	['../external/seedrandom'],
	function() {
		
		function RandomGiver(seed) {
			this.seed = seed || Math.random();
			this.rand = new window.Rand(seed);
		}
		RandomGiver.prototype.next = function() {
			return this.rand.next();
		}
		RandomGiver.prototype.determine = function(seed) {
			return this.rand.determine(seed);
		}
		
		return RandomGiver;
		
	}
);