let easyBtn = document.getElementById('easy-choice')
let midBtn = document.getElementById('mid-choice')
let hardBtn = document.getElementById('hard-choice')


///////// CHOIX DE LA DIFFICULTÉ PAR LE JOUEUR /////////


easyBtn.addEventListener('click', () => {
    choose('easy');
});
midBtn.addEventListener('click', () => {
    choose('mid');
});
hardBtn.addEventListener('click', () => {
    choose('hard');
});

function choose(diff) {

    switch (diff) {
        case 'easy':
            easyBtn.style.backgroundColor = 'green'
            midBtn.style.backgroundColor = 'black'
            hardBtn.style.backgroundColor = 'black'
            break;
        case 'mid':
            midBtn.style.backgroundColor = 'rgb(255, 188, 0)'
            easyBtn.style.backgroundColor = 'black'
            hardBtn.style.backgroundColor = 'black'
            break;
        case 'hard':
            hardBtn.style.backgroundColor = 'red'
            midBtn.style.backgroundColor = 'black'
            easyBtn.style.backgroundColor = 'black'
            break;

        default:
        break;
    }

}

let launch = document.getElementById('launch')

launch.addEventListener('click', launchGame)

///////// LANCEMENT DE LA PARTIE AVEC LA DIFFICULTÉ CHOISIE PAR LE JOUEUR /////////

function launchGame() {
    var diff = document.querySelector('input[name="diff"]:checked');
    if (diff == null) {
        alert('Vous devez choisir une difficulté')
        console.log('ceci est null')
    }
    else if (diff.value == 'easy') {
        console.log('ceci est easy')
        window.location.href = 'game.html?diff=easy'
    }
    else if (diff.value == 'mid') {
        console.log('ceci est mid')
        window.location.href = 'game.html?diff=mid'
    }
    else if (diff.value == 'hard') {
        console.log('ceci est hard')
        window.location.href = 'game.html?diff=hard'
    }
}

let count = 0;

var audio = document.getElementById('audio');
var playBtn = document.getElementById('playPause');

///////// FONCTION POUR COUPER/JOUER LA MUSIQUE /////////

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