var url = window.location.href;
var isSecret = url.includes('secret');

if (isSecret){
    let fond = document.getElementById('body');
    fond.style.background = 'url(ressources/rick_background.gif)'
}

let grille = document.querySelector('.grille');

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
        if(isSecret) {
            cases.classList.add('secret_alien')
        }
    }
    if (i == 230) {
        if(isSecret) {
            cases.classList.add('secret_tireur')
        }
        else {
            cases.classList.add('tireur')
        }
       
    }
    cases.classList.add('case')
    cases.setAttribute('id', i)
    grille.append(cases)

}

function goLeft() {
    for (let i = 0; i < 239; i ++) {

        let cases = document.querySelectorAll('.case')[i]

        if (cases.previousSibling) {
            if(isSecret) {
                if (cases.classList.contains('secret_alien') && !cases.previousElementSibling.classList.contains('secret_alien')) {
                    cases.classList.remove('secret_alien')
                    cases.previousElementSibling.classList.add('secret_alien')
                }
            }
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
            if(isSecret) {
                if (cases.classList.contains('secret_alien') && !cases.nextElementSibling.classList.contains('secret_alien')) {
                    cases.classList.remove('secret_alien')
                    cases.nextElementSibling.classList.add('secret_alien')
                }
            }
            if (cases.classList.contains('alien') && !cases.nextElementSibling.classList.contains('alien')) {
                cases.classList.remove('alien')
                cases.nextElementSibling.classList.add('alien')
            }
        }
        
    }
}

let direction= 'right';
var lost = false;

function move() {
    console.log(speed)

    if(isSecret) {
        let num = document.getElementsByClassName('secret_alien').length
        let aliens = document.getElementsByClassName('secret_alien')
    }
    let num = document.getElementsByClassName('alien').length
    let aliens = document.getElementsByClassName('alien')

    if (num < 1) {
        alert('Vous avez gagné')
        console.log('Vous avez gagné')
        clearInterval(game)
    }

    let cases = document.querySelectorAll('.case')

    console.log(num)

    for (let k = num-1; k >= 0; k--) {


        if (aliens[k].classList.contains('right-stop')) {
            
            for(let j = 0; j < 20; j++) {
                goRight()
            }            
            direction = 'left';
            break;  
            
        }
        if(isSecret) {
            if (aliens[k].classList.contains('left-stop') && !cases[0].classList.contains('secret_alien')) {

                for(let j = 0; j < 20; j++) {
                    goRight()
                }
    
            direction = 'right';
            break;
    
            }
        }
        else if (aliens[k].classList.contains('left-stop') && !cases[0].classList.contains('alien')) {

            for(let j = 0; j < 20; j++) {
                goRight()
            }

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

    for (let i = 0; i < casesList.length; i++) {
        if(isSecret) {
            if (casesList[i].classList.contains('secret_tireur')) {
                console.log(casesList[i].classList)
            }
            if ((casesList[i].classList.contains('secret_tireur') && casesList[i].classList.contains('secret_alien')) || (casesList[i].classList.contains('secret_alien') && i > 220)) {
                console.log('Vous avez perdu')
                clearInterval(game)
                lost = true;
                alert('vous avez perdu')
                break;
            }
            if (casesList[i].classList.contains('secret_tireur')) {
                console.log(casesList[i].classList)
            }
            if ((casesList[i].classList.contains('secret_tireur') && casesList[i].classList.contains('alien')) || (casesList[i].classList.contains('alien') && i > 220)) {
                console.log('Vous avez perdu')
                clearInterval(game)
                lost = true;
                alert('vous avez perdu')
                break;
            }
        }
        if (casesList[i].classList.contains('tireur')) {
            console.log(casesList[i].classList)
        }
        if ((casesList[i].classList.contains('tireur') && casesList[i].classList.contains('alien')) || (casesList[i].classList.contains('alien') && i > 220)) {
            console.log('Vous avez perdu')
            clearInterval(game)
            lost = true;
            alert('vous avez perdu')
            break;
        }
    }
    
}

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
            if(isSecret) { 
                if (cases[k].classList.contains('secret_laser')) {
                    cases[k].classList.remove('secret_laser')
                    if (cases[k].previousElementSibling) {
                        cases[k].previousElementSibling.classList.add('secret_laser')
                    }
                    
                }
            }
        }
    }
    
    for (let k = 0; k < cases.length; k++) {
        if (cases[k].classList.contains('alien') && cases[k].classList.contains('laser')) {
            cases[k].classList.add('boom')
            cases[k].classList.remove('laser')
            setTimeout(function(){
                cases[k].classList.remove('alien')
                cases[k].classList.remove('boom')
           }, 100);

        }
        if(isSecret) {
            if (cases[k].classList.contains('secret_alien') && cases[k].classList.contains('secret_laser')) {
                cases[k].classList.add('boom')
                cases[k].classList.remove('secret_laser')
                setTimeout(function(){
                    cases[k].classList.remove('secret_alien')
                    cases[k].classList.remove('boom')
               }, 100);
    
            }
            if (cases[k].classList.contains('alien') && cases[k].classList.contains('secret_laser')) {
                cases[k].classList.add('boom')
                cases[k].classList.remove('secret_laser')
                setTimeout(function(){
                    cases[k].classList.remove('alien')
                    cases[k].classList.remove('boom')
               }, 100);
    
            }
        }
    }
}

console.log(window.location.href)

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
else if (isSecret) {
    speed = 250;
}

var game;

let launcher = document.getElementById('button');

launcher.addEventListener("click", () => {
    launcher.style.display = 'none'
    game = setInterval(move, speed)
    if (isSecret){
        secretMovement()
    }
    else {
        movement()
    }
});

let stopper = document.getElementById('stop');

stopper.addEventListener("click", () => {
    clearInterval(game)
});

let replay = document.getElementById('play_again')

replay.addEventListener("click", () => {
    document.location.reload(false)
})

let casesList = document.querySelectorAll('.case')

// PLAYER MOVEMENT

function secretMovement() {
    let tireur = document.querySelector('.secret_tireur')

        document.onkeydown = function (e) {
        let cases = document.querySelector('.secret_tireur')

        if (e.key == 'ArrowUp') {
                for(let j = 0; j < 20; j++) {

                    let cases = document.querySelector('.secret_tireur')

                    if (tireur.id >= 163){
                
                                cases.classList.remove('secret_tireur')
                                cases.previousElementSibling.classList.add('secret_tireur')
                                tireur.id = cases.id
                    }        
            }
        }

        if (e.key == 'ArrowDown') {
            for(let j = 0; j < 20; j++) {

                let cases = document.querySelector('.secret_tireur')

                if (tireur.id <= 238){
                
                    cases.classList.remove('secret_tireur')
                    cases.nextElementSibling.classList.add('secret_tireur')
                    tireur.id = cases.id
                }
            }
        }

        if (e.key == 'ArrowLeft') {
            if (!cases.classList.contains('left-stop')){
                cases.classList.remove('secret_tireur')
                cases.previousElementSibling.classList.add('secret_tireur')
            }
        }

        if (e.key == 'ArrowRight'){
            if (!cases.classList.contains('right-stop')){
                cases.classList.remove('secret_tireur')
                cases.nextElementSibling.classList.add('secret_tireur')
            }
        }

        if (e.code == 'Space') {
            console.log(e.code)
            let cases = document.querySelectorAll('.case')

            for (let i = 0; i < cases.length; i++) {
                if (cases[i].classList.contains('secret_tireur')) {
                    cases[i].classList.add('secret_laser')
                }
            }
            setInterval(goUp, 600)
        }
    };
}

function movement() {
    let tireur = document.querySelector('.tireur')

    document.onkeydown = function (e) {
        let cases = document.querySelector('.tireur')

        if (e.key == 'ArrowUp') {
                for(let j = 0; j < 20; j++) {

                    let cases = document.querySelector('.tireur')

                    if (tireur.id >= 163){
                
                                cases.classList.remove('tireur')
                                cases.previousElementSibling.classList.add('tireur')
                                tireur.id = cases.id
                    }        
            }
        }

        if (e.key == 'ArrowDown') {
            for(let j = 0; j < 20; j++) {

                let cases = document.querySelector('.tireur')

                if (tireur.id <= 238){
                
                    cases.classList.remove('tireur')
                    cases.nextElementSibling.classList.add('tireur')
                    tireur.id = cases.id
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

        if (e.code == 'Space') {
            console.log(e.code)
            let cases = document.querySelectorAll('.case')

            for (let i = 0; i < cases.length; i++) {
                if (cases[i].classList.contains('tireur')) {
                    cases[i].classList.add('laser')
                }
            }
            setInterval(goUp, 600)
        }
    };
}


// RICK ROLL

var code = [];
const rightCode = ["UP", "DOWN", "LEFT", "RIGHT", "RIGHT", "LEFT", "DOWN", "UP"];
var verif = [];

console.log(rightCode)
console.log(code)

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
    }
    if (code.length == rightCode.length) {
        if (isEqual(code, rightCode) == true){
            window.location.href = 'game.html?diff=secret'
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