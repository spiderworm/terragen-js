define(
	['./Three'],
	function() {
		var lib = {};
		lib.XYPlaneGeometry = function(a,b,c,d) {
			var result = new THREE.PlaneGeometry(a,b,c,d);
			var verts = result.vertices;
			for(var i in verts) {
				verts[i].y = -verts[i].z;
				verts[i].z = 0;
			}
			return result;
		}
		for(var i in lib)
			THREE[i] = lib[i];
		return lib;
	}
);