function LocInRange(loc, loc1, loc2, type = 1) {
	if (type == 1 && loc.x >= loc1.x && loc.x <= loc2.x && loc.y >= loc1.y && loc.y <= loc2.y) return true
	if (type == 2 && loc.x > loc1.x && loc.x < loc2.x && loc.y > loc1.y && loc.y < loc2.y) return true
	return false
}

function Body(loc, width, height) {
	this.loc = loc;
	this.width = width;
	this.height = height;
	this.checkCollision = (check) => {
		let bodyPoints = [
			new Vector(this.loc.x - (this.width / 2), this.loc.y - (this.height / 2)), 
			new Vector(this.loc.x + (this.width / 2), this.loc.y - (this.height / 2)), 
			new Vector(this.loc.x + (this.width / 2), this.loc.y + (this.height / 2)), 
			new Vector(this.loc.x - (this.width / 2), this.loc.y + (this.height / 2))
		]
		let checkPoints = [
			new Vector(check.loc.x - (check.width / 2), check.loc.y - (check.height / 2)), 
			new Vector(check.loc.x + (check.width / 2), check.loc.y - (check.height / 2)), 
			new Vector(check.loc.x + (check.width / 2), check.loc.y + (check.height / 2)), 
			new Vector(check.loc.x - (check.width / 2), check.loc.y + (check.height / 2))
		]
		for (let i = 0; i < bodyPoints.length; i++) {
			let item = bodyPoints[i]
			if (LocInRange(item, checkPoints[0], checkPoints[2])) return item
		}
		for (let i = 0; i < checkPoints.length; i++) {
			let item = checkPoints[i]
			if (LocInRange(item, bodyPoints[0], bodyPoints[2])) return item
		}
		return false
	}
}

function drawBody(body, color = '#fff') {
	ctx.beginPath();
	ctx.rect(body.loc.x - (body.width / 2), body.loc.y - (body.height / 2), body.width, body.height);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function normalForceX(loc, body, velo) {
	veloInverse = new Vector(velo.x, velo.y)
	// veloInverse.multiply()
	originalLoc = AddVectors(loc, veloInverse.multiply())
	const alignX = new Vector(velo.x, 0)
	const loc1 = new Vector(body.loc.x - (body.width / 2), body.loc.y - (body.height / 2))
	const loc2 = new Vector(body.loc.x + (body.width / 2), body.loc.y + (body.height / 2))
	let finalNormal = new Vector()
	let shift = new Vector()
	if (LocInRange(AddVectors(originalLoc, alignX), loc1, loc2, 2)) {
		let normal = alignX
		normal.multiply()
		if (velo.x > 0) {
			shift = AddVectors(shift, new Vector(body.loc.x - (body.width / 2) - loc.x, 0))
		}
		if (velo.x < 0) {
			shift = AddVectors(shift, new Vector(body.loc.x + (body.width / 2) - loc.x, 0))
		}
		shift = AddVectors(shift, normal)
	}
	return [finalNormal, shift]
}

function normalForceY(loc, body, velo) {
	veloInverse = new Vector(velo.x, velo.y)
	originalLoc = AddVectors(loc, veloInverse.multiply())
	const alignY = new Vector(0, velo.y)
	const loc1 = new Vector(body.loc.x - (body.width / 2), body.loc.y - (body.height / 2))
	const loc2 = new Vector(body.loc.x + (body.width / 2), body.loc.y + (body.height / 2))
	let finalNormal = new Vector()
	let shift = new Vector()
	if (LocInRange(AddVectors(originalLoc, alignY), loc1, loc2, 2)) {
		lastJump = 0
		let normal = alignY
		normal.multiply()
		if (originalLoc.x < body.loc.x + (body.width / 2) && originalLoc.x > body.loc.x - (body.width / 2)) {
			if (velo.y > 0) {
				shift = AddVectors(shift, new Vector(0, body.loc.y - (body.height / 2) - loc.y))
			}
			if (velo.y < 0) {
				shift = AddVectors(shift, new Vector(0, body.loc.y + (body.height / 2) - loc.y))
			}
		}
		finalNormal = AddVectors(finalNormal, normal)
	}
	return [finalNormal, shift]
}
