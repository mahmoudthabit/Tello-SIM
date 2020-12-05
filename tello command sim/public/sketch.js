const CELLS_PER_DIMENSION = 21;
const CELLS_RIGHT_OF_CENTER = (CELLS_PER_DIMENSION - 1) / 2;
let pos;
let keyMappings;
let rightmostCellCenter;
var socket;

function setup() {
	const len = min(windowWidth - 10, windowHeight - 50);
  createCanvas(len, len, WEBGL);
	arenaWidth = round(width * 0.6);
  cellWidth = round(arenaWidth / CELLS_PER_DIMENSION);
  rightmostCellCenter = cellWidth * CELLS_RIGHT_OF_CENTER;
  pos = createVector(0, 0, 0);
	moveCameraTo(map(sin(20 / 50), -1, 1, 0, -arenaWidth * 0.8), -arenaWidth * 0.8);

	socket = io.connect('http://127.0.0.1:3040');
	socket.on('command', newCommand);
}

function newCommand(data){
	console.log(data.command + data.value + "recived");
	var count = parseInt(data.value)
	for (i = 0; i < count; i++){
		apiCommand(data.command, 1);
		//await sleep(2000);
	}
}

function moveCameraTo(x, y) {
  camera(x, y, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
}

//function sleep(ms) {
//  return new Promise(
//    resolve => setTimeout(resolve, ms)
//  );
//}

function draw() {
  background(255);
  push();
  // translate(pos.x, pos.y, pos.z);
	fill(0, 255, 0, 50);
	smooth();
	drawBox();
  // box(cellWidth);
	// drawReferenceStructures(pos, cellWidth);
  pop();
	drawArena();
	// moveCameraTo(map(sin(millis() / 1000), -1, 1, 0, -arenaWidth * 0.8), -arenaWidth * 0.8);
}

function keyPressed() {
  if (key === 'ArrowLeft'){
		moveBox(-1,  0,  0);
	}else if (key === 'ArrowRight') {
		moveBox( 1,  0,  0);
	}else if (key === 'ArrowUp'){
		moveBox( 0, -1,  0);
	}else if (key === 'ArrowDown') {
		moveBox( 0,  1,  0);
	}else if (key === 'w') {
		moveBox( 0,  0, -1);
	}else if (key === 's') {
		moveBox( 0,  0,  1);
	}
}


function moveBox(x,y,z) {
	pos.x += x*cellWidth;
	pos.y += y*cellWidth;
	pos.z += z*cellWidth;
	print(pos.x +" "+ pos.y +" "+ pos.z);
}

function drawArena() {
  stroke('gray');
  const cMax = rightmostCellCenter + cellWidth / 2;
  const cMin = -cMax;

  [
    '⊤↑I', // Right  horizontal
    '⊤I↑', //        vertical
    'I↑⊥', // Back   horizontal
    '↑I⊥', //        vertical
    'I⊤↑', // Bottom “horizontal”
    '↑⊤I'  //        “vertical”
  ].forEach(codeSet => {
    for (let v = cMin; v <= cMax; v += cellWidth) {
      const coords = [0, 0, 0, 0, 0, 0];

      codeSet.split('').forEach((code, i) => {
        switch (code) {
          case '⊤':
            coords[i    ] =
            coords[i + 3] = cMax;
            break;
          case '⊥':
            coords[i    ] =
            coords[i + 3] = cMin;
            break;
          case '↑':
            coords[i    ] =
            coords[i + 3] = v;
            break;
          case 'I':
            coords[i    ] = cMin;
            coords[i + 3] = cMax;
            break;
        }
      });
      line(...coords);
    }
  });
}

function drawBox(){
	const segmentWidth = cellWidth * 0.9;
	if(newPositionWouldLeaveArena(pos)){
		print("out of arena");
		stroke('gray');
		fill(255, 0, 0, 70);
		at(...pos.array(), () => box(segmentWidth));
		stroke(255, 0, 0);
		fill(255, 0, 0, 60);
		drawReferenceStructures(pos, segmentWidth);
		noLoop();
	}else{
		stroke('gray');
		fill(0, 255, 0, 70);
		at(...pos.array(), () => box(segmentWidth));
		stroke(0, 255, 0);
		fill(0, 255, 0, 60);
		drawReferenceStructures(pos, segmentWidth);
	}
}

function drawReferenceStructures(pos1, objWidth) {

  const l = arenaWidth / 2; // Largest coordinate value
  const s = -l; // Smallest
  const {x, y, z} = pos1;
	// print(x +" "+ y +" "+ z +"cellWidth"+ cellWidth);
  line(x, y, z,  l, y, z);
  line(x, y, z,  x, l, z);
  line(x, y, z,  x, y, s);

  noStroke();
  const w = objWidth;
  const f = 0.1; // Length on flat dimension
  at(l, y, z, () => box(f, w, w));
  at(x, l, z, () => box(w, f, w));
  at(x, y, s, () => box(w, w, f));
}

function at(x, y, z, fn) {
  push();
  translate(x, y, z);
  fn();
  pop();
}

function newPositionWouldLeaveArena(pos) {
  return !pos.array().every(coord => abs(coord) < arenaWidth / 2);
}


function command(){
	var x  = document.getElementById('myInput').value;
	document.getElementById('myInput').value = "";
	comandArray = x.split(" ", 2);
	print(comandArray);

	var data = {
		command: comandArray[0],
		value: comandArray[1]
	}

	socket.emit('command',data);

	var y;
	switch (comandArray[0]) {
		case "up":
			y = parseInt(comandArray[1]);
			if (isNaN(y)){
				document.getElementById('myInput').value = "Invalid Command";
				break;
			}
			moveBox( 0, -y,  0);
			break;
		case "down":
			y = parseInt(comandArray[1]);
			if (isNaN(y)){
				document.getElementById('myInput').value = "Invalid Command";
				break;
			}
			moveBox( 0,  y,  0);
			break;
		case "left":
			y = parseInt(comandArray[1]);
			if (isNaN(y)){
				document.getElementById('myInput').value = "Invalid Command";
				break;
			}
			moveBox(-y,  0,  0);
			break;
		case "right":
			y = parseInt(comandArray[1]);
			if (isNaN(y)){
				document.getElementById('myInput').value = "Invalid Command";
				break;
			}
			moveBox( y,  0,  0);
			break;
		case "forward":
			y = parseInt(comandArray[1]);
			if (isNaN(y)){
				document.getElementById('myInput').value = "Invalid Command";
				break;
			}
			moveBox( 0,  0, -y);
			break;
		case "back":
			y = parseInt(comandArray[1]);
			if (isNaN(y)){
				document.getElementById('myInput').value = "Invalid Command";
				break;
			}
			moveBox( 0,  0,  y);
			break;
		default:
			document.getElementById('myInput').value = "Invalid Command";
	}
	print(comandArray[1] + " " + y);
}

function apiCommand(command, value){
	

	var y;
	switch (command) {
		case "up":
			y = parseInt(value);
			if (isNaN(y)){
				document.getElementById('myInput').value = "Invalid Command";
				break;
			}
			moveBox( 0, -y,  0);
			break;
		case "down":
			y = parseInt(value);
			if (isNaN(y)){
				document.getElementById('myInput').value = "Invalid Command";
				break;
			}
			moveBox( 0,  y,  0);
			break;
		case "left":
			y = parseInt(value);
			if (isNaN(y)){
				document.getElementById('myInput').value = "Invalid Command";
				break;
			}
			moveBox(-y,  0,  0);
			break;
		case "right":
			y = parseInt(value);
			if (isNaN(y)){
				document.getElementById('myInput').value = "Invalid Command";
				break;
			}
			moveBox( y,  0,  0);
			break;
		case "forward":
			y = parseInt(value);
			if (isNaN(y)){
				document.getElementById('myInput').value = "Invalid Command";
				break;
			}
			moveBox( 0,  0, -y);
			break;
		case "back":
			y = parseInt(value);
			if (isNaN(y)){
				document.getElementById('myInput').value = "Invalid Command";
				break;
			}
			moveBox( 0,  0,  y);
			break;
		default:
			document.getElementById('myInput').value = "Invalid Command";
	}
	print(value + " " + y);
}
