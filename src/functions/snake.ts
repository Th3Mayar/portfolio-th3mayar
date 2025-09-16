export const snakeGame = () => {
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
    if (!gameStarted || gameOver || win ) {
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
      displayAlert("Game Over!", "Try again 😞");
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
        displayAlert("You Win!", "Well done! Play again? 🎉");
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
