// app.js

document.getElementById("convertir").addEventListener("click", convertir);
document.getElementById("limpiar").addEventListener("click", limpiarHistorial);

function convertir() {
  const monto = parseFloat(document.getElementById("monto").value);
  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;

  if (isNaN(monto) || monto <= 0) {
    Swal.fire({
      icon: "error",
      title: "Monto inválido",
      text: "Por favor ingresa un monto válido mayor a 0."
    });
    return;
  }

  obtenerTasa(origen, destino, (tasa) => {
    if (tasa) {
      const resultado = monto * tasa;
      document.getElementById("resultado").textContent = `Resultado: ${resultado.toFixed(2)} ${destino}`;

      Swal.fire({
        icon: "success",
        title: "Conversión exitosa",
        text: `${monto} ${origen} = ${resultado.toFixed(2)} ${destino}`
      });

      guardarHistorial(monto, origen, destino, resultado);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error en la conversión",
        text: "No se pudo obtener la tasa de cambio."
      });
    }
  });
}

function guardarHistorial(monto, origen, destino, resultado) {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.push({ monto, origen, destino, resultado: resultado.toFixed(2), fecha: new Date().toLocaleString() });
  localStorage.setItem("historial", JSON.stringify(historial));
  mostrarHistorial();
}

function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  const lista = document.getElementById("historial");
  lista.innerHTML = "";

  historial.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.fecha}: ${item.monto} ${item.origen} = ${item.resultado} ${item.destino}`;
    lista.appendChild(li);
  });
}

function limpiarHistorial() {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esto eliminará todo el historial de conversiones.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("historial");
      mostrarHistorial();
      Swal.fire("Eliminado", "El historial ha sido borrado.", "success");
    }
  });
}

mostrarHistorial();


