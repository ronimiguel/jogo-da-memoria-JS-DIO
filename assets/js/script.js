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