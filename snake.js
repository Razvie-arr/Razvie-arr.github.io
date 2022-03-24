let canvas = document.querySelector('#game');
let context = canvas.getContext('2d');

let scoreElement = document.querySelector('#score');
scoreElement.innerHTML = '0';

let pauseElement = document.querySelector('#pause');

//size of one cell
let grid = 16;
let score = 0;
//snake's speed
let count = 0;
let myReq;
let paused = false;

let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

let apple = {
    x: 320,
    y: 320
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function loop() {

    myReq = requestAnimationFrame(loop);
    if (++count < 4) {
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = 'green';

    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === apple.x && cell.y === apple.y) {
            incrementScore();
            snake.maxCells++;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                resetScore();
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

function incrementScore() {
    score++;
    scoreElement.innerHTML = score.toString();
}

function resetScore() {
    score = 0;
    scoreElement.innerHTML = score.toString();
}

function pause() {
    paused = true;
    context.filter = 'blur(10px)';
    pauseElement.style.display = 'block';
    setTimeout(() => {
        cancelAnimationFrame(myReq);
    }, 100);
}

function resume() {
    paused = false;
    context.filter = 'blur(0)';
    pauseElement.style.display = 'none';
    requestAnimationFrame(loop);
}

document.addEventListener('keydown', function (e) {
    switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
            if (snake.dx === 0) {
                snake.dx = -grid;
                snake.dy = 0;
            }
            break;
        case 'ArrowUp':
        case 'KeyW':
            if (snake.dy === 0) {
                snake.dy = -grid;
                snake.dx = 0;
            }
            break;
        case 'ArrowRight':
        case 'KeyD':
            if (snake.dx === 0) {
                snake.dx = grid;
                snake.dy = 0;
            }
            break;
        case 'ArrowDown':
        case 'KeyS':
            if (snake.dy === 0) {
                snake.dy = grid;
                snake.dx = 0;
            }
            break;
        //restart game
        case 'KeyR':
            snake.dy = 0;
            snake.dx = 0;
            break;
        case 'Space':
            e.preventDefault();
            if (paused) {
                resume();
            } else {
                pause();
            }
            break;
    }
});


requestAnimationFrame(loop);