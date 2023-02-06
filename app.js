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
}

let direction= 'right';

function move() {

    let num = document.getElementsByClassName('alien').length
    let aliens = document.getElementsByClassName('alien')

    console.log(num)

    for (let k = num-1; k >= 0; k--) {

        if (aliens[k].classList.contains('right-stop')) {

            direction = 'left';

        }

        else if (aliens[k].classList.contains('left-stop')) {

            direction = 'right';

        }

    }

    if (direction == 'right') {

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

    else if (direction == 'left') {

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

    
}

setInterval(move, 1000)

//let cases = document.querySelectorAll('.alien')

//move(cases)