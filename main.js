
const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const botonComenzar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon');
const tiempoPantalla = document.querySelector('#timer');
const volumenControl = document.querySelector('#volumeControl');


const musica = new Audio('sonidos/techno.mp3');
const audioPlay = new Audio('sonidos/play.wav');
const audioPause = new Audio('sonidos/pause.mp3');
const audioFinal = new Audio('sonidos/beep.mp3');

let tiempoTrasncurridoEnSegundos = 1500;
let idIntervalo = null;


musica.loop = true;

function changeVolume(volume) {
    musica.volume = volume;
}

volumenControl.addEventListener('input', () => {
    const volume = volumenControl.value;
    changeVolume(volume);
});

inputEnfoqueMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});


botonCorto.addEventListener('click', () => {
    tiempoTrasncurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');

});

botonEnfoque.addEventListener('click', () => {
    tiempoTrasncurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    tiempoTrasncurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});

function cambiarContexto(contexto) {

    mostrarTiempo();
    botones.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagenes/${contexto}.png`);
    switch (contexto) {
        case 'descanso-corto':
            titulo.innerHTML = `¿Qué tal tomar un respiro?<br>
            <strong class="app__title-strong">!Haz una pausa corta!</strong>`;
            break;
        case 'enfoque':
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            break;
        case 'descanso-largo':
            titulo.innerHTML = `Hora de volver a la superficie,<br>
            <strong class="app__title-strong">Haz una pausa larga.</strong>`;
            break;
    }
}

const cuentaRegresiva = () => {
    if (tiempoTrasncurridoEnSegundos <= 0) {
        audioFinal.play();
        reiniciarTemporizador();
        alert('¡Tiempo finalizado!');
        return;
    }
    textoIniciarPausar.textContent = 'Pausar';
    iconoIniciarPausar.setAttribute('src', 'imagenes/pause.png');
    tiempoTrasncurridoEnSegundos--;
    mostrarTiempo();

}

botonComenzar.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if (idIntervalo) {
        audioPause.play();
        reiniciarTemporizador();
        return;
    }
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
}



function reiniciarTemporizador() {
    clearInterval(idIntervalo);
    idIntervalo = null;
    textoIniciarPausar.textContent = 'Comenzar';
    iconoIniciarPausar.setAttribute('src', 'imagenes/play_arrow.png');
}

function mostrarTiempo() {
    const tiempo = new Date(tiempoTrasncurridoEnSegundos * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-PE', { minute: '2-digit', second: '2-digit' })
    tiempoPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo();