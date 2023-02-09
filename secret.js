var audio = document.getElementById('audio');
var playBtn = document.getElementById('playPause');

let count = 0;

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

let fond = document.getElementById('body');
fond.style.background = 'url(ressources/rick_background.gif)'

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
        //cases.classList.add('secret_alien')
    }
    if (i == 230) {
        cases.classList.add('secret_tireur')
    }
    cases.classList.add('case')
    cases.setAttribute('id', i)
    grille.append(cases)

}

function goLeft() {
    for (let i = 0; i < 239; i ++) {

        let cases = document.querySelectorAll('.case')[i]

        if (cases.previousSibling) {
            if (cases.classList.contains('secret_alien') && !cases.previousElementSibling.classList.contains('secret_alien')) {
                cases.classList.remove('secret_alien')
                cases.previousElementSibling.classList.add('secret_alien')
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
            if (cases.classList.contains('secret_alien') && !cases.nextElementSibling.classList.contains('secret_alien')) {
                cases.classList.remove('secret_alien')
                cases.nextElementSibling.classList.add('secret_alien')
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
    let numSecret = document.getElementsByClassName('secret_alien').length
    let alienSecret = document.getElementsByClassName('secret_alien')
    let num = document.getElementsByClassName('alien').length
    let aliens = document.getElementsByClassName('alien')

    if (num < 1 && numSecret < 1) {
        alert('Vous avez gagné')
        console.log('Vous avez gagné')
        clearInterval(game)
    }

    let cases = document.querySelectorAll('.case')


    for (let k = num-1; k >= 0; k--) {

        console.log(alienSecret[k])

        if (aliens[k].classList.contains('right-stop')) {
            
            for(let j = 0; j < 20; j++) {
                goRight()
            }            
            direction = 'left';
            break;  
            
        }
        if (aliens[k].classList.contains('left-stop') && !cases[0].classList.contains('alien')) {

            for(let j = 0; j < 20; j++) {
                goRight()
            }

        direction = 'right';
        break;

        }
    }

    for (let k = numSecret-1; k >= 0; k--) {

        if (alienSecret[k].classList.contains('right-stop')) {
            
            for(let j = 0; j < 20; j++) {
                goRight()
            }            
            direction = 'left';
            break;  
            
        }
        if (alienSecret[k].classList.contains('left-stop') && !cases[0].classList.contains('secret_alien')) {

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
}

function goUp() {
    let cases = document.querySelectorAll('.case')

    for(let j = 0; j < 20; j++) {
        for (let k = 0; k < cases.length; k++) {
            if (cases[k].classList.contains('secret_laser')) {
                cases[k].classList.remove('secret_laser')
                if (cases[k].previousElementSibling) {
                    cases[k].previousElementSibling.classList.add('secret_laser')
                }
                
            }
        }
    }
    
    for (let k = 0; k < cases.length; k++) {
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
                cases[k].classList.add('secret_alien')
            }, 100);

        }
    }
}

var game;

let launcher = document.getElementById('button');

launcher.addEventListener("click", () => {
    launcher.style.display = 'none'
    game = setInterval(move, 250)
    movement()
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

function movement() {
    let tireur = document.querySelector('.secret_tireur');

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