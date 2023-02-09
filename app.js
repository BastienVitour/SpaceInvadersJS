var url = window.location.href;

let grille = document.querySelector('.grille');
let shooting = false;

for (let i=1; i<241; i++) {
    let cases = document.createElement('div');
    if (i%20 == 0) {
        cases.setAttribute('class', 'right-stop')
    }
    else if (i%20 == 1){
        cases.setAttribute('class', 'left-stop')
    }
    if (i < 61 && i%20 < 13 && i%20 != 0) {
        cases.classList.add('alien')
    }
    
    if (i == 230) {
        cases.classList.add('tireur')
    }
    cases.classList.add('case')
    cases.setAttribute('id', i)
    grille.append(cases)
}

function goLeft() {
    for (let i = 0; i < 239; i ++) {

        let cases = document.querySelectorAll('.case')[i]

        if (cases.previousSibling) {
            if (cases.classList.contains('alien') && !cases.previousElementSibling.classList.contains('alien')) {
                cases.classList.remove('alien')
                cases.previousElementSibling.classList.add('alien')
            }
        }
        
    }
}

function goRight() {
    for (let i = 239; i >= 0; i --) {

        let cases = document.querySelectorAll('.case')[i]

        if (cases.nextSibling) {
            if (cases.classList.contains('alien') && !cases.nextElementSibling.classList.contains('alien')) {
                cases.classList.remove('alien')
                cases.nextElementSibling.classList.add('alien')
            }
        }
        
    }
}

let direction= 'right';
var down = true;

function move() {
    let num = document.getElementsByClassName('alien').length
    let aliens = document.getElementsByClassName('alien')

    if (num < 1) {
        console.log('Vous avez gagné')
        let precision = ((ennemiesDestroyed/numberOfShots)*100).toFixed(1)
        console.log("Précision : " + precision + "%")
        clearInterval(game)
        let replay = document.getElementById('play_again')
        replay.style.display = 'inline'
        stopper.style.display = 'none'
        let place = 'score0'
        let accuracy = 'precision0'
        let pseudo = 'pseudo0'
        if ('score9' in localStorage) {
            if (score > localStorage.getItem('score9') || (precision > localStorage.getItem('precision9') && score >= localStorage.getItem('score9'))) {
                
                let name = prompt('Indiquez votre pseudo')
                saveScore(score, precision, name)
            }
            else {
                alert("Vous n'êtes pas dans le top 10")
            }
            
        }
        else {
            let name = prompt('Indiquez votre pseudo')
            saveScore(score, precision, name)
        }
        
        
    }

    for (let i = 0; i < casesList.length; i++) {
        if ((casesList[i].classList.contains('tireur') && casesList[i].classList.contains('alien')) || (casesList[i].classList.contains('alien') && i > 220)) {
            console.log('Vous avez perdu')
            let precision = ((ennemiesDestroyed/numberOfShots)*100).toFixed(1)
            console.log("Précision : " + precision + "%")
            clearInterval(game)
            let replay = document.getElementById('play_again')
            replay.style.display = 'inline'
            stopper.style.display = 'none'
            let place = 'score0'
            let accuracy = 'precision0'
            let pseudo = 'pseudo0'
            if ('score9' in localStorage) {
                if (score > localStorage.getItem('score9') || (precision > localStorage.getItem('precision9') && score >= localStorage.getItem('score9'))) {
                    let name = prompt('Indiquez votre pseudo')
                    saveScore(score, precision, name)
                }
                else {
                    alert("Vous n'êtes pas dans le top 10")
                }
                
            }
            else {
                let name = prompt('Indiquez votre pseudo')
                saveScore(score, precision, name)
            }
            break;
        }
    }

    let cases = document.querySelectorAll('.case')

    for (let k = num-1; k >= 0; k--) {

        if (aliens[k].classList.contains('right-stop')) {
            
            if (down) {
                for(let j = 0; j <= 20; j++) {
                    goRight()
                }
                down = false;
            }

            setTimeout(() => {
                down = true;
            }, speed);
                      
            direction = 'left';
            break;  
            
        }

        else if (aliens[k].classList.contains('left-stop') && !cases[0].classList.contains('alien')) {

            if (down) {
                for(let j = 0; j < 19; j++) {
                    goRight()
                }
                down = false;
            }

            setTimeout(() => {
                down = true
            }, speed);

        direction = 'right';
        break;

        }
    }

    if (direction == 'right') {

        goRight();

    }

    else if (direction == 'left') {

        goLeft();

    }
    
}

var explosion = new Audio("ressources/explosion.mp3")
var score = 0

let ennemiesDestroyed = 0;

function goUp() {

    let cases = document.querySelectorAll('.case')
    
    for(let j = 0; j < 20; j++) {
        for (let k = 0; k < cases.length; k++) {
            if (cases[k].classList.contains('laser')) {
                cases[k].classList.remove('laser')
                if (cases[k].previousElementSibling) {
                    cases[k].previousElementSibling.classList.add('laser')
                }
                
            }
        }
    }
    
    for (let k = 0; k < cases.length; k++) {
        if (cases[k].classList.contains('alien') && cases[k].classList.contains('laser')) {
            explosion.currentTime = 0
            cases[k].classList.add('boom')
            explosion.play();
            cases[k].classList.remove('laser')
            cases[k].classList.remove('alien')
            setTimeout(function(){
                cases[k].classList.remove('boom')
                if (url.includes('easy')) {
                    score += 100;
                }
                else if (url.includes('mid')) {
                    score += 200
                }
                else if (url.includes('hard')) {
                    score += 300;
                }
                document.getElementById('score').innerText = "Score : " + score
                ennemiesDestroyed ++;
                console.log("Shots fired : " + numberOfShots)
                console.log("Ennemies destroyed : " + ennemiesDestroyed)
           }, 100);
            
        }
    }
}

//console.log(window.location.href)

url = window.location.href;

var speed;

if (url.includes('easy')) {
    speed = 750;
}
else if (url.includes('mid')) {
    speed = 500;
}
else if (url.includes('hard')) {
    speed = 250;
}

let launcher = document.getElementById('button');
let stopper = document.getElementById('stop');

launcher.addEventListener("click", () => {
    launcher.style.display = 'none'
    stopper.style.display = 'inline'
    game = setInterval(move, speed)
    movement()
});

stopper.addEventListener("click", () => {
    stopper.style.display = 'none'
    launcher.style.display = 'inline'
    launcher.innerText = 'Reprendre'
    pause()
    clearInterval(game)
});

let replay = document.getElementById('play_again')

replay.addEventListener("click", () => {
    document.location.reload(false)
})

var audio = document.getElementById('audio');
var playBtn = document.getElementById('playPause');
//audio.volume = 2

let count = 1;

function playPause(){
    console.log(count)
    if(count == 0){
        count = 1;
        audio.play();
        playBtn.innerHTML = "Music ON"
    }
    else{
        count = 0
        audio.pause();
        playBtn.innerHTML = "Music OFF"
    }
}

let casesList = document.querySelectorAll('.case')

// PLAYER MOVEMENT
var laserShoot = new Audio("ressources/laser.mp3");

var numberOfShots = 0;

function movement() {
    let tireur = document.querySelector('.tireur')

    document.onkeydown = function (e) {
        let cases = document.querySelector('.tireur')

        if (e.key == 'ArrowUp') {

            if (tireur.id > 181) {
                for(let j = 0; j < 20; j++) {

                    let cases = document.querySelector('.tireur')

                    if (tireur.id >= 163){
                
                        cases.classList.remove('tireur')
                        cases.previousElementSibling.classList.add('tireur')
                        tireur.id = cases.id
                    }        
                }
            }
        }

        if (e.key == 'ArrowDown') {
            if (tireur.id < 220) {
            
                for(let j = 0; j < 20; j++) {

                    let cases = document.querySelector('.tireur')

                    if (tireur.id <= 238){
                    
                        cases.classList.remove('tireur')
                        cases.nextElementSibling.classList.add('tireur')
                        tireur.id = cases.id
                    }
                }
            }
        }

        if (e.key == 'ArrowLeft') {
            if (!cases.classList.contains('left-stop')){
                cases.classList.remove('tireur')
                cases.previousElementSibling.classList.add('tireur')
            }
        }

        if (e.key == 'ArrowRight'){
            if (!cases.classList.contains('right-stop')){
                cases.classList.remove('tireur')
                cases.nextElementSibling.classList.add('tireur')
            }
        }

        if (e.key == 'm') {
            if (url.includes('easy')) {
                score = 3600;
                numberOfShots = 40
                ennemiesDestroyed = 36
            }
            else if (url.includes('mid')) {
                score = 7200;
                numberOfShots = 50
                ennemiesDestroyed = 36
            }
            else if (url.includes('hard')) {
                score = 10800;
                numberOfShots = 49
                ennemiesDestroyed = 36
            }
            console.log('wbjdggfebfz')
            setTimeout(function() {
                let casess = document.getElementsByClassName('case')
                for (let i = 0; i <casess.length; i++) {
                    if (casess[i].classList.contains('alien'))
                    casess[i].classList.remove('alien')
                }
            }, 12)
        }

        
        document.onkeyup = function (e) {
            if (e.code == 'Space') {
                
                if(!shooting){
                    shooting = true;
                    laserShoot.volume = 0.3
                    laserShoot.currentTime = 0;
                    laserShoot.play();
                    let cases = document.querySelectorAll('.case')
                    numberOfShots ++
                    
                    setTimeout(function(){
                        shooting = false;
                    },400);
        
                    for (let i = 0; i < cases.length; i++) {
                        
                        if (cases[i].classList.contains('tireur')) {
                            
                            cases[i].classList.add('laser')
                        
                        }
                    }
                }
            }
        }
    }
}

function pause() {
    document.onkeydown = function (e) {
        e.preventDefault()
    }
}

// RICK ROLL

var code = [];
const rightCode = ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "B", "A"];
var verif = [];

//console.log(rightCode)
//console.log(code)

function isEqual(tableau1, tableau2) {
    return tableau1.every((value, index) => value === tableau2[index])
  }

document.onkeydown = function (f) {
    if (f.key == 'ArrowUp') {
        code.push("UP")

    }
    if (f.key == 'ArrowDown') {
        code.push("DOWN")
    }
    if (f.key == 'ArrowRight') {
        code.push("RIGHT")
    }
    if (f.key == 'ArrowLeft') {
        code.push("LEFT")
        console.log(code)
    }
    if (f.key == 'b') {
        code.push("B")
        console.log(code)
    }
    if (f.key == 'a') {
        code.push("A")
        console.log(code)
    }

    if (code.length == rightCode.length) {
        if (isEqual(code, rightCode) == true){
            window.location.href = 'secret.html'
            alert("vous avez trouvé le niveau secret")
            for (let f = 0; f < rightCode.length; f++){
                code.pop()
            }
        }
        else {
            for (let f = 0; f < rightCode.length; f++){
                code.pop()
            }
            alert("tu t'es trompé")
        }
    }
}

function saveScore (score, precision, name) {
    for (let i = 0; i < 10; i++) {
            
        place = 'score'
        accuracy = 'precision'
        pseudo = 'pseudo'
        place = place + i.toString()
        accuracy = accuracy + i.toString()
        pseudo = pseudo + i.toString()
        console.log(place)
        
        if (place in localStorage) {
            
            if (score > localStorage.getItem(place)) {
                
                let ns = localStorage.getItem(place)
                let np = localStorage.getItem(accuracy)
                let nm = localStorage.getItem(pseudo)
                localStorage.setItem(place, JSON.stringify(score).replace('"', '').replace('"', ''))
                localStorage.setItem(accuracy, JSON.stringify(precision).replace('"', '').replace('"', ''))
                localStorage.setItem(pseudo, JSON.stringify(name).replace('"', '').replace('"', ''))
                score = ns
                precision = np
                name = nm
            }
            else if (score == localStorage.getItem(place) && precision > localStorage.getItem(accuracy)) {
                console.log('precision > localStorage')
                let ns = localStorage.getItem(place)
                let np = localStorage.getItem(accuracy)
                let nm = localStorage.getItem(pseudo)
                localStorage.setItem(place, JSON.stringify(score).replace('"', '').replace('"', ''))
                localStorage.setItem(accuracy, JSON.stringify(precision).replace('"', '').replace('"', ''))
                localStorage.setItem(pseudo, JSON.stringify(name).replace('"', '').replace('"', ''))
                score = ns
                precision = np
                name = nm
            }
        }
        else {
            console.log('else')
            localStorage.setItem(place, JSON.stringify(score).replace('"', '').replace('"', ''))
            localStorage.setItem(accuracy, JSON.stringify(precision).replace('"', '').replace('"', ''))
            localStorage.setItem(pseudo, JSON.stringify(name).replace('"', '').replace('"', ''))
            break
        }
    }
}

setInterval(goUp, 200)
