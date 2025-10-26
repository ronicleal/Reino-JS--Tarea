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

    });

    //Mostrar productos
    mercado.forEach((producto, index) => {
        const div = document.createElement("div");
        div.textContent = producto.mostrarProducto();
        div.style.border = '1px solid black';
        div.style.margin = '5px';
        div.style.padding = '5px';
        div.style.cursor = 'pointer';

        // Evento para seleccionar/deseleccionar productos
        div.addEventListener('click', () => {
            if (seleccionados.includes(producto)) {
                seleccionados = seleccionados.filter(p => p !== producto);
                div.style.backgroundColor = '';
            } else {
                seleccionados.push(producto);
                div.style.backgroundColor = 'lightgreen';
            }
        });

        container.appendChild(div)

    });

    // Botón de compra
    const botonComprar = document.createElement("button");
    botonComprar.textContent = "🛒 Confirmar compra";
    botonComprar.style.marginTop = "10px";

    botonComprar.addEventListener("click", () => {
        if (seleccionados.length === 0) {
            alert("No has seleccionado ningún producto.");
            return;
        }

        // Añadir ítems al jugador
        seleccionados.forEach(item => jugador.añadirItem(item));
        seleccionados = [];

        // Pasar a la siguiente escena
        showScene("enemies");
        escena3();
    });

    container.appendChild(botonComprar);
}


/*ESCENA 3: ESTADO ACTUAL DEL JUGADOR CON SUS PRODUCTOS COMPRADOS*/
function escena3() {
    const container = document.getElementById("enemies-container");
    container.innerHTML = `
        <h2>🎮 Estado actual del jugador</h2>
        <pre>${jugador.mostrarJugador()}</pre>
        <button id="continuar-batalla">➡️ Continuar a la batalla</button>
    `;

    container.querySelector("#continuar-batalla").addEventListener("click", () => {
        alert("¡Prepárate para la batalla!");
        escena4();
        
    });
}


/*ESCENA 4: ENEMIGOS Y ESTADISTICAS*/
function escena4(){
    const container = document.getElementById('enemies-container');
    container.innerHTML= `<h2>⚔️Enemigos</h2>`;

    //Crear enemigos
    enemigos = [
    new Enemigo('Goblin', 10, 30),
    new Enemigo('Orco', 15, 50),
    new JefeFinal('Dragón rojo', 25, 120, 'Llama infernal', 1.5),
  ];

  enemigos.forEach(e =>{
    const div = document.createElement('div');
    div.textContent = e.mostrarEnemigo();
    div.style.border = '1px solid black';
    div.style.margin = '5px';
    div.style.padding = '5px';
    container.appendChild(div); 
  });

  const botonContinuar = document.createElement('button');
  botonContinuar.textContent = 'Comenzar batallas';
  botonContinuar.addEventListener('click', () => {
    showScene('battle');
    escena5();
  });

  container.appendChild(botonContinuar);
}















document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundColor = 'red';
    showScene('player');
    escena1();
});