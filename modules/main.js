/*Importacion de clases*/
import { Jugador } from "./jugadores.js";
import {Enemigo, JefeFinal} from "./enemigos.js";
import {mercado, aplicarDescuentoPorRareza} from "./mercado.js";
import {batalla, agruparPorNivel} from "./ranking.js";
import { showScene } from "../utils/utils.js";

/*Variables globales*/
let jugador;
let enemigos = [];
let seleccionados = [];

/*ESCENA 1: CREAR JUGADOR*/
function escena1(){
    const scene = document.getElementById("player");
    scene.innerHTML= `
    <h2>👤Crear jugador</h2>
    <input id="nombre-jugador" placeholder="Nombre del jugador" />
    <button id="crear-jugador">Comienza la aventura</button>
    `;

    scene.querySelector("#crear-jugador").addEventListener('click', ()=>{
        const nombre = document.getElementById("nombre-jugador").value.trim();
        if(!nombre){
            alert('Por favor, introduce tu nombre.');
            return;
        }
    jugador = new Jugador(nombre);
    mostrarJugador("Estado inicial del jugador");
    showScene("market");
    escena2()
    
    });
}


/*ESCENA 2: MERCADO*/
function escena2(){

}

















document.addEventListener('DOMContentLoaded', () => {
  document.body.style.backgroundColor = 'red';
  showScene('player');
  escena1();
});