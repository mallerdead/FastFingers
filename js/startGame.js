const btns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var countOfMistakes = 0;
var countOfRight = 0;
var timeStart;

const panel = document.querySelector(".panel")

document.addEventListener("keyup", StartGame);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function DrawKeys(buttonsBar) {
    for (let i = 0; i < 30; i++) {
        let rand = getRandomInt(btns.length);
        buttonsBar.insertAdjacentHTML("afterbegin", `<div class="game-button" id="${btns[rand].charCodeAt()}">${btns[rand].toUpperCase()}</div>`);
    }
}

function StartGame(e) {
    if (e.keyCode == 32) {
        timeStart = Date.now();
        document.removeEventListener("keyup", StartGame);
        panel.innerHTML = `<div class="display"><div class="progress-bar"><div class="curtain"></div></div></div><div class="text-bar"></div>`;
        var buttonsBar = document.querySelector(".text-bar");
        DrawKeys(buttonsBar);
        document.addEventListener("keyup", press);
    }
}



function GameEnd() {
    panel.innerHTML = `
    <div class="game-info">
        <h4>The game is over</h4>
        <span>Mistakes: ${countOfMistakes}</span>
        <span>Correct: ${countOfRight}</span>
        <span>Spent time: ${(Date.now() - timeStart) / 1000}s</span>
    </div>
    <div class="hint-start">
        Press space for restart
    </div>`;
    document.removeEventListener("keyup", press);
    document.addEventListener("keyup", StartGame);
    countOfMistakes = 0;
    countOfRight = 0;
    timeStart = null;
}

function press(e) {
    var key = 64 < e.keyCode && e.keyCode < 91 ? e.keyCode + 32 : e.keyCode;
    if (96 < key && key < 123) {
        let allButtons = document.getElementsByClassName('game-button');
        allButtons[countOfRight].classList.remove('error-keydown');
        if (key == allButtons[countOfRight].id) {
            allButtons[countOfRight++].classList.add(`correct-button-${getRandomInt(3)}`);
            if (allButtons.length == countOfRight) {
                GameEnd();
            }
        }
        else {
            countOfMistakes++;
            allButtons[countOfRight].classList.add('error-keydown');
            var progressBarLine = document.querySelector(".curtain");
            progressBarLine.style.left = `-${(100 - countOfMistakes * 5)}%`;
            if (countOfMistakes > 19) {
                GameEnd();
            }
        }
    }
}