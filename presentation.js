let body = document.getElementsByTagName('body')[0]
body.style.backgroundImage = 'url("/ressources/images/presentation1.png")'

let btn = document.getElementById('home')


let number = 1;

document.onkeydown = function (f) {
    if (f.code == 'Space') {
        btn.style.display = 'none'
        if (number == 9) {

            number = 0
        }
        number++
        body.style.backgroundImage = 'url("/ressources/images/presentation' + number + '.png")'
        if (number == 9) {
            btn.style.display = 'flex'
        }
    }
    if (f.key == 'ArrowLeft') {
        btn.style.display = 'none'
        if (number == 1) {
            number = 10
        }
        number--
        body.style.backgroundImage = 'url("/ressources/images/presentation' + number + '.png")'
        if (number == 9) {
            btn.style.display = 'flex'
        }
    }
    if (f.key == 'ArrowRight') {
        btn.style.display = 'none'
        if (number == 9) {
            number = 0
        }
        number++
        body.style.backgroundImage = 'url("/ressources/images/presentation' + number + '.png")'
        if (number == 9) {
            btn.style.display = 'flex'
        }
    }
}