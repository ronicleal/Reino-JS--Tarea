/*Importacion de clases*/
import { Jugador } from "./modules/jugadores.js";
import { Enemigo, JefeFinal } from "./modules/enemigos.js";
import { mercado, aplicarDescuentoPorRareza } from "./modules/mercado.js";
import { batalla, agruparPorNivel } from "./modules/ranking.js";
import { showScene } from "./utils/utils.js";

/*Variables globales*/
let jugador;
let enemigos = [];
let seleccionados = [];

/*ESCENA 1: CREAR JUGADOR*/
function escena1() {
    const container = document.getElementById("player");
    container.innerHTML = `
        <h2>👤 Crear jugador</h2>
        <input id="nombre-jugador" placeholder="Nombre del jugador" />
        <button id="crear-jugador">Comienza la aventura</button>
    `;

    container.querySelector("#crear-jugador").addEventListener("click", () => {
        const nombre = document.getElementById("nombre-jugador").value.trim();
        if (!nombre) {
            alert("Por favor, introduce tu nombre.");
            return;
        }
        jugador = new Jugador(nombre);

        // Mostrar estado inicial y botón para continuar
        container.innerHTML = `
            <h2>Estado inicial del jugador</h2>
            <pre>${jugador.mostrarJugador()}</pre>
            <button id="continuar-mercado">Continuar al mercado</button>
        `;

        container.querySelector("#continuar-mercado").addEventListener("click", () => {
            showScene("market");
            escena2();
        });
    });
}

/*ESCENA 2: MERCADO*/
function escena2() {
    const container = document.getElementById("market-container");
    container.innerHTML = `<h2>🏪 Mercado</h2>`;

    // Aplicar descuentos aleatorios por rareza
    ['común', 'raro', 'épico'].forEach(r => {
        aplicarDescuentoPorRareza(r, Math.floor(Math.random() * 31));
    });

    // Mostrar productos
    mercado.forEach(producto => {
        const div = document.createElement("div");
        div.textContent = producto.mostrarProducto();
        div.style.border = '1px solid black';
        div.style.margin = '5px';
        div.style.padding = '5px';
        div.style.cursor = 'pointer';

        div.addEventListener('click', () => {
            if (seleccionados.includes(producto)) {
                seleccionados = seleccionados.filter(p => p !== producto);
                div.style.backgroundColor = '';
            } else {
                seleccionados.push(producto);
                div.style.backgroundColor = 'lightgreen';
            }
        });

        container.appendChild(div);
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

        seleccionados.forEach(item => jugador.añadirItem(item));
        seleccionados = [];

        showScene("enemies");
        escena3();
    });

    container.appendChild(botonComprar);
}

/*ESCENA 3: ESTADO DEL JUGADOR*/
function escena3() {
    const container = document.getElementById("enemies-container");
    container.innerHTML = `
        <h2>🎮 Estado actual del jugador</h2>
        <pre>${jugador.mostrarJugador()}</pre>
        <button id="continuar-batalla">➡️ Continuar a los enemigos</button>
    `;

    container.querySelector("#continuar-batalla").addEventListener("click", () => {
        showScene("enemies");
        escena4();
    });
}

/*ESCENA 4: ENEMIGOS Y ESTADÍSTICAS*/
function escena4() {
    const container = document.getElementById("enemies-container");
    container.innerHTML = `<h2>🧟 Enemigos</h2>`;

    enemigos = [
        new Enemigo('Goblin', 10, 30),
        new Enemigo('Orco', 15, 50),
        new JefeFinal('Dragón rojo', 25, 120, 'Llama infernal', 1.5),
    ];

    enemigos.forEach(e => {
        const div = document.createElement('div');
        div.textContent = e.mostrarEnemigo();
        div.style.border = '1px solid black';
        div.style.margin = '5px';
        div.style.padding = '5px';
        container.appendChild(div);
    });

    const botonContinuar = document.createElement('button');
    botonContinuar.textContent = '⚔️ Comenzar batallas';
    botonContinuar.addEventListener('click', () => {
        showScene("battle");
        escena5();
    });
    container.appendChild(botonContinuar);
}

/*ESCENA 5: BATALLAS*/
function escena5() {
    const container = document.getElementById("battle");
    container.innerHTML = `<h2>⚔️ Batallas</h2>`;

    let batallaActual = 0;

    function mostrarBatalla() {
        if (batallaActual >= enemigos.length) {
            showScene("final");
            escena6();
            return;
        }

        const enemigo = enemigos[batallaActual];
        container.innerHTML = `
            <h3>🆚 Batalla ${batallaActual + 1}</h3>
            <p><strong>Jugador:</strong> ${jugador.nombre}</p>
            <p><strong>Enemigo:</strong> ${enemigo.nombre}</p>
            <p>💥 ¡Comienza la pelea!</p>
        `;

        const resultado = batalla(jugador, enemigo);

        const resultadoDiv = document.createElement("div");
        resultadoDiv.innerHTML = `
            <p><strong>🏁 Ganador:</strong> ${resultado.ganador}</p>
            ${resultado.puntosGanados > 0 ? `<p>🎯 Puntos ganados: +${resultado.puntosGanados}</p>` : `<p>❌ No se ganaron puntos.</p>`}
            <pre>${jugador.mostrarJugador()}</pre>
        `;
        container.appendChild(resultadoDiv);

        const botonContinuar = document.createElement("button");
        botonContinuar.textContent = batallaActual < enemigos.length - 1 ? "➡️ Siguiente batalla" : "🏁 Ver resultados finales";
        botonContinuar.addEventListener("click", () => {
            batallaActual++;
            mostrarBatalla();
        });
        container.appendChild(botonContinuar);
    }

    mostrarBatalla();
}

/*ESCENA 6: RESULTADO FINAL*/
function escena6() {
    const container = document.getElementById("final");
    const rango = jugador.puntos >= 100 ? "🏆 PRO" : "🎯 ROOKIE";

    container.innerHTML = `
        <h2>🎉 Fin de la aventura</h2>
        <p><strong>Jugador:</strong> ${jugador.nombre}</p>
        <p><strong>Puntos finales:</strong> ${jugador.puntos}</p>
        <p><strong>Clasificación:</strong> ${rango}</p>
        <pre>${jugador.mostrarJugador()}</pre>
    `;

    const botonReiniciar = document.createElement("button");
    botonReiniciar.textContent = "🔄 Volver a empezar";
    botonReiniciar.addEventListener("click", () => {
        jugador = null;
        enemigos = [];
        seleccionados = [];
        showScene("player");
        escena1();
    });

    container.appendChild(botonReiniciar);
}

/*INICIO DEL JUEGO*/
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundColor = 'white';
    showScene('player');
    escena1();
});