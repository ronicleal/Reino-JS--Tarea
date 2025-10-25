/*Importacion de clases*/
import { Jugador } from "./jugadores.js";
import { Enemigo, JefeFinal } from "./enemigos.js";
import { mercado, aplicarDescuentoPorRareza } from "./mercado.js";
import { batalla, agruparPorNivel } from "./ranking.js";
import { showScene } from "../utils/utils.js";

/*Variables globales*/
let jugador;
let enemigos = [];
let seleccionados = [];

/*ESCENA 1: CREAR JUGADOR*/
function escena1() {
    const scene = document.getElementById("player");
    scene.innerHTML = `
    <h2>👤Crear jugador</h2>
    <input id="nombre-jugador" placeholder="Nombre del jugador" />
    <button id="crear-jugador">Comienza la aventura</button>
    `;

    scene.querySelector("#crear-jugador").addEventListener('click', () => {
        const nombre = document.getElementById("nombre-jugador").value.trim();
        if (!nombre) {
            alert('Por favor, introduce tu nombre.');
            return;
        }


        jugador = new Jugador(nombre);
        // Mostramos su estado inicial en pantalla
        scene.innerHTML = `
        <h2>Estado inicial del jugador</h2>
        <pre>${jugador.mostrarJugador()}</pre>
        <button id="continuar">Continuar al mercado</button>
        `;



        scene.querySelector("#continuar").addEventListener("click", () => {
            showScene("market");
            escena2();
        });

    });
}


/*ESCENA 2: MERCADO*/
function escena2() {
    const container = document.getElementById("market-container");
    container.innerHTML = `<h2>🏪 Mercado </h2>`;

    // Aplicar descuentos aleatorios por rareza
    const rarezas = ['común', 'raro', 'épico'];
    rarezas.forEach(r => {
        const descuento = Math.floor(Math.random() * 31);//0 a 30%
        aplicarDescuentoPorRareza(r, descuento);

    })



    container.appendChild()
}

















document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundColor = 'red';
    showScene('player');
    escena1();
});