var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const minWidth = canvas.width * (canvas.width > canvas.height) + canvas.height * (canvas.height > canvas.width)
const scale = 1250 / minWidth

let lastJump = 0

const controls = {
	a: new Vector(-2, 0),
	d: new Vector(2, 0),
	' ': new Vector(0, -7)
}

var moving = {
	a: false,
	d: false,
	' ': false
}

const gravity = new Vector(0, 0.07)

let playerBody = new Body(new Vector(300, 200), 50, 50)
let playerVelo = new Vector(0, 0)

let rectangleList = [
	new Body(new Vector(350, 500), 500, 50),
	new Body(new Vector(450, 300), 50, 200),
	new Body(new Vector(650, 450), 50, 150),
	new Body(new Vector(50, 450), 50, 150)
]

function draw () {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	playerVelo = AddVectors(playerVelo, gravity)

	let playerMove = new Vector()
	if (moving.a) playerMove = AddVectors(playerMove, controls.a)
	if (moving.d) playerMove = AddVectors(playerMove, controls.d)

	playerVelo = AddVectors(playerVelo, playerMove)
	
	for (let i = 0; i < rectangleList.length; i++) {
		let rectangleItem = rectangleList[i]

		if (!playerBody.checkCollision(rectangleItem)) continue
		let normal = normalForceY(playerBody.checkCollision(rectangleItem), rectangleItem, playerVelo)
		playerVelo = AddVectors(playerVelo, normal[0])
		playerBody.loc = AddVectors(playerBody.loc, normal[1])

		if (!playerBody.checkCollision(rectangleItem)) continue
		normal = normalForceX(playerBody.checkCollision(rectangleItem), rectangleItem, playerVelo)
		playerVelo = AddVectors(playerVelo, normal[0])
		playerBody.loc = AddVectors(playerBody.loc, normal[1])
	}

	playerBody.loc = AddVectors(playerBody.loc, playerVelo)
	playerMove.multiply()
	playerVelo = AddVectors(playerVelo, playerMove)

	drawBody(rectangleList[0], '#888')
	drawBody(rectangleList[1], '#888')
	drawBody(rectangleList[2], '#888')
	drawBody(rectangleList[3], '#888')
	drawBody(playerBody, '#f00')
};

function startMove(e) {
	if (e.key == 'Enter') {
		console.log(playerBody.loc)
		console.log(playerVelo)
		debug = true
	}
	if (!controls.hasOwnProperty(e.key)) return
	moving[e.key] = true
	let grounded = false
	for (let i = 0; i < rectangleList.length; i++) {
		let rectangleItem = rectangleList[i]
		if (playerBody.checkCollision(rectangleItem)) {
			grounded = true
			break
		}
	}
	if (!grounded) return
	let date = new Date()
	if (date.getTime() - lastJump < 700) return
	lastJump = date.getTime()
	if (e.key == ' ') playerVelo = AddVectors(playerVelo, controls[e.key])
}

function stopMove(e) {
	if (e.key == 'Enter') {
		debug = false
	}
	if (!controls.hasOwnProperty(e.key)) return
	if (e.key != 'a' && e.key != 'd') return
	moving[e.key] = false
}

document.addEventListener("keypress", startMove);
document.addEventListener("keyup", stopMove);

setInterval(draw, 10);
