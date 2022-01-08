( () => {

	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d');
	let w = canvas.width = innerWidth;
	let h = canvas.height = innerHeight;
	let amountOfParts = 40;
	let properties = {
		color: 'green',
		maxSpeed: 1,
		particleRadius: 5,
		lineLength: 300,
		lineWidth: 4
	}
	let partsArray = [];

	document.querySelector('body').appendChild(canvas);

	window.onresize = () => {
		w = canvas.width = innerWidth;
		h = canvas.height = innerHeight;
	};

	class Part {
		constructor () {
			this.x = Math.random()*w;
			this.y = Math.random()*h;
			this.velocityX = Math.random()*properties.maxSpeed*2 - properties.maxSpeed; 
			this.velocityY = Math.random()*properties.maxSpeed*2 - properties.maxSpeed;
		}
		drawParts () {
			ctx.beginPath();
			ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
			ctx.closePath();
			ctx.fillStyle = properties.color;
			ctx.fill();
		}
		moveParts () {
			this.x += this.velocityX;
			this.y += this.velocityY;
			if (this.x <0 || this.x > w) this.velocityX = 0 - this.velocityX;
			if (this.y <0 || this.y > h) this.velocityY = 0 - this.velocityY;
		}
	}

	let redrawParts = (parts) => {
		for (let item of parts) {
			item.drawParts();
			//item.moveParts();
		}
	}

	let redrawBackground = () => {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, w, h);
	}

	let redrawLines = () => {
		for (let i = 0; i < amountOfParts; i++) {
			for (let j = 0; j < amountOfParts; j++) {
				let length = Math.sqrt( Math.pow( (partsArray[i].x - partsArray[j].x), 2 ) + Math.pow( (partsArray[i].y - partsArray[j].y), 2 ) );
				let opacity = 1 - (length / properties.lineLength);
				if (length < properties.lineLength) {
					ctx.beginPath();
					ctx.moveTo(partsArray[i].x, partsArray[i].y);
					ctx.lineTo(partsArray[j].x, partsArray[j].y);
					ctx.closePath();
					ctx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
					ctx.lineWidth = properties.lineWidth;
					ctx.stroke();	
				}
			}
		}
		
	}		

	let loop = () => {
		redrawBackground();
		redrawParts(partsArray);
		redrawLines();
		requestAnimationFrame(loop);
	
	}

	let init = () => {
		for (let i = 0; i < amountOfParts; i++) {
			partsArray.push( new Part );
		}
		loop();
	}

	init();
	
})();