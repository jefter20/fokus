const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const descansoCurtoBtn = document.querySelector('.app__card-button--curto');
const descansoLongoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBtn = document.querySelector('#start-pause');
const startPauseBtnTexto = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioTempoEsgotado = new Audio('/sons/beep.mp3');

musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

function trocaContexto(contexto) {
     mostrarTempo();
    limparTemporizador();

    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Impulcione sua produtividade. </br>
            <strong class='app__title-strong'>Foque no que realmente importa!</strong>`

            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? </br>
            <strong class='app__title-strong'>Faça uma pausa curta!</strong>`

            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superficie. </br>
            <strong class='app__title-strong'>Faça uma pausa longa!</strong>`

            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoEsgotado.play();
        alert('Tempo esgotado!');
        limparTemporizador();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();

}

function iniciarPausarTemporizador() {
    if (intervaloId) {
        audioPause.play();
        limparTemporizador();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    startPauseBtnTexto.textContent = 'Pausar';
}

function limparTemporizador() {
    startPauseBtnTexto.textContent = 'Começar';
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

startPauseBtn.addEventListener('click', iniciarPausarTemporizador);

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    }
    else
        musica.pause();
});

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    trocaContexto('foco');
    focoBtn.classList.add('active');
});

descansoCurtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    trocaContexto('descanso-curto');
    descansoCurtoBtn.classList.add('active');
});


descansoLongoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    trocaContexto('descanso-longo');
    descansoLongoBtn.classList.add('active');
});

mostrarTempo();