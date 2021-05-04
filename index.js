const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const Vector = SAT.Vector
const Box = SAT.Box
const Polygon = SAT.Polygon

ctx.canvas.width  = window.innerWidth
ctx.canvas.height = window.innerHeight

const gConstant = -0.07

var debug = false

let aPressed = false
let dPressed = false
let jumping = false

let playerBody = new Box(new Vector(150, 250), 50, 50)
let playerVelo = new Vector()

let gAcceleration = 0

let bodyList = [
	new Box(new Vector(50, 50), 250, 50),
	new Box(new Vector(350, 150), 50, 250)
]

function drawBox(box, color) {
	ctx.beginPath();
	ctx.rect(box.pos.x, canvas.height - box.pos.y - box.h, box.w, box.h);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	
	if (aPressed) playerBody.pos.add(new Vector(-2, 0))
	if (dPressed) playerBody.pos.add(new Vector(2, 0))

	gAcceleration += gConstant
	if (gAcceleration > 4) gAcceleration = 4
	playerBody.pos.add(new Vector(0, gAcceleration))

	for (let i = 0; i < bodyList.length; i++) {
		let item = bodyList[i]
		drawBox(item, '#fff')

		let response = new SAT.Response()
		let collided = SAT.testPolygonPolygon(playerBody.toPolygon(), item.toPolygon(), response)
		if (collided) {
			playerBody.pos.sub(response.overlapV)
			if (response.overlapV.y) gAcceleration = 0
			jumping = false
		}
		response.clear()
	}

	drawBox(playerBody, '#f00')
}

function keyDown(event) {
	if (event.key == 'Enter') {
		debug = true
	}
	if (event.key == 'a') aPressed = true
	if (event.key == 'd') dPressed = true
	if (event.key == ' ' && !jumping) gAcceleration += 4
	jumping = true
}

function keyUp(event) {
	if (event.key == 'Enter') debug = false
	if (event.key == 'a') aPressed = false
	if (event.key == 'd') dPressed = false
}

document.addEventListener("keypress", keyDown)
document.addEventListener("keyup", keyUp)

setInterval(loop, 10);