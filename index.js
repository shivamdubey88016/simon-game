let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;
const buttons = ["green", "red", "yellow", "blue"];

document.addEventListener("keypress", () => {
    if (!started) {
        document.querySelector("h2").innerText = `Level ${level}`;
        nextSequence();
        started = true;
    }
});

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function () {
        let clickedColor = this.id;
        userSequence.push(clickedColor);
        flashButton(clickedColor);
        checkAnswer(userSequence.length - 1);
    });
});

function nextSequence() {
    userSequence = [];
    level++;
    document.querySelector("h2").innerText =`level ${level}`;
    let randomColor = buttons[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);
    setTimeout(() => flashButton(randomColor), 1000);
}

function flashButton(color) {
    let button = document.getElementById(color);
    button.classList.add("flash");
    setTimeout(() => button.classList.remove("flash"), 1000);
}

function checkAnswer(currentIndex) {
    if (userSequence[currentIndex] === gameSequence[currentIndex]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    document.querySelector("h2").innerText = "Game Over! Press any key to restart.";
    gameSequence = [];
    userSequence = [];
    level = 0;
    started = false;
    document.body.style.backgroundColor = "red";
    setTimeout(() => document.body.style.backgroundColor = "#282c34", 500);
}