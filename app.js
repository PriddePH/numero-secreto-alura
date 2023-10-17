let randomNumberArray = [];
let randomNumberMax = 10;
let randomNumber = randomNumberGenerator();
console.log(randomNumber);
let tries = 1;

showInitialText();

// mostrando o texto inicial do jogo
function showInitialText() {
    showText('h1', 'O Jogo do número secreto');
    showText('p', 'Escolha um número entre 1 e 10');
}

// pegando a tag do HTML e passando o texto que vai ser exibido naquela tag
function showText(tag, text) {
    let tags = document.querySelector(tag)
    tags.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.2});
}

// checando a tentativa de chute do jogador, se for verdadeiro vai acontecer uma coisa e se for falso vai acontecer outra coisa
function checkTry() {
    let attempt = document.querySelector('input').value;
    
    if (attempt == randomNumber) {
        showText('h1', 'Você acertou!');
        let triesWord = tries > 1 ? 'tentativas' : 'tentativa';
        let triesMessage = `Você descobriu o número secreto com ${tries} ${triesWord}`;
        showText('p', triesMessage);
        // habilitando e desabilitando o botão chutar e novo jogo
        document.getElementById('restart').removeAttribute('disabled');
        document.getElementById('try').setAttribute('disabled', true);
    } else {
        if(attempt > randomNumber) {
            showText('p', 'O número secreto é menor');
        } else {
            showText('p', 'O número secreto é maior');
        }
        tries++;
        clear();
    }

}

// limpando o campo de chute
function clear() { 
    attempt = document.querySelector('input');
    attempt.value = '';
}

// gerando um numero aleatorio e retornando o valor dele
function randomNumberGenerator() {
    let chosenNumber = parseInt(Math.random() * randomNumberMax + 1);
    let randomNumberArrayAmount = randomNumberArray.length;

    if (randomNumberArrayAmount == randomNumberMax) {
        randomNumberArray = [];
    }
    // se na array tiver o numero escolhido ela chama a função de novo se não insere o numero escolhido na array e continua normal
    if(randomNumberArray.includes(chosenNumber)) {
        return randomNumberGenerator();
    } else {
        randomNumberArray.push(chosenNumber);
        console.log(randomNumberArray);
        return chosenNumber;
    }
}

// reiniciando o jogo
function restartGame() {
    randomNumber = randomNumberGenerator();
    clear();
    tries = 1;
    showInitialText();
    // habilitando e desabilitando o botão chutar e novo jogo
    document.getElementById('restart').setAttribute('disabled', true);
    document.getElementById('try').removeAttribute('disabled');

}