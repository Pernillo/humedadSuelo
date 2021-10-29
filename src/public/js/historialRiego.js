/* LLamar al listado de seguimientos */
fetch("http://127.0.0.1:3000/historial")
  .then((response) => response.json())
  .then((data) => listarHistorial(data));

/* Funcion que escribre el html para e listado */
const listarHistorial = (data) => {
  let tbdoySeguimiento = document.getElementById("tbodyHistorial");

  let html = "";

  /* Se construye le html para el listado */
  data.forEach(
    (historial, index) =>
    (html += `
  <tr>
    <td class="tm-product-name">${index + 1}</td>
    <td class="text-center">${historial.fecha}</td>
  </tr>
  `)
  );

  tbdoySeguimiento.innerHTML = html;
};

/* Elimina el seguimiento por su id */
const eliminarSeguimiento = (idSeguimiento) => {
  fetch(`http://127.0.0.1:3000/seguimientos/${idSeguimiento}`, {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then((data) => listarHistorial(data));
};