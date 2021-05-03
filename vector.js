function Vector(x = 0, y = 0, z = 0) {
	this.x = x;
	this.y = y;
	this.z = z;
}

function AddVectors(vec1, vec2 = new Vector()) {
	return new Vector(
		vec1.x + vec2.x, 
		vec1.y + vec2.y, 
		vec1.z + vec2.z
	)
}

function SubtractVectors(vec1, vec2 = new Vector()) {
	return new Vector(
		vec1.x - vec2.x, 
		vec1.y - vec2.y, 
		vec1.z - vec2.z
	)
}

function DotProduct(vec1, vec2 = new Vector(1, 1, 1)) {
	return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
}

function CrossProduct(vec1, vec2 = new Vector()) {
	return new Vector(
		vec1.y * vec2.z - vec1.z * vec2.y,
		vec1.z * vec2.x - vec1.x * vec2.z,
		vec1.x * vec2.y - vec1.y * vec2.x
	);
}

Vector.prototype = {
	length: function() {
		return Math.sqrt(DotProduct(this));
	},

	multiply: function(factor = -1) {
		this.x *= factor;
		this.y *= factor;
		this.z *= factor;
	},

	normalize: function() {
		this.x /= this.length;
		this.y /= this.length;
		this.z /= this.length;
	}
}

let vec1 = new Vector(1, 2, 3);
