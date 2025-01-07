const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
const difficultyBtn = document.querySelector(".difficultyBtn");
const levelBox = document.querySelector(".levelBox");


let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let snakeBody = [];
let score = 0;
let highScore;
let velocityX = 0, velocityY = 0;
let setIntervalId;

highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score; ${highScore}`;

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handlerGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press Ok to replay...");
    location.reload();
}

const changeDirection = e => {
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }

}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gameOver) return handlerGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    snakeX += velocityX;
    snakeY += velocityY;

    for(let i = snakeBody.length - 1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    snakeBody[0] = [snakeX, snakeY];
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        return gameOver = true;
    }

    for(let i=0; i<snakeBody.length; i++){
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }

    playBoard.innerHTML = html;

}

function changeDifficulty(difficulty){
    let speed;
    if(difficulty === 'easy'){
        speed = 200;
    }else if(difficulty === 'medium'){
        speed = 100;
    }else if(difficulty === 'hard'){
        speed = 50;
    }

    levelBox.classList.add("remove");
    updateFoodPosition();
    setIntervalId = setInterval(initGame, speed);
}

document.addEventListener("keyup",changeDirection);