// Ici le JS
/*
    Il doit y avoir un credit de 50€ au démarrage, cette information doit afficher dans un message au démarrage. 
    Vous devez pouvoir augmenter ou diminuer la mise, qui est de 5€ par défaut
    Lorsqu'on clique sur "jouer" les rouleaux doivent defilé et afficher une image aléatoire, les images sont dans le dossier img
    Le jeux doit calculer votre gain ou perte.
    Le gain ou la perte doit être affiché dans un message sous la grande image
*/
// j'appelle mes imgs
const premiereImage = document.getElementById('img1');
const secondeImage = document.getElementById('img2');
const troisiemeImage = document.getElementById('img3');
// je fais un tableau pour mes img random 
var imageRandom = 'bars.png,bell.png,cherry.png,diamond.png,heart.png,horseshoe.png,lemon.png,seven.png,watermelon.png'.split(',');
// je place mes nouveau elm a affiché
const afficherSolde = document.getElementById('amount');
const bouttonMoins = document.getElementById('bet-dec');
const afficherMise = document.getElementById('bet');
const bouttonPlus = document.getElementById('bet-inc');
const remiseAZero = document.getElementById('reset');
const jouer = document.getElementById('play');
var compteur = 0;
changeMessage = document.getElementById('error-msg');
changeMessage.style.display = 'none'
// je cree des event click sur mes btn 
changeMessage.style.display = 'block'
changeMessage.className = 'alert alert-primary h2'
changeMessage.innerHTML = 'Bienvenue sur votre casino :-)'
bouttonMoins.addEventListener('click', function () {
    if (afficherMise.innerHTML <= 0) {
        alert('vous ne pouvez pas miser moins de 1 €')
    } else {
        afficherMise.innerHTML--

    }
});
bouttonPlus.addEventListener('click', function () {
    if (afficherMise.innerHTML >= 500) {
        alert('voulez vous faire un retrait?')
    } else {
        afficherMise.innerHTML++
    }
});
function tirageAleatoire() {
    nbr1 = imageRandom.length + Math.floor(Math.random() * imageRandom.length);
    for (a = 0; a < nbr1; a++) {
        premiereImage.setAttribute('src', './img/' + imageRandom[a % 9]);
    }
    nbr2 = imageRandom.length + Math.floor(Math.random() * imageRandom.length);
    for (b = 0; b < nbr2; b++) {
        secondeImage.setAttribute('src', './img/' + imageRandom[b % 9]);
    }
    nbr3 = imageRandom.length + Math.floor(Math.random() * imageRandom.length);
    for (c = 0; c < nbr3; c++) {
        troisiemeImage.setAttribute('src', './img/' + imageRandom[c % 9])
    }
    compteur++;
    if (compteur < 80) {
        setTimeout('tirageAleatoire(compteur);', 20);
    } else {
        calculerLesResultats();
    }
};
jouer.addEventListener('click', function () {
    compteur = 0;
    tirageAleatoire();
})

function calculerLesResultats() {
    if ((premiereImage.getAttribute('src') == secondeImage.getAttribute('src')) && (secondeImage.getAttribute('src') == troisiemeImage.getAttribute('src'))) {
        afficherSolde.value = parseInt(afficherSolde.value) + parseInt(afficherMise.innerHTML * 10);
        changeMessage.innerHTML = 'Vous avez gagner 10 fois voitre mise: ' + (afficherSolde.innerHTML * 10) + ' €. Votre nouveau solde est de:' + afficherSolde.value;
        changeMessage.style.display = 'block'
        changeMessage.className = 'alert alert-success h2'

    } else if ((premiereImage.getAttribute('src') == secondeImage.getAttribute('src')) || (premiereImage.getAttribute('src') == troisiemeImage.getAttribute('src')) || (secondeImage.getAttribute('src') == troisiemeImage.getAttribute('src'))) {
        afficherSolde.value = parseInt(afficherSolde.value) + parseInt(afficherMise.innerHTML * 2);
        changeMessage.innerHTML = 'Vous avez gagner 2 fois voitre mise: ' + (afficherSolde.innerHTML * 2) + ' €. Votre nouveau solde est de:' + afficherSolde.value;
        changeMessage.style.display = 'block'
        changeMessage.className = 'alert alert-success h2'
    } else {
        afficherSolde.value = parseInt(afficherSolde.value) - parseInt(afficherMise.innerHTML);
        changeMessage.innerHTML = 'Vous avez perdu veuillez réessayer!'
        changeMessage.style.display = 'block'
        changeMessage.className = 'alert alert-danger h2'
    }
}
remiseAZero.addEventListener('click', function () {
    afficherMise.innerHTML = 5
    changeMessage.innerHTML = 'La mise a été reinitialiser'
})
