let main = document.querySelector('.scores')

//localStorage.clear()


///////// CRÉATION DES CASES DU TABLEAU DES SCORES /////////


for (let i = 0; i < 10; i++) {
    let newScore = document.createElement('tr')
    newScore.classList.add('score')
    main.append(newScore)

    let newCase = document.createElement('td')
    newCase.classList.add('placement' + i.toString())
    newScore.append(newCase)

    newCase = document.createElement('td')
    newCase.classList.add('pseudo' + i.toString())
    newScore.append(newCase)

    newCase = document.createElement('td')
    newCase.classList.add('score' + i.toString())
    newScore.append(newCase)

    newCase = document.createElement('td')
    newCase.classList.add('precision' + i.toString())
    newScore.append(newCase)

}

let number = 0;


///////// AJOUT DES ÉLÉMENTS DU LOCAL STROAGE DANS LE TABLEAU /////////


for (let i = 0; i < 10; i++) {
    let placement = 'placement' + i.toString()
    let place = document.querySelector('.'+placement)
    place.innerHTML = i + 1

    if ('pseudo' + i in localStorage) {
        let pseudo = 'pseudo' + i.toString()
        let pseudoStr = document.querySelector('.'+pseudo)
        pseudoStr.innerHTML = localStorage.getItem(pseudo).toUpperCase()

        let score = 'score' + i.toString()
        let scoreStr = document.querySelector('.'+score)
        scoreStr.innerHTML = localStorage.getItem(score) + " pts"

        let precision = 'precision' + i.toString()
        let precisionstr = document.querySelector('.'+precision)
        precisionstr.innerHTML = localStorage.getItem(precision) + "%"
    }
    else {
        let pseudoStr = document.querySelector('.pseudo'+i)
        pseudoStr.innerHTML = "AAA"
        let scoreStr = document.querySelector('.score'+i)
        scoreStr.innerHTML = "0000 pts"
        let precisionStr = document.querySelector('.precision'+i)
        precisionStr.innerHTML = "00.0%"

    }
    
}

for (const key in localStorage) {
    console.log(key)
    console.log(localStorage.getItem(key))
}