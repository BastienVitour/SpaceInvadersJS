let grille = document.querySelector('.grille');

for (let i=1; i<241; i++) {
    let cases = document.createElement('div');
    if (i%20 == 0) {
        cases.setAttribute('class', 'right-stop')
        cases.setAttribute('style', 'background-color:red;')
    }
    else if (i%20 == 1){
        cases.setAttribute('class', 'left-stop')
        cases.setAttribute('style', 'background-color:green;')
    }
    if (i < 61 && i%20 < 13 && i%20 != 0) {
        cases.classList.add('alien')
    }
    cases.classList.add('case')
    cases.setAttribute('id', i)
    grille.append(cases)

if (i == 230) {
    cases.classList.add('tireur')
}
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

function move() {

    //console.log("playing function")

    let num = document.getElementsByClassName('alien').length
    let aliens = document.getElementsByClassName('alien')

    let cases = document.querySelectorAll('.case')

    console.log(num)

    if (cases[239].classList.contains('alien')) {
        return 0;
    }

    for (let k = num-1; k >= 0; k--) {


        if (aliens[k].classList.contains('right-stop')) {
            
            for(let j = 0; j < 20; j++) {
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
            direction = 'left';
            break;  
            
        }

        else if (aliens[k].classList.contains('left-stop') && !cases[0].classList.contains('alien')) {

            for(let j = 0; j < 20; j++) {
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

var game;

let launcher = document.getElementById('button');


launcher.addEventListener("click", () => {
    game = setInterval(move, 500)
});

let stopper = document.getElementById('stop');


stopper.addEventListener("click", () => {
    clearInterval(game)
});

let replay = document.getElementById('play_again')

replay.addEventListener("click", () => {
    document.location.reload(false)
})

//launcher.addEventListener('click', setInterval(move, 500))


// PLAYER MOVEMENT

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

            console.log(tireur.id)
            if (tireur.id <= 238){
            
                console.log(tireur.id)
                cases.classList.remove('tireur')
                cases.nextElementSibling.classList.add('tireur')
                tireur.id = cases.id
                console.log(tireur.id)
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
};

// RELOAD THE GAME 
