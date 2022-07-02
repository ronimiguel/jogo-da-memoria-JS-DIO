const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//score e tentativas inicial
let score = 0;
let tries = 10; 

//envia score e tentativas inicial para o html
document.querySelector(".score").innerHTML = score;
document.querySelector(".tries").innerHTML = tries;

//array com todas as cartas
let cardList = document.getElementsByClassName("card");

//mostra as cartas no inicio do jogo e esconder apos 5 seg
function flipAllCards(cardList){
    for(card of cardList){
        card.classList.add('flip');
    }
    setTimeout(function(){
    for(card of cardList){
        card.classList.remove('flip');
    }
}, 5000);

}

//mostra todas as cartas quando acabar as tentativas
function gameOver(cardList){
    for(card of cardList){
        card.classList.add('flip');
    }
}
flipAllCards(cardList);


//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        score++;
        document.querySelector(".score").innerHTML = score;
        return;
    }else{
        tries--;
        document.querySelector(".tries").innerHTML = tries;
        if(tries === 0){
            document.querySelector(".tries").innerHTML =  "GAME OVER";
            gameOver(cardList);
return;
        }
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 28);
        card.style.order = ramdomPosition;
    })
}

shuffle();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

//função para reiniciar o jogo
function restart() {
    window.location.reload();
}

document.getElementById("restart").addEventListener("click",restart);