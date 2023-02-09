let main = document.querySelector('.scores')

for (let i = 0; i < 10; i++) {
    let newScore = document.createElement('tr')
    newScore.classList.add('score')
    //newScore.classList.add('score' + i.toString())
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

while (number < 10) {
    
    let placement = 'placement' + number.toString()
    let place = document.querySelector('.'+placement)
    place.innerHTML = number + 1

    let pseudo = 'pseudo' + number.toString()
    let pseudoStr = document.querySelector('.'+pseudo)
    pseudoStr.innerHTML = localStorage.getItem(pseudo)

    let score = 'score' + number.toString()
    let scoreStr = document.querySelector('.'+score)
    scoreStr.innerHTML = localStorage.getItem(score) + " pts"

    let precision = 'precision' + number.toString()
    let precisionstr = document.querySelector('.'+precision)
    precisionstr.innerHTML = localStorage.getItem(precision) + "%"

    number++
    
}

let docu = document.getElementById('div').innerHTML

for (const key in localStorage) {
    console.log(key)
    console.log(localStorage.getItem(key))
}