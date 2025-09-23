import { ref, onMounted, onUnmounted } from 'vue';
import { getClientLang } from "@/composables/client/getLang";

// --- TETRIS ---
export function useTetris(canvas) {
	const width = 200;
	const height = 400;
	const rows = 20;
	const cols = 10;
	const block = width / cols;
	const score = ref(0);
	let ctx;
	let animationId;
	const colors = [
		'#22223b', '#4a4e69', '#9a8c98', '#c9ada7', '#f2e9e4', '#f72585', '#b5179e', '#7209b7'
	];
	const shapes = [
		[[1, 1, 1, 1]],
		[[1, 1], [1, 1]],
		[[0, 1, 0], [1, 1, 1]],
		[[1, 0, 0], [1, 1, 1]],
		[[0, 0, 1], [1, 1, 1]],
		[[1, 1, 0], [0, 1, 1]],
		[[0, 1, 1], [1, 1, 0]]
	];
	function randomPiece() {
		const i = Math.floor(Math.random() * shapes.length);
		return {
			shape: shapes[i].map(row => [...row]),
			color: colors[i + 1],
			x: Math.floor(cols / 2) - 1,
			y: 0
		};
	}
	let board, piece;
	function resetGame() {
		board = Array.from({ length: rows }, () => Array(cols).fill(0));
		piece = randomPiece();
		score.value = 0;
		draw();
	}
	function collide(px, py, shape) {
		for (let y = 0; y < shape.length; ++y)
			for (let x = 0; x < shape[y].length; ++x)
				if (shape[y][x] && (board[py + y]?.[px + x] || px + x < 0 || px + x >= cols || py + y >= rows))
					return true;
		return false;
	}
	function merge() {
		piece.shape.forEach((row, y) => row.forEach((v, x) => {
			if (v) board[piece.y + y][piece.x + x] = colors.indexOf(piece.color) + 1;
		}));
	}
	function clearLines() {
		let lines = 0;
		for (let y = rows - 1; y >= 0; --y) {
			if (board[y].every(v => v)) {
				board.splice(y, 1);
				board.unshift(Array(cols).fill(0));
				lines++;
				y++;
			}
		}
		score.value += lines * 100;
	}
	function rotate(shape) {
		return shape[0].map((_, i) => shape.map(row => row[i]).reverse());
	}
	function drop() {
		if (!collide(piece.x, piece.y + 1, piece.shape)) {
			piece.y++;
		} else {
			merge();
			clearLines();
			piece = randomPiece();
			if (collide(piece.x, piece.y, piece.shape)) {
				resetGame();
			}
		}
	}
	function draw() {
		ctx.clearRect(0, 0, width, height);
		for (let y = 0; y < rows; ++y)
			for (let x = 0; x < cols; ++x)
				if (board[y][x]) {
					ctx.fillStyle = colors[board[y][x]];
					ctx.fillRect(x * block, y * block, block - 1, block - 1);
				}
		piece.shape.forEach((row, y0) => row.forEach((v, x0) => {
			if (v) {
				ctx.fillStyle = piece.color;
				ctx.fillRect((piece.x + x0) * block, (piece.y + y0) * block, block - 1, block - 1);
			}
		}));
	}
	function gameLoop() {
		drop();
		draw();
		animationId = requestAnimationFrame(() => setTimeout(gameLoop, 400));
	}
	function handleKey(e) {
		if (!piece) return;
		if (e.key === 'ArrowLeft' && !collide(piece.x - 1, piece.y, piece.shape)) piece.x--;
		if (e.key === 'ArrowRight' && !collide(piece.x + 1, piece.y, piece.shape)) piece.x++;
		if (e.key === 'ArrowDown') drop();
		if (e.key === 'ArrowUp') {
			const rotated = rotate(piece.shape);
			if (!collide(piece.x, piece.y, rotated)) piece.shape = rotated;
		}
		draw();
	}
	onMounted(() => {
		ctx = canvas.value.getContext('2d');
		resetGame();
		window.addEventListener('keydown', handleKey);
		animationId = requestAnimationFrame(gameLoop);
	});
	onUnmounted(() => {
		window.removeEventListener('keydown', handleKey);
		cancelAnimationFrame(animationId);
	});
	return { width, height, canvas, score, resetGame };
}

// --- FLAPPY BIRD ---
export function useFlappyBird(canvas) {
	const width = 500;
	const height = 480;
	const gravity = 0.5;
	const jump = -7;
	const pipeGap = 110;
	const pipeWidth = 50;
	const birdSize = 38;
	const score = ref(0);
	let ctx;
	let animationId;
	let birdImg = new window.Image();
	birdImg.src = '/logos/channel_profile.jpg';
	let bird, pipes, velocity, gameOver;
	function resetGame() {
		bird = { x: 60, y: height / 2, vy: 0 };
		pipes = [];
		velocity = 0;
		score.value = 0;
		gameOver = false;
		for (let i = 0; i < 3; ++i) {
			pipes.push({
				x: width + i * 180,
				h: Math.random() * (height - pipeGap - 80) + 40
			});
		}
		draw();
	}
	function draw() {
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = 'hsl(206.84 64.1% 6.81%)';
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = '#4ade80';
		pipes.forEach(pipe => {
			ctx.fillRect(pipe.x, 0, pipeWidth, pipe.h);
			ctx.fillRect(pipe.x, pipe.h + pipeGap, pipeWidth, height - pipe.h - pipeGap);
		});
		ctx.save();
		ctx.beginPath();
		ctx.arc(bird.x + birdSize / 2, bird.y + birdSize / 2, birdSize / 2, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(birdImg, bird.x, bird.y, birdSize, birdSize);
		ctx.restore();
		ctx.fillStyle = '#fff';
		ctx.font = 'bold 24px Fira Code, monospace';
		ctx.fillText(score.value, width / 2 - 10, 40);
		if (gameOver) {
			ctx.fillStyle = '#f72585';
			ctx.font = 'bold 32px Fira Code, monospace';
			ctx.fillText('Game Over', width / 2 - 80, height / 2);
		}
	}
	function gameLoop() {
		if (gameOver) return;
		bird.vy += gravity;
		bird.y += bird.vy;
		pipes.forEach(pipe => pipe.x -= 2.5);
		if (pipes[0].x < -pipeWidth) {
			pipes.shift();
			pipes.push({
				x: pipes[pipes.length - 1].x + 180,
				h: Math.random() * (height - pipeGap - 80) + 40
			});
			score.value++;
		}
		if (bird.y < 0 || bird.y + birdSize > height) gameOver = true;
		pipes.forEach(pipe => {
			if (
				bird.x + birdSize > pipe.x && bird.x < pipe.x + pipeWidth &&
				(bird.y < pipe.h || bird.y + birdSize > pipe.h + pipeGap)
			) gameOver = true;
		});
		draw();
		if (!gameOver) animationId = requestAnimationFrame(gameLoop);
	}
	function flap() {
		if (gameOver) {
			resetGame();
			animationId = requestAnimationFrame(gameLoop);
			return;
		}
		bird.vy = jump;
	}
	function handleKey(e) {
		if (e.key === ' ' || e.key === 'ArrowUp') flap();
	}
	function handleClick() {
		flap();
	}
	onMounted(() => {
		ctx = canvas.value.getContext('2d');
		birdImg.onload = () => {
			resetGame();
			animationId = requestAnimationFrame(gameLoop);
		};
		window.addEventListener('keydown', handleKey);
		canvas.value.addEventListener('click', handleClick);
	});
	onUnmounted(() => {
		window.removeEventListener('keydown', handleKey);
		canvas.value?.removeEventListener('click', handleClick);
		cancelAnimationFrame(animationId);
	});
	return { width, height, canvas, score, resetGame };
}

export const useSnake = () => {
	let snake = [{ x: 150, y: 150 }],
		direction = { x: 0, y: 0 },
		food = {
			x: Math.floor(Math.random() * 15) * 20,
			y: Math.floor(Math.random() * 15) * 20,
		},
		foodLeft = 10,
		interval: any,
		gameStarted = false,
		gameOver = false,
		win = false;

	const startGame = () => {
		if (!gameStarted || gameOver || win) {
			resetGame();
			gameStarted = true;
			gameOver = false;
			win = false;
			document.addEventListener("keydown", changeDirection);
			updateFoodIndicator();
			interval = setInterval(gameLoop, 100); // Start the game loop
			document.getElementById("alert")?.classList.add("hidden");
		}
	};

	const resetGame = () => {
		snake = [{ x: 150, y: 150 }];
		direction = { x: 0, y: 0 };
		foodLeft = 10;
		food = {
			x: Math.floor(Math.random() * 15) * 20,
			y: Math.floor(Math.random() * 15) * 20,
		};
		const startGameBtn = document.getElementById("startGameBtn");
		if (startGameBtn) {
			startGameBtn.textContent = "Start Game";
		}
	};

	const changeDirection = (event: { keyCode: any }) => {
		const keyPressed = event.keyCode;
		const UP = 38,
			DOWN = 40,
			LEFT = 37,
			RIGHT = 39,
			W = 87,
			A = 65,
			S = 83,
			D = 68;

		if ((keyPressed === UP || keyPressed === W) && direction.y === 0)
			direction = { x: 0, y: -20 };
		else if ((keyPressed === DOWN || keyPressed === S) && direction.y === 0)
			direction = { x: 0, y: 20 };
		else if ((keyPressed === LEFT || keyPressed === A) && direction.x === 0)
			direction = { x: -20, y: 0 };
		else if ((keyPressed === RIGHT || keyPressed === D) && direction.x === 0)
			direction = { x: 20, y: 0 };
	};

	const gameLoop = () => {
		const canvas = document.getElementById("snakeCanvas");
		const ctx = (canvas as HTMLCanvasElement).getContext("2d");

		if (isGameOver()) {
			clearInterval(interval);
			displayAlert(getClientLang() === "en"
				? "Game Over!"
				: "Has perdido!",
				getClientLang() === "en"
					? "Try again 😞"
					: "Inténtalo de nuevo 😞");
			gameOver = true;
			return;
		}

		if (ctx) {
			clearCanvas(ctx);
			drawFood(ctx);
			moveSnake(ctx as CanvasRenderingContext2D);
			drawSnake(ctx);
		}
	};

	const clearCanvas = (ctx: {
		clearRect: (arg0: number, arg1: number, arg2: number, arg3: number) => void;
	}) => {
		ctx.clearRect(0, 0, 300, 300);
	};

	const drawSnake = (ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = "#00FF00";
		snake.forEach((part) => {
			ctx.fillRect(part.x, part.y, 20, 20);
		});
	};

	const isFoodEaten = (head: { x: any; y: any }, food: { x: any; y: any }) => {
		const distance = Math.sqrt(
			Math.pow(head.x - food.x, 2) + Math.pow(head.y - food.y, 2)
		);
		return distance < 20;
	};

	const moveSnake = (_ctx: CanvasRenderingContext2D) => {
		const head = {
			x: snake[0].x + direction.x,
			y: snake[0].y + direction.y,
		};
		snake.unshift(head);

		if (isFoodEaten(head, food)) {
			foodLeft--;
			updateFoodIndicator();
			if (foodLeft === 0) {
				clearInterval(interval);
				displayAlert(getClientLang() === "en"
					? "You Win!"
					: "¡Has ganado!",
					getClientLang() === "en"
						? "Play again! 🎉"
						: "¡Juega de nuevo! 🎉");
				win = true;
				launchConfetti();
			} else {
				generateNewFood();
			}
		} else {
			snake.pop(); // Remove the tail unless eating
		}
	};

	const drawFood = (ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(food.x, food.y, 20, 20);
	};

	const generateNewFood = () => {
		food = {
			x: Math.floor(Math.random() * 15) * 20,
			y: Math.floor(Math.random() * 15) * 20,
		};
	};

	const isGameOver = () => {
		const head = snake[0];
		if (head.x < 0 || head.x >= 300 || head.y < 0 || head.y >= 300) return true;
		for (let i = 4; i < snake.length; i++) {
			if (snake[i].x === head.x && snake[i].y === head.y) return true;
		}
		return false;
	};

	const updateFoodIndicator = () => {
		const foodDots = document.getElementById("foodDots");
		if (foodDots) {
			foodDots.innerHTML = "";
		}
		for (let i = 0; i < foodLeft; i++) {
			const dot = document.createElement("div");
			dot.classList.add("food-dot");
			if (foodDots) {
				foodDots.appendChild(dot);
			}
		}
	};

	const displayAlert = (message: string, buttonText: string | null) => {
		const alertBox = document.getElementById("alert");
		const alertMessageElement = document.getElementById("alertMessage");
		const startGameBtn = document.getElementById("startGameBtn");

		if (alertMessageElement) {
			alertMessageElement.innerText = message;
		}
		if (alertBox) {
			alertBox.classList.remove("hidden");
			alertBox.classList.add("show");
		}
		if (startGameBtn) {
			startGameBtn.textContent = buttonText;
		}
	};

	const launchConfetti = () => {
		for (let i = 0; i < 100; i++) {
			createConfetti();
		}
	};

	const createConfetti = () => {
		const confetti = document.createElement("div");
		confetti.classList.add("confetti");
		document.body.appendChild(confetti);

		confetti.style.left = `${Math.random() * 100}vw`;
		confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;

		setTimeout(() => {
			confetti.remove();
		}, 5000);
	};

	const startGameBtn = document.getElementById("startGameBtn");

	if (startGameBtn) startGameBtn.addEventListener("click", startGame);
};
