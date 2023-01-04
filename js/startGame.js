const btns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var countOfMistakes = 0;
var countOfRight = 0;

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
        document.removeEventListener("keyup", StartGame);
        panel.innerHTML = '';
        panel.insertAdjacentHTML("afterbegin", `<div class="progress-bar"><div class="curtain"></div></div>`)
        panel.insertAdjacentHTML("beforeend", `<div class="text-bar"></div>`)
        var buttonsBar = document.querySelector(".text-bar");
        DrawKeys(buttonsBar);
        document.addEventListener("keyup", press);
    }
}

var index = 0;

function press(e) {
    var key = 64 < e.keyCode && e.keyCode < 91 ? e.keyCode + 32 : e.keyCode;
    if (96 < key && key < 123) {
        let allButtons = document.getElementsByClassName('game-button');
        allButtons[index].classList.remove('error-keydown');
        if (key == allButtons[index].id) {
            allButtons[index++].classList.add(`correct-button-${getRandomInt(3)}`);
            countOfRight++;
            if (allButtons.length == index) {
                panel.innerHTML = `<div class="hint-start">Press space for restart</div>`;
                document.removeEventListener("keyup", press);
                document.addEventListener("keyup", StartGame);
                index = 0;
                countOfMistakes = 0;
                countOfRight = 0;
            }
        }
        else {
            countOfMistakes++;
            allButtons[index].classList.add('error-keydown');
            var progressBarLine = document.querySelector(".curtain");
            progressBarLine.style.left = "-" + (100 - countOfMistakes * 5) + "%";
            if (countOfMistakes > 19) {
                alert(countOfRight);
            }
        }
    }
}