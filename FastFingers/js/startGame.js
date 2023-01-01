const btns = ['j', 'f', 'l', 'b', 'a'];

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
        buttonsBar.insertAdjacentHTML("afterbegin", `<div class="game-button" id="${btns[rand]}">${btns[rand].toUpperCase()}</div>`);
    }
}

function StartGame(e) {
    if (e.keyCode == 32) {
        panel.innerHTML = '';
        panel.insertAdjacentHTML("afterbegin", `<div class="progress-bar"><div class="curtain"></div></div>`)
        panel.insertAdjacentHTML("beforeend", `<div class="text-bar"></div>`)
        var buttonsBar = document.querySelector(".text-bar");
        DrawKeys(buttonsBar);
        document.removeEventListener("keyup", StartGame);
        document.addEventListener("keyup", press);
        console.log('Game is started')
    }
}

var index = 0;

function press(e) {
    if (64 < e.keyCode && e.keyCode < 91) {
        let allButtons = document.getElementsByClassName('game-button');
        allButtons[index].classList.remove('error-keydown');
        if (e.key == allButtons[index].id) {
            allButtons[index++].classList.add('correct-button');
            countOfRight++;
            if (allButtons.length == index) {
                panel.innerHTML = 'press space to restart';
                document.removeEventListener("keyup", press);
                document.addEventListener("keyup", StartGame);
                index = 0;
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