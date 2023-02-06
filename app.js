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
    
    grille.append(cases)
}