// api.js

const monedasPermitidas = ["USD", "EUR", "COP", "MXN", "ARS"];

async function cargarMonedas() {
  try {
    const respuesta = await fetch("https://open.er-api.com/v6/latest/USD");
    const datos = await respuesta.json();

    const tasas = datos.rates;
    const selectOrigen = document.getElementById("origen");
    const selectDestino = document.getElementById("destino");

    monedasPermitidas.forEach(moneda => {
      if (tasas[moneda]) {
        const option1 = document.createElement("option");
        option1.value = moneda;
        option1.textContent = moneda;
        selectOrigen.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = moneda;
        option2.textContent = moneda;
        selectDestino.appendChild(option2);
      }
    });

    selectOrigen.value = "USD";
    selectDestino.value = "EUR";

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error al cargar monedas",
      text: "Intenta nuevamente más tarde."
    });
  }
}

function obtenerTasa(origen, destino, callback) {
  fetch(`https://open.er-api.com/v6/latest/${origen}`)
    .then(res => res.json())
    .then(data => {
      const tasa = data.rates[destino];
      callback(tasa);
    })
    .catch(() => callback(null));
}

// Iniciar carga de monedas al cargar la página
window.addEventListener("DOMContentLoaded", cargarMonedas);
