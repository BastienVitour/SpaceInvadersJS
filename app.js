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

function move() {

    let num = document.getElementsByClassName('case').length

    console.log(num)

    //for (let k = 1; k < 241; k++) {

        for (let i = num-1; i >= 0; i --) {

            let cases = document.querySelectorAll('.case')[i]
            //console.log(cases.id)

            if (cases.classList.contains('alien') && !cases.nextElementSibling.classList.contains('alien')) {
                cases.classList.remove('alien')
                cases.nextElementSibling.classList.add('alien')
            }
            //cases.setAttribute('style', 'background-color:yellow;')
        }
    //}
}

setInterval(move, 1000)


//let cases = document.querySelectorAll('.alien')

//move(cases)