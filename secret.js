let fond = document.getElementById('body');
fond.style.background = 'url(ressources/GIF/rick_background.gif)'

let grille = document.querySelector('.grille');
let shooting = false;

let rick = document.getElementById('audio')
rick.volume = 0.3


///////// CRÉATION DE LA GRILLE ET DES ÉLÉMENTS QUI LA COMPOSE /////////


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
        cases.classList.add('secret_tireur')
    }
    cases.classList.add('case')
    cases.setAttribute('id', i)
    grille.append(cases)
}


///////// DÉPLACER LES ALIENS À GAUCHE /////////


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


///////// DÉPLACER LES ALIENS VERS LA DROITE /////////


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
var down = true;


///////// LANCER LA PARTIE /////////


function move() {
    let numSecret = document.getElementsByClassName('secret_alien').length
    let alienSecret = document.getElementsByClassName('secret_alien')
    let num = document.getElementsByClassName('alien').length
    let aliens = document.getElementsByClassName('alien')


    ///////// VÉRIFIFCATION DE LA VICTOIRE /////////


    if (num < 1 && numSecret < 1) {
        let grille = document.querySelector('.grille')
        grille.style.visibility = "hidden"
        grille.style.display = "none"

        let victory = document.querySelector('.victoire_secret')
        victory.style.visibility = "visible"
        victory.style.display = "flex"

        var gagner = new Audio("ressources/sounds/mlg.mp3")

        gagner.play()
        audio.pause()
        setTimeout(() => {
            audio.play()
        },4100);

        let precision = (goodShots/numberOfShots)*100
        console.log("Précision : " + precision.toFixed(1) + "%")
        clearInterval(game)
        let replay = document.getElementById('play_again')
        replay.style.display = 'inline'
        stopper.style.display = 'none'
    }


    ///////// VÉRIFICATION DE LA DÉFAITE /////////



    for (let i = 0; i < casesList.length; i++) {
        
        if ((casesList[i].classList.contains('secret_tireur') && casesList[i].classList.contains('secret_alien')) || (casesList[i].classList.contains('secret_alien') && i > 220)) {
            console.log('Vous avez perdu')
            let precision = (goodShots/numberOfShots)*100
            console.log("Précision : " + precision.toFixed(1) + "%")
            clearInterval(game)
            let replay = document.getElementById('play_again')
            replay.style.display = 'inline'
            stopper.style.display = 'none'
            break;
        }
        
        if ((casesList[i].classList.contains('secret_tireur') && casesList[i].classList.contains('alien')) || (casesList[i].classList.contains('alien') && i > 220)) {

            let grille = document.querySelector('.grille');
            let lose = document.querySelector('.lose_secret');
            grille.style.display = 'none'
            grille.classList.add('lose')
            lose.style.display = 'flex'

            var perduS = new Audio("ressources/sounds/Morty.mp3")

            perduS.play();
            audio.pause();

            setTimeout(() => {
                audio.play()
            },51000);

            let precision = (goodShots/numberOfShots)*100
            console.log("Précision : " + precision.toFixed(1) + "%")
            clearInterval(game)
            let replay = document.getElementById('play_again')
            replay.style.display = 'inline'
            stopper.style.display = 'none'
            break;
        }
    }

    let cases = document.querySelectorAll('.case')


    ///////// DÉPLACEMENT DES ALIENS VERS LE BAS /////////


    for (let k = num-1; k >= 0; k--) {

        if (aliens[k].classList.contains('right-stop')) {
            
            if (down) {
                for(let j = 0; j < 20; j++) {
                    goRight()
                }
                down = false
            }

            setTimeout(() => {
                down = true;
            }, 350);
                      
            direction = 'left';
            break;  
            
        }
        if (aliens[k].classList.contains('left-stop') && !cases[0].classList.contains('alien')) {

            if (down) {
                for(let j = 0; j < 20; j++) {
                    goRight()
                }
                down = false
            }

            setTimeout(() => {
                down = true;
            }, 350);

        direction = 'right';
        break;

        }
    }


    ///////// DÉPLACEMENT DES ALIENS SECRET VERS LE BAS /////////


    for (let k = numSecret-1; k >= 0; k--) {

        if (alienSecret[k].classList.contains('right-stop')) {
            
            if (down) {
                for(let j = 0; j < 20; j++) {
                    goRight()
                }
                down = false;
            }

            setTimeout(() => {
                down = true;
            }, 350);

            direction = 'left';
            break;  
            
        }
        if (alienSecret[k].classList.contains('left-stop') && !cases[0].classList.contains('secret_alien')) {

            if (down) {
                for(let j = 0; j < 20; j++) {
                    goRight()
                }
                down = false;
            }

            setTimeout(() => {
                down = true;
            }, 350);

        direction = 'right';
        break;

        }
    }


    ///////// DÉPLACEMENT DES ALIENS EN FONCTION DE LEUR DIRECTION /////////


    if (direction == 'right') {

        goRight();

    }

    else if (direction == 'left') {

        goLeft();

    }
}


///////// SON D'EXPLOSION DES MISSILES /////////


var explosion = new Audio("ressources/sounds/break.mp3")
var score = 0

let ennemiesDestroyed = 0
let goodShots = 0


///////// DÉPLACEMENT DU MISSILE /////////


function goUp() {
    let cases = document.querySelectorAll('.case')


    ///////// DÉPLACEMENT DU MISSILE VERS LE HAUT /////////


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


    ///////// DESTRUCTION DE L'ALIEN LORSQU'UN MISSILE LE TOUCHE /////////

    
    for (let k = 0; k < cases.length; k++) {
        if (cases[k].classList.contains('secret_alien') && cases[k].classList.contains('secret_laser')) {
            explosion.volume = 1;
            explosion.currentTime = 0
            cases[k].classList.add('boom')
            explosion.play()
            cases[k].classList.remove('secret_laser')
            cases[k].classList.remove('secret_alien')
            setTimeout(function(){
                cases[k].classList.remove('boom')
                score += 500
                document.getElementById('score').innerText = "Score : " + score
                goodShots++;
                ennemiesDestroyed ++;
                console.log("Shots fired : " + numberOfShots)
                console.log("Coups au but : " + goodShots)
                console.log("Ennemies destroyed : " + ennemiesDestroyed)
            }, 100);

        }
        if (cases[k].classList.contains('alien') && cases[k].classList.contains('secret_laser')) {
            explosion.volume = 1;
            explosion.currentTime = 0
            cases[k].classList.add('boom')
            explosion.play()
            cases[k].classList.remove('secret_laser')
            setTimeout(function(){
                cases[k].classList.remove('alien')
                cases[k].classList.remove('boom')
                cases[k].classList.add('secret_alien')
                goodShots++
            }, 100);

        }
    }
}

var game;

let launcher = document.getElementById('button');
let stopper = document.getElementById('stop');
let returner = document.getElementById('return')


///////// ÉVÈNEMENTS DES DIFFÉRENTS BOUTONS /////////


returner.addEventListener("click", () => {
    window.location.href = 'index.html'
});

launcher.addEventListener("click", () => {
    returner.style.display = 'none'
    launcher.style.display = 'none'
    stopper.style.display = 'inline'
    game = setInterval(move, 600)
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

let count = 1;


///////// COUPER OU REMETTRE LE SON /////////


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


///////// MOUVEMENT DU JOUEUR /////////


var laserShoot = new Audio("ressources/sounds/Hit.mp3");
var numberOfShots = 0

function movement() {
    let tireur = document.querySelector('.secret_tireur');

    document.onkeydown = function (e) {
        let cases = document.querySelector('.secret_tireur')

        if (e.key == 'ArrowUp') {

            if (tireur.id > 181) {
                for(let j = 0; j < 20; j++) {

                    let cases = document.querySelector('.secret_tireur')

                    if (tireur.id >= 163){
                
                        cases.classList.remove('secret_tireur')
                        cases.previousElementSibling.classList.add('secret_tireur')
                        tireur.id = cases.id
                    }        
                }
            }
        }

        if (e.key == 'ArrowDown') {

            if (tireur.id < 220) {

                for(let j = 0; j < 20; j++) {

                    let cases = document.querySelector('.secret_tireur')

                    if (tireur.id <= 238){
                    
                        cases.classList.remove('secret_tireur')
                        cases.nextElementSibling.classList.add('secret_tireur')
                        tireur.id = cases.id
                    }
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


        ///////// TIR DU JOUEUR /////////


        document.onkeyup = function (e) {
            if (e.code == 'Space') {
                
                if(!shooting){
                    shooting = true;
                    laserShoot.volume = 1
                    laserShoot.currentTime = 0;
                    laserShoot.play();
                    let cases = document.querySelectorAll('.case')
                    numberOfShots ++
                    
                    setTimeout(function(){
                        shooting = false;
                    },200);
        
                    for (let i = 0; i < cases.length; i++) {
                        
                        if (cases[i].classList.contains('secret_tireur')) {
                            
                            cases[i].classList.add('secret_laser')
                        
                        }
                    }
                }
            }
        }
    }
}


///////// METTRE EN PAUSE LE JEU /////////


function pause() {
    document.onkeydown = function (e) {
        e.preventDefault()
    }
    document.onkeyup = function (e) {
        e.preventDefault()
    }
}

setInterval(goUp, 200)